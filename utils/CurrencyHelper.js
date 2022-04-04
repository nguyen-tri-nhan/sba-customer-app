export const toVND = (number) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  return formatter.format(number);
}

export const toUSD = (number) => {
  return (number/23000).toFixed(2)
}