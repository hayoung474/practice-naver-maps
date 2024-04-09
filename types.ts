export interface DummyType {
  name: string;
  imgSrc?: string;
  type: 'restaurant';
  favorite: boolean;
  lat: number;
  lng: number;
}

export type MapMarker = {
  marker?: naver.maps.Marker;
  data?: DummyType;
  id?: string;
  addressData?: {
    results: naver.maps.Service.ResultItem[];
    address: naver.maps.Service.ReverseGeocodeAddress;
  };
};

export type NaverMap = naver.maps.Map;
export type NaverMapMarker = naver.maps.Marker;
