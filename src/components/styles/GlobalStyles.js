import { createGlobalStyle } from "styled-components"
import "typeface-raleway"

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Raleway, sans-serif;
    font-size: 16px;
    line-height: 1.9;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3 {
    font-family: Raleway, sans-serif;
    line-height: 1.3;
  }

  h4,
  h5,
  h6 {
    font-family: Raleway, sans-serif;
    line-height: 1.9;
    font-size: 105%;
  }

  td {
    font-size: 90%;
  }

  @media screen and (min-width: 480px) {
    body {
      font-size: 115%;
    }

    h4,
    h5 {
      font-size: 105%;
    }

    h6 {
      font-size: 90%;
    }
    
    td {
      font-size: 100%;
    }
}
`

export default GlobalStyle
