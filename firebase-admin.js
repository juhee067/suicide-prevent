// Firebase Admin SDK가 초기화되었습니다.
const admin = require("firebase-admin");

// 서비스 계정 키 JSON 파일 내용 가져오기
const serviceAccount = require("./serviceAccountKey.json");

// 서비스 계정으로 앱 초기화, 관리자 권한 부여
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // 데이터베이스 URL은 데이터베이스 위치에 따라 달라집니다
  databaseURL: "https://helpgatekeeper.firebaseio.com",
});

// 관리자는 보안 규칙에 관계없이 모든 데이터를 읽고 쓸 수 있는 권한을(를)
const db = admin.database();
const ref = db.ref("restricted_access/secret_document");
ref.once("value", function (snapshot) {
  console.log(snapshot.val());
});

const uid = "some-uid";
