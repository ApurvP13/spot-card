import { useState } from "react";
import { useRouter } from "next/router";
import AnimatedButton from "@/components/AnimatedButton";
import { motion } from "framer-motion";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [trackId, setTrackId] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const parts = trackId.split("/");
    const songId = parts[4]?.split("?")[0]; // clean track ID from the full URL

    if (userId.trim() && songId) {
      router.push({
        pathname: `/profile/${userId}`, // dynamic user ID segment
        query: { songId }, // query param for the track
      });
    }
  };

  return (
    <div className="flex bg-[url('/spot-bg.jpg')] bg-cover font-sans flex-col items-center justify-center h-screen gap-10">
      <motion.h1
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className=" p-2 text-4xl md:text-7xl font-display font-extrabold tracking-wider text-shadow-lg bg-gradient-to-l from-[#1db954] via-[#33c065] to-[#4ac776]  bg-clip-text text-transparent "
      >
        Get Your Spot Card
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <input
          type="text"
          placeholder="username"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className=" focus:outline-none tracking-widest placeholder:text-green-800 text-[#457e59] placeholder:tracking-widest placeholder:text-lg  rounded-2xl bg-[#4ac776] px-4 py-4 "
        />
        <input
          type="text"
          placeholder="song url"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          className=" focus:outline-none tracking-widest placeholder:text-green-800 text-[#457e59] placeholder:tracking-widest placeholder:text-lg  rounded-2xl bg-[#4ac776] px-4 py-4 "
        />
        <AnimatedButton />
      </motion.form>
    </div>
  );
}
