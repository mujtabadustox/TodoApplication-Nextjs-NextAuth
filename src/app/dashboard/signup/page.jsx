"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const session = useSession();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setErrorMessage({
          msg: `Duplicate Username or Email`,
          type: "error",
        });
      }

      res.status === 200
        ? router.push("/dashboard/login?success=User Created")
        : setError(true);
    } catch (err) {
      setError(true);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  return (
    <form onSubmit={handleSignup} className="flex gap-2 flex-col">
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Error! </strong>
          <span class="block sm:inline">{errorMessage.msg}</span>
        </div>
      )}
      <div className="flex flex-col items-center my-4 gap-2">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-4xl text-[#7c6f5a]">Signup</h1>
        </header>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
          required
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          required
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />

        <button className="border border-slate-300 min-w-[100px] bg-[#7c6f5a]/80 text-white active:bg-[#7c6f5a] rounded-lg px-2 py-1 outline-none focus-within:border-slate-100">
          Signup
        </button>
        {error && "Error"}
        <Link href="/dashboard/login" className="underline">
          Already have an Account?
        </Link>
      </div>
    </form>
  );
};

export default Signup;
