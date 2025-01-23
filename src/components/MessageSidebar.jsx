import { X } from "lucide-react"

const messages = [
  { id: 1, name: "Alice Johnson", message: "Hey, I saw your React project. It looks great!", time: "2m ago" },
  { id: 2, name: "Bob Smith", message: "Are you interested in collaborating on a Node.js project?", time: "1h ago" },
  {
    id: 3,
    name: "Carol Williams",
    message: "Thanks for connecting! What are you working on these days?",
    time: "3h ago",
  },
]
// eslint-disable-next-line react/prop-types
export default function MessageSidebar({ isOpen, onClose }) {
  return (
    <div
  className={`fixed top-[64px] left-0 w-80 h-[calc(100vh-64px)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
    isOpen ? "-translate-x-0" : "-translate-x-full"
  }`}
>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="border-b pb-2">
              <div className="flex justify-between items-start">
                <span className="font-semibold">{message.name}</span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{message.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
