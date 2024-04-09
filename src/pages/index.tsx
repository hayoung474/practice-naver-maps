import Script from 'next/script';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import Filter from '~/components/Filter';
import GeocoderSetting from '~/components/GeocoderSetting';
import Marker from '~/components/Marker';
import RadiusSetting from '~/components/RadiusSetting';
import { dummyData } from '~/data';
import useNaverMap from '~/hooks/useNaverMap';

export default function Home() {
  const {
    map,
    initialize,
    activeMarker,
    renderMarkers,
    clearAllMarkers,
    handleDestroyMap,
    goToMarker,
    filterFavoriteMarkers,
  } = useNaverMap({
    mapElementId: 'map',
  });

  const handleRenderMarkers = () => {
    map && renderMarkers(map);
  };

  useEffect(() => {
    initialize();
    return () => handleDestroyMap();
  }, []);
  return (
    <Wrapper>
      <MapWrapper>
        <h2>지도 미리보기</h2>
        <div
          id='map'
          style={{ width: '360px', height: '780px', borderRadius: '8px' }}
        ></div>
      </MapWrapper>
      {map && (
        <div className='box2'>
          <GeocoderSetting map={map} />
          <RadiusSetting map={map} />
          <Marker
            handleRenderMarkers={handleRenderMarkers}
            clearAllMarkers={clearAllMarkers}
            goToMarker={goToMarker}
          />
          <Filter filterFavoriteMarkers={filterFavoriteMarkers} />
        </div>
      )}

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

  button {
    padding: 12px 18px;
    color: white;
    background-color: #99c341;
    border: none;
    border-radius: 8px;
  }

  input[type='text'],
  input[type='number'] {
    width: 70%;
    border-radius: 8px;
    border: solid 1px #d6d6d6;
    padding: 12px 18px;
    &::placeholder {
      color: #d6d6d6;
    }
  }

  .box2 {
    flex: 1;
  }
`;

const MapWrapper = styled.div`
  padding: 24px;
  .map-marker {
    border-radius: 50%;
    border: solid 1px #d5dce5;

    box-shadow: 0px 1.2380951642990112px 7.42857027053833px 0px #0000004d;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }

  .map-marker-label {
    margin-top: 6px;

    color: #000;
    text-align: center;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 133.333% */
    letter-spacing: -0.2px;
  }
  .default {
    width: 38px;
    height: 38px;
    padding: 2px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .click {
    width: 54px;
    height: 54px;
    padding: 4px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;
