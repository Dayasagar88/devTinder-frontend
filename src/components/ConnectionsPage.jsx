import { useState } from "react"
import CardStack from "../components/CardStack"
import Navigation from "../components/Navigation"
import ConnectionCard from "../components/ConnectionCard"

const Home = () => {
  const [showConnections, setShowConnections] = useState(false)

  const connections = [
    { id: 1, name: "Jane Doe", jobTitle: "UX Designer", imageUrl: "/placeholder.svg?height=50&width=50" },
    { id: 2, name: "John Smith", jobTitle: "Data Scientist", imageUrl: "/placeholder.svg?height=50&width=50" },
    { id: 3, name: "Emily Brown", jobTitle: "DevOps Engineer", imageUrl: "/placeholder.svg?height=50&width=50" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-800 to-blue-900 flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-md flex-grow flex items-center justify-center">
        {showConnections ? (
          <div className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Your Connections</h2>
            {connections.map((connection) => (
              <ConnectionCard key={connection.id} {...connection} />
            ))}
          </div>
        ) : (
          <CardStack />
        )}
      </div>
      <Navigation onConnectionsClick={() => setShowConnections(!showConnections)} />
    </main>
  )
}

export default Home
