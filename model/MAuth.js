import AsyncStorage from "@react-native-async-storage/async-storage";

const MAuth = {
  login(user) {
    // Services.login(user).then(({ data }) => {
    //   localStorage.setItem("JWT", `Bearer ${data.accessToken}`);
    // })
    //   .then(() => {
    //     Services.getMe().then(({ data }) => {
    //       localStorage.setItem("User", JSON.stringify(data));
    //     })
    //       .then(() => {
    //         PageRouter.redirect("/");
    //       })
    //   })

  },
  logout() {
    // await AsyncStorage.clear();
  },
  isLoggedIn() {
    let bool;
    AsyncStorage.getItem("JWT").then((data) => {
      if (data) {
        bool = true;
      } else {
        bool = false;
      }
    });
    return bool;
  },
  // getMe() {
  //   Services.getMe().then(({ data }) => {
  //     localStorage.setItem("User", JSON.stringify(data));
  //   })
  // },
}

export default MAuth;