import { registerRootComponent } from "expo";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";

import App from "./App";
import LoginViewOld from "./src/views/LoginViewOld";

async function onMessageReceived(message) {
  // Do something
  console.log("MESSAGE -> ", JSON.parse(message.data.notifee));
  notifee.displayNotification(JSON.parse(message.data.notifee));
}
async function onMessageReceivedBACK(message) {
  // Do something
  console.log("MESSAGE BACK -> ", message);
  notifee.displayNotification(JSON.parse(message.detail.notification));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
notifee.onBackgroundEvent(onMessageReceivedBACK);
// PushNotification.configure({
//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   requestPermissions: true,
// });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App);
