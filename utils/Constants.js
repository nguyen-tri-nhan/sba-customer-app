// const domain = 'http://sbaprj-dev.eba-dyjmryhk.ap-southeast-2.elasticbeanstalk.com';
// const domain = 'http://localhost:5000';
// const domain = 'http://192.168.3.100:5000';
// const domain = 'http://192.168.88.171:5000';
const domain = 'http://192.168.1.173:5000';
const subService = '/pbs-service';
// const paymentUrl = `http://192.168.88.171:3000`;
export const paymentUrl = `http://192.168.1.173:3000`;

export const ai_domain = 'http://192.168.88.171:8000/makeup';

export const endPoint = `${domain}${subService}`;

export const STATUS = {
  ENABLE: 'ENABLE',
  FINISH: 'FINISH',
  CANCELED: 'CANCELED',
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  ONBOARD: 'ONBOARD',
}

export const ENTITY = {
  SHOWROOM: 'showroom',
  PACKAGE: 'package',
  BOOKING: 'booking',
  ADDITIONAL_ITEM: 'addition-item',
  STYLE: 'style',
  SLOT: 'slot',
  FEEDBACK: 'feedback',
  STYLE_TRACKING: 'style-tracking',
}

export const STATUS_TRANS = {
  FINISH: 'Hoàn thành',
  CANCELED: 'Hủy',
  PENDING: 'Đang chờ',
  PROCESSING: 'Đang thực hiện',
}

export const DressDateNotification = (showroom) => {
  return {
    title: 'Bạn có lịch thử đồ vào hôm nay.',
    body: `Bạn có lịch thử đồ tại ${showroom.name} vào hôm nay`,
    data: undefined,
  }
}

export const PhotoDateNotification = (showroom) => {
  return {
    title: 'Bạn có lịch chụp ảnh vào hôm nay.',
    body: `Bạn có lịch chụp ảnh tại ${showroom.name} vào hôm nay`,
    data: undefined,
  }
} 