"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  return (
    <div>
      <Link href="/">TodoS</Link>
      <div>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      {session && session.status === "authenticated" && (
        <button onClick={signOut}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
