import styled from 'styled-components'

const Box = styled.div/*CSS*/`
background: #FFFFFF;
border-radius: 8px;
padding: 16px;

/* CSS Pré-Pronto */
margin-bottom: 10px;
.boxLink {
  font-size: 14px;
  color: #2E7BB4;
  text-decoration: none;
  font-weight: 800;
}
.boxLink:hover {
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 800;
}
.boxLink:active {
  font-size: 14px;
  color: #2E7BB4;
  text-decoration: none;
  font-weight: 800;
}
.nameStyle{
  font-size: 15px;
  color: #2E7BB4;
  font-weight: 800;
}
.messagesBox{
  padding: 5px;
  background-color:#CAD4E0;
  border-radius: 1em;
}
.messageStyle{
  padding: 10px;
  margin: 5px;
  border: 2px solid #7C93AC;
  border-radius: 10000px;
  background-color: #E1ECFA;
}
.title {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 20px;
}
.subTitle {
  font-size: 18px;
  color: #000000;
  font-weight: 500;
  margin-bottom: 20px;
}
.smallTitle {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 20px;
}
hr {
  margin-top: 12px;
  margin-bottom: 8px;
  border-color: transparent;
  border-bottom-color: #ECF2FA;
}
input {
  width: 100%;
  background-color: #F4F4F4;
  color: #333333;
  border: 0;
  padding: 14px 16px;
  margin-bottom: 14px;
  border-radius: 10000px;
  ::placeholder {
    color: #333333;
    opacity: 1;
  }
}
button {
  border: 0;
  padding: 8px 12px;
  color: #FFFFFF;
  border-radius: 10000px;
  background-color: #6F92BB;
}

button:hover{
  border: 0;
  padding: 8px 12px;
  color: #6F92BB;
  border-radius: 10000px;
  background-color: #FFFFFF;
}

button:active{
  border: 0;
  padding: 8px 12px;
  color: #000000;
  border-radius: 10000px;
  background-color: #daa520;
}
`



export default Box;