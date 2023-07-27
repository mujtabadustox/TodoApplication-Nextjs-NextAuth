"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./page.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

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

  return (
    <form onSubmit={handleSignup}>
      <div className="flex flex-col items-center my-4">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsername}
          required
        />

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

        <button>SignUp</button>
        {error ? "eRROr" : "ASSA"}
        <Link href="/dashboard/login">Already have an Account?</Link>
      </div>
    </form>
  );
};

export default Signup;
