import Image from "next/image";
import logo from '../public/logo.png'; 

export default function PaytmSignup() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#012970] to-[#001f4d] text-white font-sans">
      
      {/* Left Section - Reused */}
      <div className="w-1/2 flex flex-col justify-center items-center p-12">
        <div>
          <Image
            src={logo}
            alt="paytm"
            width={99}
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold mt-6 text-center max-w-sm leading-snug">
          Send & Receive Payments <span className="text-[#00baf2]">Instantly</span> with Ease
        </h1>
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-1/2 bg-white text-[#012970] flex justify-center items-center p-12">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="username"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00baf2]"
                placeholder="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00baf2]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00baf2]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00baf2] text-white font-medium py-2 rounded hover:bg-[#00a6d6] hover:cursor-pointer"
            >
              Sign Up
            </button>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <a href="/" className="text-[#00baf2] font-medium hover:underline">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
