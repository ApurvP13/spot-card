import React from "react";
import { useRouter } from "next/router";

const profile = () => {
  const { id } = useRouter().query;
  return <div>profile of {id}</div>;
};

export default profile;
