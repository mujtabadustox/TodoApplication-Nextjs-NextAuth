"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="flex justify-between w-100 mx-6">
      <Link href="/">TodoS</Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {session && session.status === "authenticated" && (
          <button onClick={signOut}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
