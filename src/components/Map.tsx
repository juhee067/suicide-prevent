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
    const position = new kakao.maps.LatLng(35.85133, 127.734086);
    let options = {
      center: position,
      level: 13,
    };

    const map = new kakao.maps.Map(mapContainer.current, options);

    var positions = [
      {
        title: "<div>대한민국 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(37.543955, 127.077746),
        url: "http://xn--vh3b36f6qf0ub.com/",
      },
      {
        title: "<div>서울특별시 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(37.565792, 126.977943),
        url: "http://www.suicide.or.kr/",
      },
      {
        title: "<div>부산광역시 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(35.097004, 129.034504),
        url: "http://suicide.busaninmaum.com/",
      },
      {
        title: "<div>인천광역시 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(37.476916, 126.641211),
        url: "https://imhc.or.kr/",
      },
      {
        title: "<div>대구광역시 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(35.867715, 128.599998),
        url: "https://mental.dgmhc.o",
      },
      {
        title: "<div>광주광역시 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(35.156487, 126.851301),
        url: "http://www.gmhc.kr/?sid=193",
      },
      {
        title: "<div>대전광역시 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(36.357547, 127.394288),
        url: "https://www.djpmhc.or.kr/index.php",
      },
      {
        title: "<div>울산광역시 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(35.546055, 129.258557),
        url: "http://www.usmind.or.kr/#none",
      },
      {
        title: "<div>세종특별자치시 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(36.492148, 127.265677),
        url: "http://www.sjcmhc.com/",
      },
      {
        title: "<div>경기도 자살예방센터</div>",
        latlng: new kakao.maps.LatLng(37.242444, 127.223553),
        url: "https://www.mentalhealth.or.kr/",
      },
    ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].title, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
      kakao.maps.event.addListener(marker, "click", makeClickListener(positions[i].url));
    }

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(
      map: any,
      marker: any,
      infowindow: { open: (arg0: any, arg1: any) => void }
    ) {
      return function () {
        infowindow.open(map, marker);
      };
    }
    // 마커 클릭 이벤트 핸들러
    function makeClickListener(url: string) {
      return function () {
        window.location.href = url; // 해당 마커의 URL로 이동
      };
    }
    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow: { close: () => void }) {
      return function () {
        infowindow.close();
      };
    }
  }, []);

  return (
    <div id="map" ref={mapContainer} style={{ width: "100%", height: "350px", display: "block" }}></div>
  );
};

export default Map;
