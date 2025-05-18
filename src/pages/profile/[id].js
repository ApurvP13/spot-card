import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const { id, songId } = useRouter().query;
  const [userData, setUserData] = useState(null);
  const [scanUrl, setScanUrl] = useState("");

  const getSpotifyCodeURL = (trackId) => {
    const bg = "1db954";
    const bar = "black";
    const size = 440;
    const spotifyUri = `spotify:track:${trackId}`;
    return `https://scannables.scdn.co/uri/plain/jpeg/${bg}/${bar}/${size}/${spotifyUri}`;
  };

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      try {
        const res = await fetch(`/api/getSpotifyUser?id=${id}`);
        const data = await res.json();
        setUserData(data);
        if (songId) setScanUrl(getSpotifyCodeURL(songId));
      } catch (err) {
        console.error(`failed to fetch the user data`, err);
      }
    }
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [id, songId]);

  const SkeletonCard = () => (
    <div className="relative overflow-hidden shadow-lg max-w-md w-full bg-[#1db954]/20 rounded-lg animate-pulse">
      <div className="absolute inset-0 bg-[#1db954]/30 rounded-lg" />
      <div className="relative z-10 flex flex-col items-center justify-center p-8 space-y-6">
        <div className="absolute top-4 left-4 w-10 h-10 md:w-16 md:h-16 bg-gray-300 rounded-full" />
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300" />
        <div className="h-6 w-40 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="h-6 w-60 bg-gray-300 rounded" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen p-4 font-sans bg-gray-900 text-white">
      {userData ? (
        <div className="relative overflow-hidden shadow-lg max-w-md w-full bg-[#1db954]/20 rounded-lg">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-[#1db954]/40 rounded-lg" />
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="paper"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply pointer-events-none rounded-lg"
          />

          <div className="relative z-10 flex flex-col items-center justify-center p-8 space-y-6 text-white">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
              alt="Spotify logo"
              className="absolute top-4 left-4 w-10 h-10 md:w-16 md:h-16"
            />
            <img
              src={userData.images?.[0]?.url || "/spot-pic.jpg"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#1db954] shadow-lg object-cover"
            />
            <h2 className="text-3xl md:text-5xl font-extrabold">
              {userData.display_name || "Unknown User"}
            </h2>
            <p className="text-lg md:text-xl font-light italic tracking-wide">
              Followers: {userData.followers?.total ?? 0}
            </p>
            {scanUrl && (
              <img
                src={scanUrl}
                alt="Spotify code"
                className="h-16 md:h-24 w-auto"
              />
            )}
          </div>
        </div>
      ) : (
        <SkeletonCard />
      )}
    </div>
  );
};

export default Profile;
