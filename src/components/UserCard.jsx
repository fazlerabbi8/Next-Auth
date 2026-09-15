"use client";

import { signOut, useSession } from "next-auth/react";

const UserCard = () => {
  const { data: session, status } = useSession();

  console.log(session)

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in.</p>;
  }

  return (
    <div>
      <p className="border p-5">Signed in as {session.user.name} and {status}</p>
      <p className="border p-5">{JSON.stringify(session)}</p>

      <button className="btn" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default UserCard;