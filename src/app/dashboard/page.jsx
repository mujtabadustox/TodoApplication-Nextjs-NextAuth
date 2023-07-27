"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import useSWR from "swr";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/todos?email=${session?.data?.user.email}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTodo = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email,
          title,
          complete: false,
        }),
      });
      mutate();
    } catch (err) {
      console.error(err);
    }

    setTitle("");
  };

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          <Image
            src="/assets/images/profile.jpg"
            width={150}
            height={150}
            alt="avatar"
            className="rounded-full border-2 border-white w-[150px] h-[150px]"
          />
        </div>
        <div>
          <form onSubmit={handleTodo}>
            <input
              type="text"
              placeholder="Add new task"
              value={title}
              onChange={handleTitle}
            />
            <button type="submit">Add</button>
          </form>
        </div>
        <div className="flex flex-col gap-1 min-w-[300px] border bordr-gray-800 rouded-md p-4">
          {isLoading
            ? "Loading..."
            : data?.map((todo) => (
                <div key={todo._id}>
                  <h2>{todo.title}</h2>
                </div>
              ))}
        </div>
      </div>
    );
  }
};

export default Dashboard;
