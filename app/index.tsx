import { initDB } from "@/firebase/database";
import { useEffect } from "react";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default function Index() {
  useEffect(() => {
    try {
      initDB();
    } catch (err) {
      console.log(err);
    }

    // setupDataListener("history", (items) => {
    //   console.log("setting state with: ", items);
    //   setHistory(items);
    // });
  }, []);

  return <BottomTabNavigator />;
}
