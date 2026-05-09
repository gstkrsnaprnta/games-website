import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../components/admin/FormInput";
import { signInAdmin } from "../../services/auth";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const { error } = await signInAdmin(email, password);
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4">
      <form onSubmit={handleSubmit} className="grid w-full max-w-md gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Login Admin</h1>
          <p className="mt-2 text-sm text-slate-600">Gunakan akun Supabase Auth panitia.</p>
        </div>
        <FormInput label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <FormInput label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        <button disabled={loading} className="rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white disabled:bg-slate-400">
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </main>
  );
}
