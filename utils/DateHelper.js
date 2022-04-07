export const VietNameseDate = [
  'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'
]

export const ago = (days, date = new Date()) => {
  let modifiedDate = new Date(date);
  modifiedDate.setDate(modifiedDate.getDate() + days);
  return modifiedDate;
}

export const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const addDate = (date,num) => {
  const data = new Date(date);
  data.setDate(data.getDate() + num)
  return formatDate(data);
}