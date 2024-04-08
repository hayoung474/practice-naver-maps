import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import useGeocoder from '~/hooks/useGeocoder';
import { NaverMap } from '~/pages';

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

      console.log(position);
      new naver.maps.Marker({
        map,
        position,
        animation: naver.maps.Animation.BOUNCE,
      });

      map.setCenter(position);
      map.setZoom(16);
    } catch (e) {
      setQuery('');
    }
  };
  return (
    <Wrapper>
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
  input {
    width: 70%;
    font-size: 18px;
    border-radius: 8px;
    border: solid 1px #d6d6d6;
    padding: 18px 24px;
    &::placeholder {
      color: #d6d6d6;
    }
  }
  button {
    font-size: 18px;
    padding: 18px 24px;
    color: #24332c;
    background-color: #99c341;
    border: none;
    border-radius: 8px;
    margin-left: 16px;
  }
`;

export default GeocoderSetting;
