import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 293px));
  justify-content: center;
  grid-gap: 3px;
  margin: 0 0.5rem;

  @media screen and (min-width: 768px) {
    grid-gap: 1.5rem;
    margin: 0 1.5rem;
  }
`

const Btn = styled(motion.a)`
  background-color: #4b7838;
  color: #fff;
  font-size: 85%;
  padding: 0.5rem;
  text-decoration: none;
  text-align: center;
  border-radius: 0.9rem;
  -webkit-box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.6);
  font-weight: 500;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    font-size: 100%;
  }
`

const PageHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 465px));
  justify-content: center;
  margin: 0 0.5rem;

  h6 {
    font-size: 85%;
  }

  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    margin: 0 1.5rem;

    h6 {
      font-size: 100%;
    }
  }
`

const IndexPage = ({ data }) => {
  const instaLinks = data.allSanityInstaLink.nodes
  console.log(instaLinks)

  return (
    <Layout>
      <SEO title="Insta Links" />
      <PageHeader>
        <h6>Click images for product links.</h6>
        <div>
          <Btn
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 200, damping: 300 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: "spring", stiffness: 200, damping: 300 },
            }}
            href="https://www.instagram.com/thcsolutionsinc/"
          >
            <em>Back to Instagram</em>
          </Btn>
        </div>
      </PageHeader>
      <Container>
        {instaLinks.map(instaLink => (
          <div style={{ position: `relative` }}>
            <a
              href={
                !!instaLink.productLinks[0]
                  ? instaLink.productLinks[0].productUrl
                  : null
              }
              key={instaLink.id}
            >
              <Image
                fluid={instaLink.thumbnail.asset.fluid}
                alt={instaLink.caption}
              />
            </a>
            {!!instaLink.productLinks[0] && (
              <div
                style={{
                  position: `absolute`,
                  top: `0`,
                  bottom: `90%`,
                  left: `80%`,
                  right: `0`,
                  textAlign: `center`,
                }}
              >
                <p style={{ margin: `0` }}>&#128279;</p>
              </div>
            )}
          </div>
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
