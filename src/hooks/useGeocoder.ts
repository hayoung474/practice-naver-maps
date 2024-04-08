type AddressItem = naver.maps.Service.AddressItemV2;

const useGeocoder = () => {
  const handleQuerySearch = (query: string): Promise<AddressItem> => {
    return new Promise((resolve, reject) => {
      naver.maps.Service.geocode(
        {
          query,
        },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK) {
            alert('문제가 발생하였습니다.');
            reject();
          }

          const { addresses } = response.v2; // 검색 결과의 컨테이너
          if (addresses.length === 0) {
            alert('검색 결과가 없습니다');
            reject();
          }

          resolve(addresses[0]);
        }
      );
    });
  };
  return { handleQuerySearch };
};

export default useGeocoder;
