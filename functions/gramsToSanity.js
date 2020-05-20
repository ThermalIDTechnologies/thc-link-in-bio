require('isomorphic-fetch')
require('dotenv').config({
  path: `.env`,
})
const sanityClient = require("@sanity/client")

const GRAMS_API_URL =
  "https://thc-link-in-bio.netlify.app/.netlify/functions/getAllGrams"

const cache = {
  lastFetch: 0,
  posts: [],
}

const client = sanityClient({
  projectId: process.env.MY_SANITY_PROJECT_ID,
  dataset: process.env.MY_SANITY_DATASET,
  // a token with write access
  token: process.env.MY_SANITY_TOKEN,
  useCdn: false,
})

function transform(ogInsta) {
  const milliseconds = ogInsta.timestamp * 1000

  const dateObject = new Date(milliseconds)

  const humanDateFormat = dateObject.toISOString()

  return {
    _id: `imported-insta-${ogInsta.id}`,
    _type: "instaLink",
    ogImage: ogInsta.ogImage,
    thumbnail: ogInsta.thumbnail,
    postUrl: ogInsta.url,
    caption: ogInsta.caption,
    timestamp: humanDateFormat,
  }
}

async function sendPosts() {
  // first see if we have a cache in 30 mins
  const timeSinceLastFetch = Date.now() - cache.lastFetch
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts
  }
  const data = await fetch(GRAMS_API_URL)
    .then(res => res.json())
    .then(instaLinks => instaLinks.map(transform))
    .then(documents => {
      let transaction = client.transaction()
      documents.forEach(document => {
        transaction.createOrReplace(document)
      })

      return transaction.commit()
    })
  const posts = data
  // const posts = data;
  cache.lastFetch = Date.now()
  cache.posts = posts
  return posts
}

exports.handler = async function (event, context, callback) {
  const result = await sendPosts()
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  })
}
