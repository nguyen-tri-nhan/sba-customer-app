// const domain = 'http://sbaprj-dev.eba-dyjmryhk.ap-southeast-2.elasticbeanstalk.com';
// const domain = 'http://localhost:5000';
const domain = 'http://192.168.1.173:5000';
const subService = '/pbs-service';

export const endPoint = `${domain}${subService}`;

export const STATUS = {
  ENABLE: 'ENABLE',
}

export const ENTITY = {
  SHOWROOM: 'showroom',
  PACKAGE: 'package',
  BOOKING: 'booking',
  ADDITIONAL_ITEM: 'additionalItem',
}