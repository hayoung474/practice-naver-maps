import React, { useEffect, useState } from 'react';
import { DummyType, MapMarker, NaverMap } from '../../types';

interface Props {
  markerDataList: DummyType[];
}
const useMarker = ({ markerDataList }: Props) => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);

  const [activeMarker, setActiveMarker] = useState<MapMarker>();
  const [prevMarker, setPrevMarker] = useState<MapMarker>();

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
        anchor: new naver.maps.Point(18, 18),
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
      anchor: new naver.maps.Point(27, 27),
    };
  };

  const renderMarkers = (map: NaverMap) => {
    if (markers) {
      clearAllMarkers();
    }
    let tempMarkers: MapMarker[] = [];
    markerDataList.forEach((data) => {
      const position = new naver.maps.LatLng(data.lat, data.lng);

      const marker = new naver.maps.Marker({
        map,
        position,

        icon: createMarkerHtmlIcon('default', data),
      });

      const markerObj: MapMarker = {
        marker,
        data,
      };

      marker.addListener('click', () => {
        settingActiveMarker(markerObj);
      });
      tempMarkers.push(markerObj);
    });
    setMarkers(tempMarkers);
  };

  const settingActiveMarker = (markerObj: MapMarker) => {
    markerObj.marker.setIcon(createMarkerHtmlIcon('click', markerObj.data));
    markerObj.marker.setAnimation(naver.maps.Animation.BOUNCE);
    markerObj.marker.setZIndex(999);

    setActiveMarker(markerObj);
  };

  const clearAllMarkers = () => {
    markers.forEach((markerObj) => {
      markerObj.marker.setMap(null);
    });
    setActiveMarker(undefined);
    setPrevMarker(undefined);
  };

  useEffect(() => {
    if (activeMarker?.data.id !== prevMarker?.data.id) {
      prevMarker?.marker.setAnimation(null);
      prevMarker?.marker.setZIndex(0);
      prevMarker?.marker.setIcon(
        createMarkerHtmlIcon('default', prevMarker.data)
      );

      setPrevMarker(activeMarker);
    }
  }, [activeMarker, prevMarker]);

  return {
    renderMarkers,
    activeMarker,
    markers,
    clearAllMarkers,
    settingActiveMarker,
  };
};

export default useMarker;
