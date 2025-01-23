import { UserMinusIcon, UserPlusIcon, X } from "lucide-react"


const connectionRequests = [
  { id: 1, name: "Emma Watson", title: "AI Researcher", image: "/placeholder.svg?height=100&width=100&text=EW" },
  { id: 2, name: "Liam Neeson", title: "DevOps Engineer", image: "/placeholder.svg?height=100&width=100&text=LN" },
  { id: 3, name: "Sophia Chen", title: "Mobile Developer", image: "/placeholder.svg?height=100&width=100&text=SC" },
]

// eslint-disable-next-line react/prop-types
export default function ConnectionRequestsPage({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 z-50" : "opacity-0 -z-10"}`}
    >
      <div className="container mx-auto max-w-md mt-20 p-6 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Connection Requests</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          {connectionRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <img src={request.image || "/placeholder.svg"} alt={request.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold">{request.name}</h3>
                  <p className="text-sm text-gray-600">{request.title}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300">
                  <UserPlusIcon className="h-5 w-5" />
                </button>
                <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300">
                  <UserMinusIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

