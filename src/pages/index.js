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
    <div className="flex font-sans flex-col items-center justify-center h-screen gap-4">
      <h1 className=" p-2 text-4xl md:text-7xl font-display font-extrabold tracking-wider bg-gradient-to-l from-[#1db954] via-[#33c065] to-[#4ac776]  bg-clip-text text-transparent ">
        Get Your Spot Card
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center "
      >
        <input
          type="text"
          placeholder="goat"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="  rounded-l-2xl bg-[#4ac776] px-4 py-4 "
        />
        <button
          className="bg-[#4ac776] px-4 py-4 rounded-r-2xl border-l-2 border-zinc-900 tracking-wider font-semibold uppercase font-sans "
          type="submit"
        >
          SpotCard!
        </button>
      </form>
    </div>
  );
}
