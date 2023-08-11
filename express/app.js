const express = require("express");
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("hello World!");
// });
// app.use(express.static("public"));
// 3000번 포트로 웹 서버 실행
app.listen(port, () => {
  console.log(`서버가 실행됩니다`);
});
