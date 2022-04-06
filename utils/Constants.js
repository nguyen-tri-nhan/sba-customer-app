// const domain = 'http://sbaprj-dev.eba-dyjmryhk.ap-southeast-2.elasticbeanstalk.com';
// const domain = 'http://localhost:5000';
// const domain = 'http://192.168.3.100:5000';
const domain = 'http://192.168.88.171:5000';
const subService = '/pbs-service';

export const ai_domain = 'http://192.168.88.171:8000/makeup';

export const endPoint = `${domain}${subService}`;

export const STATUS = {
  ENABLE: 'ENABLE',
}

export const ENTITY = {
  SHOWROOM: 'showroom',
  PACKAGE: 'package',
  BOOKING: 'booking',
  ADDITIONAL_ITEM: 'addition-item',
  STYLE: 'style',
}