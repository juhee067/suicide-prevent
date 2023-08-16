import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @font-face {
     font-family: 'DungGeunMo';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

@font-face {
    font-family: 'KyoboHandwriting2022khn';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KyoboHandwriting2022khn.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KyoboHandwriting2020A';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/KyoboHandwriting2020A.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    html {
  font-size: 10px;
  
}


*,
*:before,
*:after {
box-sizing:border-box;
/* outline: 1px solid #f00; */
}

body {
  position: relative;
  font-family: "Pretendard";
  font-weight: normal;
  margin: 0;
  padding: 0;
  line-height: 1;
  letter-spacing: -0.025em;
  scrollbar-width: none;
    -ms-overflow-style: none;
}
body::-webkit-scrollbar {
    display: none;
  }
 /* 전역 스크롤바 스타일링 */
 /* ::-webkit-scrollbar {
 
    width: none
    
  } */

  /* ::-webkit-scrollbar-thumb {
  
    background-color: #6f6f6f;
    border:2px solid #353535;
border-right: none;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  ::-webkit-scrollbar-track {

    background-color: #e1e1e1;
    border-left:2px solid #353535;
  } */
  
ul,
ol,
li,
dl,
dt,
dd {
  margin: 0;
  padding: 0;
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
figure {
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  border: 0;
  vertical-align: middle;
  font-size: 0;
  max-width: 100%;
  user-select: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

select,
input,
textarea,
button {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
  cursor: pointer;
}

select,
input,
button {
  vertical-align: middle;
  user-select: none;
}

b,
strong {
  font-weight: normal;
}

address,
em,
i {
  font-style: normal;
  font-weight:100
}

hr {
  margin: 0;
  padding: 0;
  border: none;
  display: block;
}

header,
footer,
article,
section,
aside,
nav,
main {
  display: block;
}

button,
input,
select,
textarea {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* screen reader only */
.sr-only,
.hidden,
.blind,
.IR {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Skip to content */
.skip-to {
  position: absolute;
  top: -99px;
  left: 0;
  background: #333;
  color: #fff;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  z-index: 999;
}

.skip-to:hover,
.skip-to:focus,
.skip-to:active {
  display: block;
  top: 0;
}

.row:after,
.row:before {
  content: "";
  display: block;
}

.row:after {
  clear: both;
}

`;
export default GlobalStyles;
