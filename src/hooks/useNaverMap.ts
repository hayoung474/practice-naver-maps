import { useCallback, useState } from 'react';
import { NaverMap } from '../../types';
import useMarker from './useMarker';
import { dummyData } from '~/data';

const DEFAULT_LAT = 37.5071243;
const DEFAULT_LNG = 127.0669929;
interface Props {
  mapElementId: string;
}
const useNaverMap = ({ mapElementId }: Props) => {
  const [map, setMap] = useState<NaverMap>();
  const {
    markers,
    renderMarkers,
    activeMarker,
    clearAllMarkers,
    settingActiveMarker,
  } = useMarker({
    markerDataList: dummyData,
  });

  const initialize = () => {
    const location = new naver.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG);
    const mapOptions = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map(mapElementId, mapOptions);
    setMap(map);
    renderMarkers(map);
  };

  const goToMarker = (id: string) => {
    const targetMarker = markers.find((marker) => marker.data.id === id);

    if (!targetMarker) {
      return;
    }
    // map?.setCenter(targetMarker.marker.getPosition());
    settingActiveMarker(targetMarker);
  };

  const filterFavoriteMarkers = (status: boolean) => {
    const filtered = markers.filter((marker) => !marker.data.favorite);
    if (status) {
      filtered.forEach((marker) => marker.marker.setMap(null));
      return;
    }
    if (map) {
      filtered.forEach((marker) => marker.marker.setMap(map));
    }
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
    goToMarker,
    filterFavoriteMarkers,
  };
};
export default useNaverMap;
