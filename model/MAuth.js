import AsyncStorage from "@react-native-async-storage/async-storage";

// const MAuth = {
//   login(user) {
//     // Services.login(user).then(({ data }) => {
//     //   localStorage.setItem("JWT", `Bearer ${data.accessToken}`);
//     // })
//     //   .then(() => {
//     //     Services.getMe().then(({ data }) => {
//     //       localStorage.setItem("User", JSON.stringify(data));
//     //     })
//     //       .then(() => {
//     //         PageRouter.redirect("/");
//     //       })
//     //   })

//   },
//   logout() {
//     // await AsyncStorage.clear();
//   },
  
//   // getMe() {
//   //   Services.getMe().then(({ data }) => {
//   //     localStorage.setItem("User", JSON.stringify(data));
//   //   })
//   // },
// }

// export default MAuth;

export const isLoggedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("JWT")
    .then(data => {
      data ? resolve(true) : resolve(false);
    })
  }).catch(err => reject(err));
};