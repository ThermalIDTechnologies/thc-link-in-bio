const sanityClient = require("@sanity/client")
const fetch = require("node-fetch")

const GRAMS_API_URL =
  "https://thc-link-in-bio.netlify.app/.netlify/functions/getAllGrams"

const cache = {
  lastFetch: 0,
  posts: [],
}

const client = sanityClient({
  projectId: "dwjuizbv",
  dataset: "production",
  // a token with write access
  token:
    "skhKpy62VlXy4i8TBTRAs8eNzWWOoxbKXxQtBzpDdmVsslHPDxHjTxv2Apua9mM5UfuALQFvLD0YaLMRkymOiBjBT5bY4dt3b7dNMkXxgxpXlXkk0UvjZJZixUgBRjPZ63vuVBMSzASGslig2l1WrnqvgLqIJmos8O3ilR7gLNnhpXXxRYkA",
  useCdn: false,
})

function transform(ogInsta) {
  const milliseconds = ogInsta.timestamp * 1000

  const dateObject = new Date(milliseconds)

  const humanDateFormat = dateObject.toLocaleString()

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
    body: JSON.stringify(result),
  })
}