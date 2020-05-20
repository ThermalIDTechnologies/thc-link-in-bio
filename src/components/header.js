// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { motion } from "framer-motion"

import { HeaderContainer } from "./styles/StyledBlogHeader"

const Header = () => (
  <HeaderContainer
    initial={{ opacity: 0, y: -60 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -60 }}
    transition={{
      type: "spring",
      damping: 300,
      delay: 0.2,
    }}
  >
    <div>
      <nav>
        <small>
          <a href="https://thclabelsolutions.com">Home</a> > Link in bio
        </small>
      </nav>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", damping: 300 },
        }}
        whileTap={{
          scale: 0.95,
          transition: { type: "spring", damping: 300 },
        }}
      >
        <a href="https://thclabelsolutions.com">
          <img
            alt="The House of Custom Logo"
            src="https://res.cloudinary.com/crjars/image/upload/c_scale,f_auto,q_auto:best,w_180/v1580234191/thc-logo_300x.png"
          />
        </a>
      </motion.div>
    </div>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
