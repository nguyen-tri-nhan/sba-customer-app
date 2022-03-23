import http from './http';
import Apis from './Apis';
import { endPoint } from './Constants';
const URL_PERFIX = endPoint
const Services = {
  getMe(jwt) {
    return http.get({ url: URL_PERFIX + Apis.userMe, jwt });
  },

  login(user) {
    // return http.post(URL_PERFIX + Apis.login, user, {entity: 'CUSTOMER'});
    return http.post({ url: URL_PERFIX + Apis.login, data: user, params: { entity: 'CUSTOMER' } });
  },

  search(entity, params) {
    return http.get(`${URL_PERFIX}/${entity}`, null, params);
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
  }
};

export default Services;