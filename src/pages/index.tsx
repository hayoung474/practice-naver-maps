import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import GeocoderSetting from '~/components/GeocoderSetting';
import RadiusSetting from '~/components/RadiusSetting';

export type NaverMap = naver.maps.Map;

const latitude = 37.5071243;
const longitude = 127.0669929;

export default function Home() {
  const [mapInstance, setMapInstance] = useState<NaverMap>();
  const mapRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const location = new naver.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map('map', mapOptions);

    setMapInstance(map);
  }, []);

  return (
    <Wrapper>
      <div
        className='box1'
        id='map'
        style={{ width: '800px', height: '800px' }}
      ></div>
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
    flex: 1;
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
