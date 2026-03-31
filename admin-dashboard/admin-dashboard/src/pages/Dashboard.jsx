import { useEffect, useState } from "react"
import API from "../api/api"

export default function Dashboard() {

  const [issues, setIssues] = useState([])

  const fetchIssues = async () => {

    try {

      const res = await API.get("/issues")

      setIssues(res.data.issues)

    } catch (err) {

      console.log(err)

    }

  }

  const updateStatus = async (id, status) => {

    try {

      await API.patch(`/issues/${id}/status`, {
        status
      })

      fetchIssues()

    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {
    fetchIssues()
  }, [])

  return (

    <div style={{ padding:20 }}>

      <h2>All Reported Issues</h2>

      {issues.map(issue => (

        <div
          key={issue._id}
          style={{
            border:"1px solid #ddd",
            padding:15,
            marginBottom:10
          }}
        >

          <h4>{issue.title}</h4>

          <p>{issue.description}</p>

          <p>Status: {issue.status}</p>

          <select
            value={issue.status}
            onChange={(e)=>updateStatus(issue._id, e.target.value)}
          >

            <option value="reported">Reported</option>

            <option value="in-progress">In Progress</option>

            <option value="resolved">Resolved</option>

          </select>

        </div>

      ))}

    </div>

  )
}