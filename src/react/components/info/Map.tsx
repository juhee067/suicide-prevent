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
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=f327ba502586d8dbf7f5e72ff2ea7792&libraries=services";
    script.onload = initializeMap;

    document.head.appendChild(script);

    // Cleanup: 스크립트가 언마운트될 때 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
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

    const firestore = firebase.firestore();

    firestore
      .collection("map")
      .get()
      .then((querySnapshot) => {
        const positions: { latlng: any; url: any; title: any }[] = []; // 데이터를 저장할 배열

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          positions.push({
            latlng: data.latlng,
            url: data.url,
            title: data.title,
          });
        });

        setCenterPositions(positions);

        // 마커 생성 및 이벤트 처리
        for (let i = 0; i < positions.length; i++) {
          const position = positions[i].latlng;
          const title = positions[i].title;
          const url = positions[i].url;

          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(position.latitude, position.longitude),
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding: 10px; font-size: 1.3rem;">${title}</div>`,
          });

          kakao.maps.event.addListener(marker, "mouseover", function () {
            infowindow.open(map, marker);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          kakao.maps.event.addListener(marker, "click", function () {
            window.open(url, "_blank");
          });
        }
      });
  };

  return <MapContent id="map" ref={mapContainer} />;
};

export default Map;
