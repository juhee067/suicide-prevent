import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any; // 또는 kakao.maps의 타입 정의를 추가하여 더 구체적으로 지정할 수 있습니다.
  }
}
const { kakao } = window;
const Map = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    let options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };

    const map = new kakao.maps.Map(mapContainer.current, options);

    console.log("loading kakaomap");
  }, []);

  return (
    <div id="map" ref={mapContainer} style={{ width: "100%", height: "350px", display: "block" }}></div>
  );
};

export default Map;
