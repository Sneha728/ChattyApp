import { Link } from "react-router-dom";
import { userAuthStore } from "../store/userAuthStore";
import { LogOut, MessageSquare, Settings } from "lucide-react";

const Navbar = () => {
  const { logout , authUser} = userAuthStore();
   
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center hover:opacity-80 transition-all" >
            <div className="w-9 h-9 rounded-lg bg-primary/10  flex items-center justify-center">
            <MessageSquare className="w-6 h-6  rounded-md p-1 " />

            </div>
            <h1 className="text-lg font-bold ">Chatty</h1>
            </Link>
          </div>


          <div className="flex items-center gap-6">
             <Link to={"/settings"} className="btn btn-2 transition-colors gap-2 flex items-center justify-center">
             <Settings className="w-4 h-4   " />
             <span className="hidden sm:inline ">Settings</span>
             </Link>


             {authUser && (
              <>
              <button className="flex gap-2 items-center" onClick={logout}>
                <LogOut className="size-4 " />
                <span className="hidden sm:inline ">LogOut</span>


              </button>
              </>
             )}

          </div>
           
        </div>

      </div>

    </header>
  )
}

export default Navbar;
