export const VietNameseDate = [
  'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'
]

export const ago = (days, date = new Date()) => {
  let modifiedDate = new Date(date);
  modifiedDate.setDate(modifiedDate.getDate() + days);
  return modifiedDate;
}