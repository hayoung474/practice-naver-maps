import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import GeocoderSetting from '~/components/GeocoderSetting';

export type NaverMap = naver.maps.Map;

const latitude = 37.3595704;
const longitude = 127.105399;
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

    const centerMarker = new naver.maps.Marker({
      position: location,
      // animation: naver.maps.Animation.BOUNCE,
      map,
    });

    const circle = new naver.maps.Circle({
      map: map,
      center: location,
      radius: 500, // m

      strokeColor: '#007BF7',
      strokeOpacity: 0.4,
      strokeWeight: 1,
      fillColor: '#007BF7',
      fillOpacity: 0.05,
    });

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
`;
