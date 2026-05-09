import { useState } from "react";
import { FormInput } from "../../components/admin/FormInput";
import { supabase } from "../../lib/supabase";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Login berhasil. Buka /admin untuk masuk dashboard.");
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
        <button className="rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white">Login</button>
      </form>
    </main>
  );
}
