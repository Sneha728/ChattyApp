import { chatStore } from "../store/chatStore"
import { userAuthStore} from "../store/userAuthStore";
import {X} from "lucide-react";

const ChatHeader = () => {
  const { selectedUser,setSelectedUser } = chatStore();
  const { onlineUsers } = userAuthStore();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="fles items-center gap-3">
          <div className="doraemon">
            <div className="size-10 rounded-full relative">
              <img src="https://photoshulk.com/wp-content/uploads/d-dora-the-explorer-1.jpg" alt={selectedUser.fullName} className="rounded-full" />
            </div>

          </div>
          <div>
            <h3 className="font-bold">{selectedUser.fullName}</h3>
            <p  className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id)? "Online" : "Offline"}

            </p>
          </div>

        </div>
        <button onClick={()=>setSelectedUser(null)}>
          <X />

        </button>

      </div>
      
    </div>
  )
}

export default ChatHeader
