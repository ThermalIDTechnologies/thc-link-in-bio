/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"

const LayoutContainer = styled.div`
  margin: 0 auto;

  main {
    padding-top: 3.5rem;
    min-height: -moz-calc(100vh - 210px); /* Firefox */
    min-height: -webkit-calc(100vh -210px); /* Chrome, Safari */
    min-height: calc(100vh - 210px);

    @media screen and (min-width: 768px) {
      padding-top: 1.5rem;
    }
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyles />
      <Header siteTitle={data.site.siteMetadata.title} />
      <LayoutContainer>
        <main>{children}</main>
        <footer style={{ textAlign: `center`, marginTop: `1rem` }}>
          <small>
            © {new Date().getFullYear()}, THC Label Solutions. All Rights
            Reserved.
          </small>
        </footer>
      </LayoutContainer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
