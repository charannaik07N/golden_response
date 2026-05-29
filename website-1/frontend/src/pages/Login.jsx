import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="text-slate-500 mt-2">Use Google to continue.</p>
      <button
        className="mt-6 px-4 py-2 bg-brand-500 text-white rounded"
        onClick={loginWithGoogle}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
