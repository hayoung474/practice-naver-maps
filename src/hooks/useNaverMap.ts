import { useCallback, useState } from 'react';
import { NaverMap } from '../../types';
import useMarker from './useMarker';
import { dummyData } from '~/data';

interface Props {
  mapElementId: string;
}
const useNaverMap = ({ mapElementId }: Props) => {
  const [map, setMap] = useState<NaverMap>();
  const { markers, renderMarkers, activeMarker, clearAllMarkers } = useMarker({
    markerDataList: dummyData,
  });

  const initialize = () => {
    const latitude = 37.5071243;
    const longitude = 127.0669929;

    const location = new naver.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map(mapElementId, mapOptions);
    setMap(map);
    renderMarkers(map);
  };

  const handleDestroyMap = useCallback(() => {
    map?.destroy();
  }, [map]);

  return {
    initialize,
    map,
    markers,
    activeMarker,
    renderMarkers,
    clearAllMarkers,
    handleDestroyMap,
  };
};
export default useNaverMap;
