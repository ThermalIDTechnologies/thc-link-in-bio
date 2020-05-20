import styled from "styled-components"
import { motion } from "framer-motion"

export const HeaderContainer = styled(motion.header)`
  background-image: url("https://res.cloudinary.com/crjars/image/upload/f_auto,q_auto:best/v1581975492/Dope-background-image.jpg");
  height: 150px;

  div {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;

    nav {
      display: flex;

      small {
        color: #fff;
        margin: 0.5rem 1rem;
        flex: 1;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }

    div {
      margin: 0;
      position: absolute;
      width: 180px;
      height: 180px;
      left: 50%;
      margin-left: -90px;
      top: 135%;
      z-index: 10;
    }
  }
`
