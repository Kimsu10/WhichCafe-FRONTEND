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
    text-align: center;
    color: black;
    
    &:hover{
      color: brown;
    }
  }

h3{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 17em;
  height: 2em;
  border-radius: 0.5em;
  border:1px solid #d5d5d5;
  color: #787777;
  font-weight: 500;
}

p{
  color:  ${props => props.theme.mainColor};
}

  button {
  border: none;
  background-color: transparent;
  font-size: 1.1em;
  padding: 0.5em;
  cursor: pointer;
  color:  ${props => props.theme.subColor};
  border-radius: 0.5em;
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
    border-radius: 0.5em;
    width: 80%;
    height: 2.3em;
    padding: 0 1em;
    border:1px solid #d5d5d5;
    color:  ${props => props.theme.mainColor};

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
