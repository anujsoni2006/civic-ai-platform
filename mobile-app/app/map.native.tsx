import {  useState } from "react"
import { View, Button } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { router } from "expo-router"
import API from "../src/api/api"
import { useFocusEffect } from "expo-router"
import { useCallback } from "react"

export default function MapScreen() {

  const [issues, setIssues] = useState<any[]>([])

  const fetchIssues = async () => {
    try {

      const res = await API.get("/issues/map")

      setIssues(res.data.issues)

    } catch (err:any) {

      console.log(err.response?.data || err.message)

    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchIssues()
    }, [])
  )

  return (

    <View style={{ flex: 1 }}>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 23.2599,
          longitude: 77.4126,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >

        {issues.map((issue:any) => (

          <Marker
            key={issue._id}
            coordinate={{
              latitude: issue.location.coordinates[1],
              longitude: issue.location.coordinates[0]
            }}
            title={issue.category}
            description={issue.status}
            tracksViewChanges={false}
          />

        ))}

      </MapView>

      <View
        style={{
          position:"absolute",
          bottom:40,
          alignSelf:"center"
        }}
      >

        <Button
          title="Report Issue"
          onPress={() => router.push("/report")}
        />
        <Button
          title="My Issues"
          onPress={() => router.push("/myissue")}
        />

      </View>

    </View>

  )
}