import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .BodyBox{
    display: flex;
    width: 780px;
  }

  ul,li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
  border: none;
  background-color: transparent;
  font-size: 1.1em;
  padding: 0.5em;
  cursor: pointer;
  color: black;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
}

  input {
    background-color: transparent;
    outline: none;
    font-size: 1em;
    vertical-align: middle;
  }

  img{
    display:block;
    border:0;
  }

  .slick-slide {
    display: flex !important;
    justify-content: center;
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    background-color: white;
  }

  select {
    width: 12em;
    height: 2.5em;
    margin: 1em 0;
    border-radius: 5px;
  }
`;

export default GlobalStyle;
