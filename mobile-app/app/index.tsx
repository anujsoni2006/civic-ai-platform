import { View, Text, Button } from "react-native"
import { router } from "expo-router"

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontSize: 24 }}>
        Civic AI Platform 🚀
      </Text>

      <Button
        title="Login"
        onPress={() => router.push("/login")}
      />
    </View>
  )
}