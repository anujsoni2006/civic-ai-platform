import { useState, useCallback, useContext } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { useFocusEffect } from "expo-router"
import API from "../src/api/api"
import { AuthContext } from "../src/context/AuthContext"

export default function MyIssueScreen() {

  const { token } = useContext(AuthContext)

  const [issues, setIssues] = useState<any[]>([])

  const fetchIssues = async () => {

    try {

      const res = await API.get("/issues/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

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

  const renderItem = ({ item }:any) => (

    <View style={styles.card}>

      <Text style={styles.title}>{item.title}</Text>

      <Text>Status: {item.status}</Text>

      <Text>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>

    </View>

  )

  return (

    <View style={styles.container}>

      <FlatList
        data={issues}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex:1,
    padding:15
  },

  card: {
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:10,
    elevation:2
  },

  title: {
    fontSize:16,
    fontWeight:"bold",
    marginBottom:5
  }

})