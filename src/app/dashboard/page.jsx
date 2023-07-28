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

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      throw new Error("Error");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
      });
      mutate();
    } catch (err) {
      throw new Error("Error");
    }
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
          <form onSubmit={handleTodo} className="flex gap-2 flex-col">
            <div className="flex relative items-center border border-slate-300 bg-white rounded">
              <input
                type="text"
                placeholder="Add New Task"
                value={title}
                onChange={handleTitle}
                className="flex-grow px-2 py-1 outline-none focus-within:border-slate-100"
              />
              <button type="submit">
                <div className="border border-slate-300 bg-amber-600 rounded w-6 h-6 text-slate-700 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#7c6f5a"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-between border-2 h-16 bg-amber-600 bg-opacity-90 text-white px-4">
          <button onClick={() => handleUpdate(todo._id)}>
            <div className="w-6 h-6 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#867963"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>
            </div>
          </button>
          <h1 className="text-left">Your Todos</h1>
          <div className="w-6 h-6 ml-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#7c6f5a"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-1 min-w-[300px] border bordr-gray-800 rouded-md p-4">
          {isLoading
            ? "Loading..."
            : data?.map((todo) => (
                <div key={todo._id}>
                  <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div
                        className="w-6 h-6 mr-2 cursor-pointer"
                        onClick={handleUpdate}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h1 className="text-lg font-bold text-gray-900">
                        {todo.title}
                      </h1>
                    </div>
                    <div
                      className="w-6 h-6 ml-2  cursor-pointer"
                      // onClick={handleRightButtonClick}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        fill="#A49377"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.54 8.31a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM6.46 8.31a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM17.54 20.61a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM6.46 20.61a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p>
                      Completed: {todo.complete === true ? "True" : "False"}
                    </p>
                    <p>Created At: {todo?.createdAt}</p>
                    <button
                      className="border border-slate-300 bg-amber-500 text-white active:bg-amber-600 rounded px-2 py-1 outline-none focus-within:border-slate-100"
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="border border-slate-300 bg-amber-500 text-white active:bg-amber-600 rounded px-2 py-1 outline-none focus-within:border-slate-100"
                      onClick={() => handleUpdate(todo._id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    );
  }
};

export default Dashboard;
