export interface ImageMarkerType {
  img: string;
  name: string;
  lat: number;
  lng: number;
}

export type MapMarker = {
    marker?: naver.maps.Marker;
    data?: ImageMarkerType;
    propertyId?: number;
    id?: string;
    addressData?: {
      results: naver.maps.Service.ResultItem[];
      address: naver.maps.Service.ReverseGeocodeAddress;
    };
  };