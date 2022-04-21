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

  loginWithGoogle(user, errorHandler) {
    return http.post({ url: URL_PERFIX + Apis.loginWithGoogle, data: user, errorHandler: errorHandler });
  },

  search(entity, params, jwt) {
    return http.get({ url: `${URL_PERFIX}/${entity}`, params, jwt });
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
    return http.get({ url: URL_PERFIX + Apis.showroom, jwt: jwt, params: { status: 'ENABLE' } });
  },

  previewMakeup(data) {
    return http.post({ url: ai_domain, data: data, headers: { "Content-Type": "multipart/form-data" } });
  },

  booking(data, jwt) {
    return http.post({ url: URL_PERFIX + Apis.booking, jwt: jwt, data: data })
  },

  feedBack(data, jwt) {
    return http.post({ url: URL_PERFIX + Apis.feedback, jwt: jwt, data: data })
  },

  saveMakeupStyle(data, jwt) {
    return http.post({ url: URL_PERFIX + Apis.style_tracking, jwt: jwt, data: data })
  },

  updateBookingItems(id, data, jwt) {
    return http.patch({ url: `${URL_PERFIX + Apis.booking}/${id}/items`, jwt: jwt, data: data });
  },

  updateBookingStatus(id, params, jwt) {
    return http.put({ url: `${URL_PERFIX + Apis.booking}/${id}`, jwt: jwt, params: params })
  },

  getConfiguration(key, jwt) {
    return http.get({ url: `${URL_PERFIX + Apis.configuration}`, params: { key }, jwt });
  },

  updateBookingTransaction(id, data, jwt) {
    console.log("call api")
    return http.post({ url: `${URL_PERFIX + Apis.booking}/${id}/booking-transaction`, jwt: jwt, data: data });
  },
};

export default Services;