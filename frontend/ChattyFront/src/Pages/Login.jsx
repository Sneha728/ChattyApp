import { useState } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { Mail,Lock,Eye,EyeOff ,Loader2} from "lucide-react";
import { Link } from "react-router-dom";


const Login = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    email : "",
    password : ""
  });

  const { login , isLoggingIn } = userAuthStore();

 const handleSubmit = (e) =>{
  e.preventDefault();
  login(formData);
 }
 
  return (
    <div className=" flex   flex-col  items-center justify-center p-6 sm:p-12 mt-14 ">
      <div >
      <form onSubmit={handleSubmit} className="space-y-5 bg-gray-600 p-8">
        <h1 className="text-gray-300 font-semibold text-center">
          Login to Your Account
        </h1>
        <div className="form-control space-y-2">
         
          {/* Email */}
          
      
          <label className="label  ">
            <span className="label-text font-normal text-gray-300 ">Email</span>
          </label>

          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Mail className="text-gray-300 text-base-content/40" />
            </div>
            <input
            type="text"
            placeholder="you@example.com"
            className="input input-bordered text-white bg-slate-800 w-full pl-10 py-2"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          </div>


          {/* Password */}
          <label className="label">
            <span className="label-text font-normal text-gray-300">Password</span>
          </label>
          <div className="relative w-80">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Lock className="text-gray-300 text-base-content/40" />
        </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="........."
              className="input input-bordered text-gray-300 bg-slate-800 w-full pl-10 py-2"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full bg-blue-500 hover:bg-blue-700 text-gray-300 mt-6 p-2"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? <>
          <Loader2 className="size-6 animate-spin text-center" />Loading...
          </>
          : "Login"}
        </button>
      </form>

      </div>
      

      <div className="   items-center justify-center mt-4 ">
      <p className="text-base-content/60 ">Dont have an account?{" "}
      <Link to="/signup" className="link text-blue-700 underline">signUp</Link> 
      </p>


      </div>



    </div>
  );
};


export default Login;
