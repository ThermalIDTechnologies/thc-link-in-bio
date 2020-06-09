require('isomorphic-fetch')
require('dotenv').config({
  path: `.env`,
})

const sanityClient = require("@sanity/client")

const client = sanityClient({
  projectId: process.env.MY_SANITY_PROJECT_ID,
  dataset: process.env.MY_SANITY_DATASET,
  // a token with write access
  token: process.env.MY_SANITY_TOKEN,
  useCdn: false,
})

const GRAMS_API_URL =
  "https://thc-link-in-bio.netlify.app/.netlify/functions/get-some-grams"

async function getImages() {
  const data = await fetch(GRAMS_API_URL).then(res => res.json())
  
  const imageArray = data.map(mapImages)

  function mapImages(imgUrl) {
    console.log(imgUrl.thumbnail)
    return imgUrl.thumbnail
  }

  const cache = {
    igImgs: [],
  }

  await Promise.all(imageArray.map(imgUrl =>
    fetch(imgUrl)
      .then(res => res.buffer())
      .then(buffer => client.assets.upload('image', buffer))
      .then(assetDocument => {
        cache.igImgs = assetDocument
      })
  ))

  return cache.igImgs
}

exports.handler = async function (event, context, callback) {
  const result = await getImages()
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  })
}