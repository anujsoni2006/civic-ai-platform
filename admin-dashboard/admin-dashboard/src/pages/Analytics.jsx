import { useEffect, useState } from "react"
import API from "../api/api"

export default function Analytics() {

  const [stats, setStats] = useState({})

  const fetchStats = async () => {

    try {

      const res = await API.get("/issues/stats")

      setStats(res.data.stats)
      
    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {
    fetchStats()
  }, [])
 

  return (

    <div style={{ padding:20 }}>

      <h2>Issue Analytics</h2>

      <div style={{ display:"flex", gap:20 }}>

        <div style={card}>
          <h3>Total</h3>
          <h3>{stats.total}</h3>
        </div>

        <div style={card}>
          <h3>Reported</h3>
          <p>{stats.reported}</p>
        </div>

        <div style={card}>
          <h3>In Progress</h3>
          <p>{stats.inProgress}</p>
        </div>

        <div style={card}>
          <h3>Resolved</h3>
          <p>{stats.resolved}</p>
        </div>

      </div>

    </div>

  )

}

const card = {
  border:"1px solid #ddd",
  padding:20,
  width:150,
  textAlign:"center"
}