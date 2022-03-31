import { StyleSheet } from "react-native";

export const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 32
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    linkText: {
      fontSize: 14,
      color: "#2e78b7",
    },
    inputView: {
      borderRadius: 10,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      borderWidth: 1,
      justifyContent: 'center',
    },
  
    textInput: {
      height: 50,
      flex: 1,
    },
    titleText: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 24
    },
    listItem: {
      flex: 1,
      // backgroundColor: "#fff",
      alignItems: "center",
    },
    packagesItem: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
      margin: 5
    },
    packagesPrice: {
      textAlign: 'right'
    },
    packageDetailsTitle: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: "bold"
    },
    packageDetailsPrice: {
      textAlign: 'right',
      marginRight: 10,
    },
    imageSliderCard: {
      width: '100%',
      marginBottom: 10,
      flex: 3
    },
    packageDetailsTitleCard: {
      marginBottom: 20,
      flex: 6
    },
    packageDetailsFooter: {
      justifyContent: 'center',
      flex: 1
    },
    packageDetailsContainer: {
      flex: 1
    },
    packageDetailsBookingButton: {
      flex: 1,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookingTopIndicator: {
      paddingTop: 10,
    },
    errorMessageText: {
      color: 'red',
    }
  });
}