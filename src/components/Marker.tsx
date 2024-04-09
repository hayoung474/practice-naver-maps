import React from 'react';
import { styled } from 'styled-components';
import { dummyData } from '~/data';

interface Props {
  goToMarker: (id: string) => void;
  handleRenderMarkers: () => void;
  clearAllMarkers: () => void;
}
const Marker = ({
  goToMarker,
  handleRenderMarkers,
  clearAllMarkers,
}: Props) => {
  return (
    <Wrapper>
      <h2>마커 테스트</h2>

      <div>
        <h4>해당 마커 위치로 이동하기</h4>
        <ButtonGroup>
          {dummyData.map((data) => {
            return (
              <button key={data.id} onClick={() => goToMarker(data.id)}>
                {data.name}
              </button>
            );
          })}
        </ButtonGroup>
      </div>
      <div>
        <h4>마커 제어</h4>
        <ButtonGroup>
          <button onClick={handleRenderMarkers}>마커 다시 그리기</button>
          <button onClick={clearAllMarkers}>마커 싹다 지우기</button>
        </ButtonGroup>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
export default Marker;
