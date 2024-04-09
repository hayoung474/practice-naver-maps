import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import useGeocoder from '~/hooks/useGeocoder';
import { NaverMap } from '../../types';

interface Props {
  map: NaverMap;
}
const GeocoderSetting = ({ map }: Props) => {
  const [query, setQuery] = useState<string>('');

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { handleQuerySearch } = useGeocoder();

  const handleSearchAddress = async () => {
    try {
      const address = await handleQuerySearch(query);

      const position = new naver.maps.LatLng(
        Number(address.y),
        Number(address.x)
      );
      new naver.maps.Marker({
        map,
        position,
      });

      map.setCenter(position);
      map.setZoom(16);
    } catch (e) {
      setQuery('');
    }
  };
  return (
    <Wrapper>
      <h2>주소 검색 마커 찍기</h2>
      <input
        type='text'
        value={query}
        onChange={handleQueryChange}
        placeholder='주소를 입력해보세용!'
      />
      <button onClick={handleSearchAddress} type='button'>
        주소검색
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

export default GeocoderSetting;
