import http from './http';
import Apis from './Apis';
const URL_PERFIX = process.env.REACT_APP_API;
const Services = {
  getMe() {
    return http.get(URL_PERFIX + Apis.userMe);
  },

  login(user) {
    return http.post(URL_PERFIX + Apis.login, user, {entity: 'STAFF'});
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
    return http.post(URL_PERFIX + Apis.uploadFile, file, null, null, {'Content-Type': 'image/jpg'})
  },

  getShowroom(showroomId) {
    return http.get(URL_PERFIX + Apis.showroom + `/${showroomId}`);
  }
};

export default Services;