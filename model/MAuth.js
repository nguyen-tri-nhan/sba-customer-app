import PageRouter from '../routes/PageRouter';
import Services from '../util/Services';

const MAuth = {
  login(user) {
    Services.login(user).then(({ data }) => {
      localStorage.setItem("JWT", `Bearer ${data.accessToken}`);
    })
      .then(() => {
        Services.getMe().then(({ data }) => {
          localStorage.setItem("User", JSON.stringify(data));
        })
          .then(() => {
            PageRouter.redirect("/");
          })
      })

  },
  logout() {
    localStorage.clear();
  },
  isLoggedIn() {
    return localStorage.getItem("JWT") ? true : false;
  },
  getMe() {
    Services.getMe().then(({ data }) => {
      localStorage.setItem("User", JSON.stringify(data));
    })
  },
}

export default MAuth;