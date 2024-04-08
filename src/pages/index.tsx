import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import GeocoderSetting from '~/components/GeocoderSetting';
import RadiusSetting from '~/components/RadiusSetting';
import { dummyData } from '~/data';

export type NaverMap = naver.maps.Map;
export type NaverMapMarker = naver.maps.Marker;

const latitude = 37.5071243;
const longitude = 127.0669929;

export default function Home() {
  const [mapInstance, setMapInstance] = useState<NaverMap>();
  const mapRef = useRef<HTMLDivElement>();

  const [markerList, setMarkerList] = useState<NaverMapMarker[]>([]);

  const renderMarkerList = (map: NaverMap) => {
    let temp: NaverMapMarker[] = [];
    dummyData.forEach((dummy) => {
      const position = new naver.maps.LatLng(dummy.lat, dummy.lng);

      const marker = new naver.maps.Marker({
        map,
        position,

        icon: {
          content: [
            `<div class="map-marker">`,
            `<img class='map-marker-image'src="${dummy.imgSrc}"/>`,
            `</div>`,
          ].join(''),
        },
      });
      temp.push(marker);
    });
    setMarkerList(temp);
  };

  const clearMarkerList = () => {
    markerList.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkerList([]);
  };

  useEffect(() => {
    const location = new naver.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map('map', mapOptions);
    setMapInstance(map);
    renderMarkerList(map);
  }, []);

  return (
    <Wrapper>
      <div className='box1'>
        <h2>지도 미리보기</h2>
        <div
          id='map'
          style={{ width: '360px', height: '780px', borderRadius: '8px' }}
        ></div>
      </div>

      <div className='box2'>
        {mapInstance && <GeocoderSetting map={mapInstance} />}
        {mapInstance && <RadiusSetting map={mapInstance} />}
      </div>
      <Script
        type='text/javascript'
        strategy='beforeInteractive'
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  .box1 {
    padding: 24px;
  }
  .box2 {
    flex: 1;
  }

  .map-marker {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: solid 1px #d5dce5;
    z-index: 1;

    box-shadow: 0px 1.2380951642990112px 7.42857027053833px 0px #0000004d;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  .map-marker > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    z-index: 2;
  }
`;
