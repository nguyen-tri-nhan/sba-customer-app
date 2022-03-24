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
  ...props
}) => {

  const [data, setData] = useState();
  const [page, setPage] = useState(getAll ? undefined : 0);
  const [searchText, setSearchText] = useState();
  const [status, setStatus] = useState();

  const params = {
    page,
    size,
    searchText,
    status,
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
  }, [page, status]);


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

  // const renderFilter = () => {
  //   return (
  //     <div className='d-flex align-items-center mr-5'>
  //       <div style={{ flex: 'none' }}>
  //         Trạng thái:
  //       </div>
  //       <select style={{ border: 'none' }} defaultValue={STATUS.ALL} variant='standard' onChange={onFilterChange}>
  //         <option value={STATUS.ALL}>Tất cả</option>
  //         <option value={STATUS.DISABLE}>{renderStatusLabel(STATUS.DISABLE)}</option>
  //         <option value={STATUS.ENABLE}>{renderStatusLabel(STATUS.ENABLE)}</option>
  //         <option value={STATUS.UNCONFIRMED}>{renderStatusLabel(STATUS.UNCONFIRMED)}</option>
  //       </select>
  //     </div>
  //   )
  // }

  // const renderSearchText = () => {
  //   return (
  //     <TextField
  //       className="bg-white"
  //       type="text"
  //       id='search-input'
  //       spellCheck="false"
  //       variant="outlined"
  //       size="small"
  //       placeholder='Tìm kiếm'
  //       fullWidth
  //       onKeyDown={handleKeyDown}
  //       onChange={handleChange}
  //       InputProps={{
  //         startAdornment: (
  //           <InputAdornment position="start">
  //             <Search />
  //           </InputAdornment>
  //         ),
  //         endAdornment: useFilter && renderFilter()
  //       }}
  //     />
  //   )
  // }

  const onPageChange = (zeroBasedPage) => {
    setPage(zeroBasedPage.selected);
  }

  const showData = () => {
    return (
      <>
        {data.content.length > 0 ? renderData(data.content) : 'Chưa có dữ liệu'}
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
        {/* <div className={useSearchText && 'row mb-3'}>
          <div className='col'>
            {useSearchText && renderSearchText()}
          </div>
          {renderButton && <div className='col-sm col-sm-auto'>
            {renderButton()}
          </div>}
        </div> */}
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