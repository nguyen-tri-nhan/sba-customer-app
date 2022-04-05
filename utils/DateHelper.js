export const VietNameseDate = [
  'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'
]

export const ago = (days) => {
  var date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}