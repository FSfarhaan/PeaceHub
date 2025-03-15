import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function VideoCallScreen() {
  const jitsiURL = "https://meet.jit.si/YourMeetingName"; // Change this to your meeting name

  return (
    <View style={styles.container}>
      <WebView source={{ uri: jitsiURL }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 }
});
