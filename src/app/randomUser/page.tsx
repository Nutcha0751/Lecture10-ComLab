"use client";

import { useState } from "react";
import { cleanUser } from "@/libs/cleanUser";
import axios from "axios";
import UserCard from "@/components/UserCard";
import UserCardDetail from "@/components/UserCardDetail";
import { emit } from "process";

export default function RandomUserPage() {
  //user = null or object
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(`https://randomuser.me/api`);
    setIsLoading(false);
    const user = resp.data.results[0];

    const cleanedUser = cleanUser(user);
    setUser(cleanedUser);
  };

  //setUser({name: 'Jone', email: 'jones@gmail.com', imgUel: 'https://hello.com', address: '12345678'});
  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">User Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {
        isLoading && <p className="display-6 text-center fst-italic my-4">Loading...</p>
        // <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      }
      {/* display User information after finish loading */}
      {user && !isLoading && <UserCard {...user} />}
    </div>
  );
}
