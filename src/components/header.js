// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { motion } from "framer-motion"

import { HeaderContainer } from "./styles/StyledBlogHeader"

const Header = () => (
  <HeaderContainer
    initial={{ opacity: 1, y: -150 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 1, y: -150 }}
    transition={{
      type: "spring",
      stiffness: 60,
      damping: 300,
      delay: 0.05,
    }}
  >
    <div>
      <nav>
        <small>
          <a href="https://thclabelsolutions.com">Home</a> > Insta Links
        </small>
      </nav>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 200, damping: 300 },
        }}
        whileTap={{
          scale: 0.95,
          transition: { type: "spring", stiffness: 200, damping: 300 },
        }}
      >
        <a href="https://thclabelsolutions.com">
          <img
            alt="The House of Custom Logo"
            src="https://res.cloudinary.com/crjars/image/upload/c_scale,f_auto,q_auto:best,w_200,dpr_2.0/v1580234191/thc-logo_300x.png"
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
