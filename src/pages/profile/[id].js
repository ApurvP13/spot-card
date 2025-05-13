import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

  if (!userData) return <div>...loading</div>;
  return (
    <div>
      <h2>{userData.display_name}</h2>
      <p>Followers: {userData.followers.total}</p>
      <img src={userData.images?.[0]?.url} alt="Profile" width={150} />
    </div>
  );
};

export default profile;
