import { useRef } from 'react';
import styled from 'styled-components';
import useNaverMap from '~/hooks/useNaverMap';

const Component = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMap = useNaverMap({ mapElement: mapRef.current });
  return (
    <Wrapper>
      <div ref={mapRef}>hello</div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Component;
