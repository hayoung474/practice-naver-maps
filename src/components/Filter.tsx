import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface Props {
  filterFavoriteMarkers: (status: boolean) => void;
}
const Filter = ({ filterFavoriteMarkers }: Props) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleIsFavoriteChange = () => {
    setIsFavorite((state) => !state);
  };

  useEffect(() => {
    filterFavoriteMarkers(isFavorite);
  }, [isFavorite]);
  return (
    <Wrapper>
      <h2>필터 테스트</h2>
      <input
        type='checkbox'
        onChange={handleIsFavoriteChange}
        checked={isFavorite}
      />
      <label>favorite만 보기</label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;
export default Filter;
