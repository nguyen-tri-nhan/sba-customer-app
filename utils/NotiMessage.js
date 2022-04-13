import React from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

export const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            getToken();
        } else {
            requestPermission();
        }
}

const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken', value);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
}

const requestPermission = () => {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
}

const createNotificationListeners = async () => {
    /*
        * Triggered when a particular notification has been received in foreground
        * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        showAlert(title, body);
    });

    /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
        //process data message
        console.log(JSON.stringify(message));
    });
}

const showAlert = (title, body) => {
    Alert.alert(
        title, body,
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
    );
}


