import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 293px));
  justify-content: center;
  grid-gap: 3px;
  margin: 0 3px;

  @media screen and (min-width: 768px) {
    grid-gap: 1.5rem;
    margin: 0 1.5rem;
  }
`

const IndexPage = ({ data }) => {
  const instaLinks = data.allSanityInstaLink.nodes
  console.log(instaLinks)

  return (
    <Layout>
      <SEO title="Insta Links" />
      <Container>
        {instaLinks.map(instaLink => (
          <a href={!!instaLink.productLinks[0] ? instaLink.productLinks[0].productUrl : null} key={instaLink.id}>
            {/* <figure style={{ margin: `0` }}>
              <img
                src={`https://images.weserv.nl/?url=${encodeURIComponent(
                  instaLink.thumbnail
                )}&w=293`}
                alt={instaLink.timestamp}
                style={{ margin: `0`, width: `100%`, verticalAlign: `top` }}
              />
            </figure> */}
            <Image
              fluid={instaLink.thumbnail.asset.fluid}
              alt={instaLink.caption}
            />
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
        caption
        id
        timestamp(formatString: "MMMM Do Y")
        postUrl
        productLinks {
          productUrl
        }
        thumbnail {
          asset {
            fluid(maxWidth: 293) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
