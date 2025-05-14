import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SpotifyCodeGenerator from "@/components/SpotifyCode";

//40k3p5jvst7klnuy44l6p48th

const profile = () => {
  const { id } = useRouter().query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/getSpotifyUser?id=${id}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(`failed to fetch the user data`, err);
      }
    }

    fetchData();
  }, [id]);

  // if (!userData) return <div>...loading</div>;
  return (
    <div className="flex flex-col gap-4 items-center font-sans justify-center h-screen">
      <SpotifyCodeGenerator />
      <div className="relative overflow-hidden shadow-lg w-1/2 h-1/2">
        <div className="absolute inset-0 bg-[#1db954]/40" />
        <img
          src="https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="paper"
          className="absolute inset-0 w-full h-full opacity-100 mix-blend-multiply pointer-events-none"
        />

        <div className="relative z-10 flex items-center justify-center p-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
            className=" absolute top-2 left-2 size-4 md:size-12 "
          />
          <div className="flex flex-col items-center justify-center gap-8">
            <img
              src="/spot-pic.jpg"
              className=" size-25 md:size-40 rounded-full border-4 border-[#1db954] shadow-lg"
              alt="Profile"
            />
            <h2 className="text-2xl md:text-6xl font-extrabold ">Apurv 🎧</h2>
            <p className="text-lg md:text-xl font-extralight italic tracking-widest">
              Followers: 31
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;

{
  /* <div>
  <h2>{userData.display_name}</h2>
  <p>Followers: {userData.followers.total}</p>
  <img src={userData.images?.[0]?.url} alt="Profile" width={150} />
</div>; */
}
