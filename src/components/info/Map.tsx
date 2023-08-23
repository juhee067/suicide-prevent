import React, { useEffect, useRef, useState } from "react";
import "firebase/compat/firestore";
import styled from "styled-components";
import firebase from "firebase/compat/app";

const MapContent = styled.div`
  width: 100%;
  height: 350px;
`;

declare global {
  interface Window {
    kakao: any; // 또는 kakao.maps의 타입 정의를 추가하여 더 구체적으로 지정할 수 있습니다.
  }
}

const Map = () => {
  let [centerPositions, setCenterPositions] = useState<any[]>([]);
  const mapContainer = useRef(null);
  useEffect(() => {
    // Kakao 지도 API 로드 후 초기화
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=f327ba502586d8dbf7f5e72ff2ea7792&libraries=services";
    script.onload = () => {
      // API 스크립트 로드 완료 후 실행할 내용
      const { kakao } = window;
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 13,
      };
      const map = new kakao.maps.Map(mapContainer.current, options);

      const firebaseConfig = {
        apiKey: "AIzaSyDDho3nLDhmLb9GhFu0XndeOfw5mwV9TOI",
        authDomain: "helpgatekeeper.firebaseapp.com",
        projectId: "helpgatekeeper",
        storageBucket: "helpgatekeeper.appspot.com",
        messagingSenderId: "6877543437",
        appId: "1:6877543437:web:0e3218cd5409b614706944",
        measurementId: "G-YXXEZCCGH5",
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      // Firestore 인스턴스 생성
      const firestore = firebase.firestore();
      const positions: firebase.firestore.DocumentData[] = [];

      // 데이터 읽기
      firestore
        .collection("map")
        .get()
        .then((querySnapshot) => {
          const positions: { latlng: any; url: any; title: any }[] = []; // 데이터를 저장할 배열

          querySnapshot.forEach((doc) => {
            const data = doc.data();

            // data 객체에 문서의 데이터와 ID를 함께 저장
            positions.push({
              latlng: data.latlng,
              url: data.url,
              title: data.title,
            });
          });

          // positions 배열에는 각 문서의 데이터와 ID가 포함되어 있습니다.

          // 이제 positions 배열을 활용하여 마커 생성 및 추가, 인포윈도우 생성 등의 작업을 수행할 수 있습니다.
          setCenterPositions(positions);
        });
      // 마커 생성 및 이벤트 처리
      for (var i = 0; i < centerPositions.length; i++) {
        const position = centerPositions[i].latlng;
        const title = centerPositions[i].title;
        const url = centerPositions[i].url;

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(position.latitude, position.longitude),
        });

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="
          padding:10px;
          font-size:1.3rem
          ">${title}</div>`,
        });

        // 마커에 마우스 오버 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.open(map, marker);
        });

        // 마커에 마우스 아웃 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });

        // 마커를 클릭하면 해당 URL로 이동합니다
        kakao.maps.event.addListener(marker, "click", makeClickListener(url));
      }
    };

    document.head.appendChild(script);
  }, []);

  function makeClickListener(url: string) {
    return function () {
      window.open(url);
    };
  }

  return <MapContent id="map" ref={mapContainer} />;
};

export default Map;
