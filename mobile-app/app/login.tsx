import { useState, useContext } from "react"
import { View, Text, TextInput, Button } from "react-native"
import API from "../src/api/api"
import { AuthContext } from "../src/context/AuthContext"
import { router } from "expo-router"

export default function LoginScreen() {

  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      })

      login(res.data.token)

      router.replace("/map")

    } catch (err:any) {
      console.log(err.response?.data || err.message)
    }

  }

  return (
    <View style={{ flex:1, justifyContent:"center", padding:20 }}>

      <Text style={{ fontSize:24, marginBottom:20 }}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={{ borderWidth:1, padding:10, marginBottom:10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth:1, padding:10, marginBottom:20 }}
      />

      <Button title="Login" onPress={handleLogin} />

    </View>
  )
}