export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012970] to-[#001f4d]">
      <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#012970] mb-4">PAYTM</h1>
        <p className="text-lg text-[#012970] mb-8 text-center">
          Your one-stop solution for sending and receiving payments instantly and securely.
        </p>
        <div className="flex gap-4">
          <a
            href="/signin"
            className="bg-white text-[#00baf2] px-6 py-2 border border-[#00baf2] rounded font-medium hover:bg-[#e6f7fb] transition"
          >
            Login
          </a>
          {/* <a
            href="/signup"
            className="bg-white border border-[#00baf2] text-[#00baf2] px-6 py-2 rounded font-medium hover:bg-[#e6f7fb] transition"
          >
            Sign Up
          </a> */}
        </div>
        <p className="text-sm text-[#012970] mt-6">
          New user? <a href="/signup" className="text-[#00baf2] font-medium hover:underline">Create an account</a>
        </p>
      </div>
    </div>
  );
}
