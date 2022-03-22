// import AsyncStorage from "@react-native-async-storage/async-storage";

const MAuth = {
  // login(user) {
  //   Services.login(user).then(({ data }) => {
  //     localStorage.setItem("JWT", `Bearer ${data.accessToken}`);
  //   })
  //     .then(() => {
  //       Services.getMe().then(({ data }) => {
  //         localStorage.setItem("User", JSON.stringify(data));
  //       })
  //         .then(() => {
  //           PageRouter.redirect("/");
  //         })
  //     })

  // },
  logout() {
    // await AsyncStorage.clear();
  },
  isLoggedIn() {
    // return AsyncStorage.getItem("JWT") ? true : false;
  },
  // getMe() {
  //   Services.getMe().then(({ data }) => {
  //     localStorage.setItem("User", JSON.stringify(data));
  //   })
  // },
}

export default MAuth;