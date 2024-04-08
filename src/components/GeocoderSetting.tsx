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

      const defaultSize = new naver.maps.Size(36, 36);
      const focusSize = new naver.maps.Size(54, 54);
      new naver.maps.Marker({
        map,
        position,
        //animation: naver.maps.Animation.BOUNCE,
        icon: {
          content: [
            `<div class="map-marker">`,
            `<img class='map-marker-image'src="https://lh5.googleusercontent.com/proxy/li-sEQCwBoWnJbVpuBp0aZg1FM-3EubbVwCbC5iIQdr0Xq3G2uFBIpCVlL63GnoEAul_FsNWs0mWhSJjY5vVADB5IC7c8ftRnbrDxUYyX-6f4QTyjM8mGyTQkeVD8feFkrlcGH1brRkseycB1_cm_UC65fzCj-c41jVv7DbC2iAKVaIT7Y1fRd8"/>`,
            `</div>`,
          ].join(''),
          size: focusSize,
        },
      });

      map.setCenter(position);
      map.setZoom(16);
    } catch (e) {
      setQuery('');
    }
  };
  return (
    <Wrapper>
      <h2>위치, 마커 설정</h2>
      <input
        type='text'
        value={query}
        onChange={handleQueryChange}
        placeholder='주소를 입력해보세용!'
      />

      <ButtonGroup>
        <button onClick={handleSearchAddress} type='button'>
          주소검색
        </button>
        <button
          onClick={() => setQuery('서울 강남구 영동대로86길 17 육인빌딩')}
        >
          중앙해장
        </button>
        <button onClick={() => setQuery('서울 강남구 테헤란로104길 11')}>
          임고집
        </button>
      </ButtonGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
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
  }
`;

const ButtonGroup = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

export default GeocoderSetting;
