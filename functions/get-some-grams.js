require("isomorphic-fetch")
require("dotenv").config({
  path: `.env`,
})

const url = process.env.THCSOLUTIONSINC_IG_API_URL

const cache = {
  lastFetch: 0,
  posts: [],
}

async function getPosts() {
  // first see if we have a cache in 30 mins
  const timeSinceLastFetch = Date.now() - cache.lastFetch
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts
  }
  const data = await fetch(url).then(res => res.json())
  const posts = slimUpPosts(data)
  // const posts = data;
  cache.lastFetch = Date.now()
  cache.posts = posts
  return posts
}

function slimUpPosts(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map(edge => ({
    ogImage: edge.node.thumbnail_src,
    thumbnail: edge.node.thumbnail_resources[2].src,
    url: `https://instagram.com/p/${edge.node.shortcode}`,
    caption: edge.node.edge_media_to_caption.edges[0].node.text,
    id: edge.node.id,
    timestamp: edge.node.taken_at_timestamp,
  }))
}

exports.handler = async function (event, context, callback) {
  const posts = await getPosts()
  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posts),
  })
}
