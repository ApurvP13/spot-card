import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      router.push(`/profile/${userId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-5xl ">Enter your username here</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-8"
      >
        <input
          type="text"
          placeholder="goat"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border-2 border-white rounded-3xl p-4"
        />
        <button type="submit">pls pls pls mujhe touch karo</button>
      </form>
    </div>
  );
}
