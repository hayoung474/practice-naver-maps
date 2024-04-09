import React, { useEffect, useState } from 'react';
import { DummyType, MapMarker, NaverMap } from '../../types';

interface Props {
  markerDataList: DummyType[];
}
const useMarker = ({ markerDataList }: Props) => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);

  const [activeMarker, setActiveMarker] = useState<MapMarker>();
  const [prevMarker, setPrevMarker] = useState<MapMarker>();

  const createMarkerId = () => {
    return crypto.randomUUID();
  };

  const createMarkerHtmlIcon = (
    size: 'default' | 'click',
    data: DummyType
  ): naver.maps.HtmlIcon => {
    if (size === 'default') {
      return {
        content: [
          `<div class="map-marker ${size}">`,
          `<img class='map-marker-image'src="${data.imgSrc}"/>`,
          `</div>`,
        ].join(''),
        anchor: new naver.maps.Point(18, 0),
      };
    }
    return {
      content: [
        `<div>`,
        `<div class="map-marker ${size}">`,
        `<img class='map-marker-image'src="${data.imgSrc}"/>`,
        `</div>`,
        `<div class='map-marker-label'>${data.name}</div>`,
        `</div>`,
      ].join(''),
      anchor: new naver.maps.Point(27, 0),
    };
  };

  const renderMarkers = (map: NaverMap) => {
    let tempMarkers: MapMarker[] = [];
    markerDataList.forEach((data) => {
      const position = new naver.maps.LatLng(data.lat, data.lng);

      const marker = new naver.maps.Marker({
        map,
        position,

        icon: createMarkerHtmlIcon('default', data),
      });

      const markerObj: MapMarker = {
        id: createMarkerId(),
        marker,
        data,
      };

      marker.addListener('click', () => {
        marker.setIcon(createMarkerHtmlIcon('click', markerObj.data));
        marker.setAnimation(naver.maps.Animation.BOUNCE);
        marker.setZIndex(999);
        setActiveMarker(markerObj);
      });

      tempMarkers.push(markerObj);
    });
    setMarkers(tempMarkers);
  };

  const clearAllMarkers = () => {
    markers.forEach((markerObj) => {
      markerObj.marker.setMap(null);
    });
    setActiveMarker(undefined);
    setPrevMarker(undefined);
  };

  useEffect(() => {
    if (activeMarker?.id !== prevMarker?.id) {
      prevMarker?.marker.setAnimation(null);
      prevMarker?.marker.setZIndex(0);
      prevMarker?.marker.setIcon(
        createMarkerHtmlIcon('default', prevMarker.data)
      );

      setPrevMarker(activeMarker);
    }
  }, [activeMarker, prevMarker]);

  return { renderMarkers, activeMarker, markers, clearAllMarkers };
};

export default useMarker;
