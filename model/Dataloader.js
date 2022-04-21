import React, { useEffect, useState } from 'react';
import { STATUS } from '../utils/Constants';
import Services from '../utils/Services';

const DataLoader = ({
  entity,
  size,
  additionalParams,
  renderData,
  renderButton,
  getAll = false,
  useSearchText = false,
  usePagination = false,
  useFilter = false,
  noCard = false,
  jwt,
  initialStatus,
  navigation,
  ...props
}) => {

  const [data, setData] = useState();
  const [page, setPage] = useState(getAll ? undefined : 0);
  const [searchText, setSearchText] = useState();
  const [status, setStatus] = useState(initialStatus);

  const params = {
    page,
    size,
    searchText,
    status: STATUS.ENABLE,
    ...additionalParams //  showroomId, etc
  }

  const searchEntity = () => {
    Services.search(entity, params, jwt)
      .then(({ data }) => setData(data));
  }

  const refreshData = () => {
    searchEntity();
  }

  useEffect(() => {
    refreshData();
    if(navigation){
      navigation.addListener('focus', () => {
        refreshData();
      })
    }
    
  },[page, status]);


  const handleChange = (e) => {
    setSearchText(e.target.value);
  }

  const onFilterChange = (e) => {
    let value = e.target.value;
    if (value === STATUS.ALL) {
      value = null;
    }
    setStatus(value);
  }

  const onPageChange = (zeroBasedPage) => {
    setPage(zeroBasedPage.selected);
  }

  const showData = () => {
    return (
      <>
        {data.content.length > 0 && renderData(data.content)}
        {/* {
          usePagination && <div className="d-flex justify-content-end">
            <Pagination store={data} onPageChange={onPageChange} />
          </div>
        } */}
      </>
    )

  }

  const render = () => {
    return (
      <>
        {
          data && showData()
        }

      </>
    )
  }

  const renderWithCard = () => (
    render()
  )

  return noCard ? render() : renderWithCard();
}

export default DataLoader;