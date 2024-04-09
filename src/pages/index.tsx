import Script from 'next/script';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GeocoderSetting from '~/components/GeocoderSetting';
import RadiusSetting from '~/components/RadiusSetting';
import { dummyData } from '~/data';
import { DummyType, MapMarker, NaverMap, NaverMapMarker } from '../../types';

const createMarkerHtmlIcon = (
  size: 'small' | 'large',
  data: DummyType
): naver.maps.HtmlIcon => {
  return {
    content: [
      `<div class="map-marker ${size}">`,
      `<img class='map-marker-image'src="${data.imgSrc}"/>`,
      `</div>`,
    ].join(''),
    anchor:
      size === 'small'
        ? new naver.maps.Point(18, 18)
        : new naver.maps.Point(27, 27),
  };
};
export default function Home() {
  const [mapInstance, setMapInstance] = useState<NaverMap>();

  const [markerList, setMarkerList] = useState<NaverMapMarker[]>([]);

  const [activeMarker, setActiveMarker] = useState<MapMarker>();
  const [prevMarker, setPrevMarker] = useState<MapMarker>();

  const [activeMarkerId, setActiveMarkerId] = useState<string>();

  const renderMarkerList = (map: NaverMap) => {
    let temp: NaverMapMarker[] = [];
    dummyData.forEach((data) => {
      const position = new naver.maps.LatLng(data.lat, data.lng);

      const marker = new naver.maps.Marker({
        map,
        position,

        icon: createMarkerHtmlIcon('small', data),
      });

      const markerObj: MapMarker = {
        id: crypto.randomUUID(),
        marker,
        data,
      };

      marker.addListener('click', () => {
        setActiveMarker(markerObj);
        marker.setIcon(createMarkerHtmlIcon('large', markerObj.data));
        marker.setAnimation(naver.maps.Animation.BOUNCE);
        marker.setZIndex(999);
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
    const latitude = 37.5071243;
    const longitude = 127.0669929;

    const location = new naver.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map('map', mapOptions);
    setMapInstance(map);
    renderMarkerList(map);
  }, []);

  useEffect(() => {
    if (activeMarker?.id !== prevMarker?.id) {
      prevMarker?.marker.setAnimation(null);
      prevMarker?.marker.setZIndex(0);
      prevMarker?.marker.setIcon(
        createMarkerHtmlIcon('small', prevMarker.data)
      );

      setPrevMarker(activeMarker);
    }
  }, [activeMarker, prevMarker]);

  // useEffect(() => {
  //   if (activeMarker) {
  //     if (activeMarker.getAnimation()) {
  //       activeMarker.setAnimation(null);
  //       activeMarker
  //     } else {
  //       activeMarker.setAnimation(naver.maps.Animation.BOUNCE);
  //     }
  //     // const bigSize = new naver.maps.Size(100, 100);
  //     // activeMarker.setIcon({ size: bigSize });
  //   }
  // }, [activeMarker]);

  return (
    <Wrapper>
      <MapWrapper>
        <h2>지도 미리보기</h2>
        <div
          id='map'
          style={{ width: '360px', height: '780px', borderRadius: '8px' }}
        ></div>
      </MapWrapper>

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
  .small {
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

  .large {
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
