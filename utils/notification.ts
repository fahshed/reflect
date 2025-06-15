import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for notifications!");
      return;
    }

    if (Constants.easConfig?.projectId) {
      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.easConfig.projectId,
        })
      ).data;
      console.log("Notification token", token);
    }
  } else {
    alert("Must use physical device for notifications");
  }
}

export async function scheduleReflectionReminder() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reflect 🌱",
      body: "Log your wins, lessons, or thoughts for today.",
      data: { screen: "Add Entry" },
    },
    trigger: {
      seconds: 60,
    },
  });

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  console.log("scheduleReflectionReminder", scheduled);
}
