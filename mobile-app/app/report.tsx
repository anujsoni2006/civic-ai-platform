import { useState } from "react"
import { View, Text, Button, Image, TextInput } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Location from "expo-location"
import API from "../src/api/api"
import { useContext } from "react"
import { AuthContext } from "../src/context/AuthContext"





export default function ReportScreen() {
  const { token } = useContext(AuthContext)
  const [image, setImage] = useState<any>(null)
  const [description, setDescription] = useState("")

  const openCamera = async () => {

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7
    })

    if (!result.canceled) {
      setImage(result.assets[0])
    }

  }

  const submitIssue = async () => {

   if (!image) {
      alert("Please capture an image first")
      return
    }

     // request permission
   const { status } = await Location.requestForegroundPermissionsAsync()

   if (status !== "granted") {
     alert("Location permission is required")
     return
   }

   // get GPS location

    const location = await Location.getCurrentPositionAsync({})

    const formData = new FormData()

    formData.append("title", "Mobile Report")

    formData.append("description", description)

    formData.append("lat", location.coords.latitude.toString())

    formData.append("lng", location.coords.longitude.toString())

    formData.append("image", {
      uri: image.uri,
      name: "photo.jpg",
      type: "image/jpeg"
    } as any)

    try {

      await API.post("/issues/report", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })

      alert("Issue reported successfully!")

    } catch (err:any) {
      console.log(err.response?.data)
    }

  }

  return (

    <View style={{ flex:1, padding:20 }}>

      <Text style={{ fontSize:24, marginBottom:20 }}>
        Report Issue
      </Text>

      <Button title="Open Camera" onPress={openCamera} />

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width:200, height:200, marginTop:20 }}
        />
      )}

      <TextInput
        placeholder="Describe the issue"
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth:1,
          padding:10,
          marginTop:20
        }}
      />

      <Button title="Submit Issue" onPress={submitIssue} />

    </View>

  )
}