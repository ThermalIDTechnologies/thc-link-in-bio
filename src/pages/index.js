import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 293px));
  justify-content: center;
  grid-gap: 3px;

  @media screen and (min-width: 768px) {
    grid-gap: 1.5rem;
  }
`

const IndexPage = ({ data }) => {
  const instaLinks = data.allSanityInstaLink.nodes
  console.log(data)

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        {instaLinks.map(instaLink => (
          <a href={instaLink.postUrl} key={instaLink.id}>
            <figure style={{ margin: `0` }}>
              <img
                src={`https://images.weserv.nl/?url=${encodeURIComponent(
                  instaLink.thumbnail
                )}&w=293`}
                alt={instaLink.timestamp}
                style={{ margin: `0`, width: `100%`, verticalAlign: `top` }}
              />
            </figure>
          </a>
        ))}
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query InstaLinkQuery {
    allSanityInstaLink(sort: { fields: timestamp, order: DESC }) {
      nodes {
        id
        thumbnail
        timestamp(formatString: "MMMM Do Y")
        postUrl
      }
    }
  }
`

export default IndexPage
