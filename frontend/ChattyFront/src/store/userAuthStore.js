import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = "http://localhost:9000";

export const userAuthStore = create((set,get)=> ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    onlineUsers :[],
    isCheckingAuth : true,
    socket:null,

    checkAuth : async() =>{
        try{
             const res = await axiosInstance.get("/auth/check");
             set({ authUser:res.data });

             get().connectSocket()

        }catch(error){
            console.log("Error in checkAuth",error);
            set({ authUser:null });

        }finally{
            set({ isCheckingAuth:false });
        }
    },

    // once signup success toast should be displayed 

    signup : async(data) =>{
        set({ isSigningUp : true })
        try{
           const res =  await axiosInstance.post("/auth/signup",data);
           set({ authUser : res.data });
           toast.success("Account created Successfully");

           get().connectSocket()
        }catch(error){
            toast.error(error.response.data.message);

        }finally{
            set({ isSigningUp : false });
        }
        
    },

    login : async(data) =>{
        set({ isLoggingIn : true });
        try{
            const res = await axiosInstance.post("/auth/login",data);
            set({ authUser: res.data});
            toast.success("Logged in successfully");

            get().connectSocket()

        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set( { isLoggingIn:false });
        }

    },
    
    logout : async() =>{
        try{
            await axiosInstance.post("auth/logout");
            set({ authUser : null });
            toast.success("Logged Out Successfully");

            get().disconnectSocket()

        }catch(error){
            toast.error(error.response.data.message);
        }
    },
    connectSocket : () =>{
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;   //if user is not authenticated and if alraedy socket connected then just return nothing.
        const socket = io(BASE_URL,{
            query:{
                userId:authUser._id
            },
        });
        socket.connect();

        set({ socket:socket });
        socket.on("getOnlineUsers",(userIds)=>{
            set({ onlineUsers : userIds})
        })
    },

    disconnectSocket : ()=>{
        if(get().socket?.connected) get().socket.disconnect();
    },

    

}) );

