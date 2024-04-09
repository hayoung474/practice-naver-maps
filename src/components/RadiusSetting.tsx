import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NaverMap } from '../../types';

interface Props {
  map: NaverMap;
}
const RadiusSetting = ({ map }: Props) => {
  const [meter, setMeter] = useState<number>(500);

  const handleMeterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMeter(Number(e.target.value));
  };

  const renderCircle = () => {
    const location = map.getCenter();

    const centerMarker = new naver.maps.Marker({
      map,
      position: location,
      icon: {
        url: '/img/icon_home.svg',
        size: new naver.maps.Size(32, 32),
        anchor: new naver.maps.Point(16, 16),
      },
    });

    const circle = new naver.maps.Circle({
      map: map,
      center: location,
      radius: meter, // m

      strokeColor: '#007BF7',
      strokeOpacity: 0.4,
      strokeWeight: 1,
      fillColor: '#007BF7',
      fillOpacity: 0.05,
    });
  };

  return (
    <Wrapper>
      <h2>원 그리기</h2>
      <input
        type='number'
        placeholder='m 단위로 입력하세요.'
        onChange={handleMeterChange}
      />
      <button onClick={renderCircle}>적용하기</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

export default RadiusSetting;
