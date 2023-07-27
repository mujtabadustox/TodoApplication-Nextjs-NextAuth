"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const session = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();

    signIn("credentials", { email, password });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col items-center my-4">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={handleEmail}
          required
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePassword}
          required
        />

        <button>Login</button>

        {error && "Error"}
        <Link href="/dashboard/signup">Dont have an account?</Link>
      </div>
    </form>
  );
};

export default Login;
