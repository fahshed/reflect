import { AuthProvider } from "@/context/authContext";
import { registerForPushNotificationsAsync } from "@/utils/notification";
import * as Notifications from "expo-notifications";
import { useNavigationContainerRef } from "expo-router";
import React, { useEffect } from "react";
import AppNavigator from "./navigation/AppNavigator";

export default function Index() {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    function setupNotifications() {
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const screen = response.notification.request.content.data.screen;
          if (screen === "Add Entry") {
            navigationRef?.navigate("Add Entry");
          }
        });

      return () => subscription.remove();
    }

    setupNotifications();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator navRef={navigationRef} />
    </AuthProvider>
  );
}
