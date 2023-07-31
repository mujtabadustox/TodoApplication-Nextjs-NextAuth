"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="flex justify-between w-100 mx-8">
      <Link href="/" className="font-extrabold tracking-tight text-gray-900">
        TodoS
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {session && session.status === "authenticated" && (
          <button
            onClick={signOut}
            className="border border-slate-300 w-[100px] bg-[#5A5A5A] text-white active:bg-[#5a5959] rounded outline-none focus-within:border-slate-100"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
