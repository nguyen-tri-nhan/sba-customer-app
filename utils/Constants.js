// const domain = 'http://sbaprj-dev.eba-dyjmryhk.ap-southeast-2.elasticbeanstalk.com';
// const domain = 'http://localhost:5000';
// const domain = 'http://192.168.3.100:5000';
// const domain = 'http://172.20.10.2:5001';
// const domain = 'http://192.168.88.171:5000';
const domain = 'http://123.20.254.120:5000';
const subService = '/pbs-service';

export const ai_domain = 'http://123.20.254.120:8000/make';

export const paypal = 'http://123.20.254.120:3000/';

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
  SLOT_PHOTO: 'slot/photo',
  FEEDBACK: 'feedback',
  STYLE_TRACKING: 'style-tracking',
  SLOT_DRESS: 'slot/dress',
}

export const STATUS_TRANS = {
  FINISH: 'Hoàn thành',
  CANCELED: 'Hủy',
  PENDING: 'Đang chờ',
  PROCESSING: 'Đang thực hiện',
}