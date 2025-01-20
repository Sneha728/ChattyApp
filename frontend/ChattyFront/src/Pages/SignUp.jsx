import { useState } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { User,Mail ,EyeOff,Eye,Lock, Loader2} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = userAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full Name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email");
    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password atleast 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if(success===true) signup(formData);
  };

  return (
    <div className=" h-full flex   flex-col  items-center justify-center p-6 sm:p-12 mt-14">
      <div >
      <form onSubmit={handleSubmit} className="space-y-5 bg-gray-600 p-8">
        <h1 className="text-gray-300 font-semibold text-center">
          Create Account
        </h1>
        <div className="form-control space-y-2">
          {/* Full Name */}
          <label className="label ">
            <span className="label-text font-normal text-gray-300" aria-required>Full Name</span>
          </label>
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <User className="text-white text-base-content/40" />
            </div>
            <input
              type="text"
              placeholder="Johndoe"
              className="input input-bordered text-white bg-slate-800 w-full pl-10 py-2"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

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
          disabled={isSigningUp}
        >
          {isSigningUp ? <>
          <Loader2 className="size-6 animate-spin" />Loading...
          </>
          : "Create Account"}
        </button>
      </form>

      </div>
      

      <div className="   items-center justify-center mt-3">
      <p className="text-base-content/60 ">Already have an account?{" "}
      <Link to="/login" className="link text-blue-700 underline">Login</Link> 
      </p>


      </div>



    </div>
  );
};

export default SignUp;
