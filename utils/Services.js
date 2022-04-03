import http from './http';
import Apis from './Apis';
import { ai_domain, endPoint } from './Constants';
const URL_PERFIX = endPoint;
const Services = {
  getMe(jwt) {
    return http.get({ url: URL_PERFIX + Apis.userMe, jwt });
  },

  login(user, errorHandler) {
    // return http.post(URL_PERFIX + Apis.login, user, {entity: 'CUSTOMER'});
    return http.post({ url: URL_PERFIX + Apis.login, data: user, params: { entity: 'CUSTOMER' }, errorHandler: errorHandler });
  },

  search(entity, params, jwt) {
    return http.get({ url: `${URL_PERFIX}/${entity}`, params, jwt});
  },

  createManager(manager) {
    return http.post(URL_PERFIX + Apis.manager, manager);
  },

  createConsultant(consultant) {
    return http.post(URL_PERFIX + Apis.consultant, consultant);
  },

  createShowroom(showroom) {
    return http.post(URL_PERFIX + Apis.showroom, showroom);
  },

  uploadFile(file) {
    return http.post(URL_PERFIX + Apis.uploadFile, file, null, null, { 'Content-Type': 'image/jpg' })
  },

  getShowroom(showroomId) {
    return http.get(URL_PERFIX + Apis.showroom + `/${showroomId}`);
  },

  getShowrooms(jwt) {
    return http.get({url: URL_PERFIX + Apis.showroom, jwt: jwt, params: { status: 'ENABLE' }});
  },

  previewMakeup(image) {
    return http.post({url: ai_domain, data: {img: image}});
  },

  booking(data, jwt) {
    return http.post({url: URL_PERFIX + Apis.booking, jwt: jwt, data: data})
  }
};

export default Services;