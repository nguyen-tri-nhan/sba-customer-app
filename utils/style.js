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
      width: "90%",
      height: 40,
      marginBottom: 20,
      alignItems: "flex-start",
      borderBottomWidth: 0.5,
      paddingLeft: 20,
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
    packageContainer: {
      flex: 1,
    },
    packagesItem: {
      minWidth: 360,
      width: '100%',
      flex: 1,
      padding: 10,
      margin: 5,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    packageImage: {
      width: 75,
      height: 75,
      flex: 2,
      marginRight: 10
    },
    packageInfomation: {
      flex: 8,
      backgroundColor:"#FFF"
    },
    packageTitle: {
      fontWeight: 'bold',
      color:"#000"
    },
    packageTextSecondary: {
      fontSize: 12,
      color: 'gray'
    },
    packagesPrice: {
      paddingTop: 10,
      textAlign: 'right',
      color:"#000"
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
      flex: 1,
      backgroundColor:"#E14C4C"
    },
    packageDetailsContainer: {
      flex: 1
    },
    customerInformation: {
      flex: 9,
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
    },
    submit: {
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#68a0cf',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
      width: '60%'
    },
    submitText: {
      color: '#fff',
      textAlign: 'center',
    },

    additionalItemContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 4,
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    additionalItemAmount: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    mt_40: {
      marginTop: 40,
    }
  });
}