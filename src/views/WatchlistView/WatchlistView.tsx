import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const WatchListView = () => {
    const { data: session } = useSession();
    const router = useRouter();

  return (
    <div>
      <h1 className="font-serif w-4 h-4 ml-10">WatchList</h1>
      <p>
        {session && session.user
          ? "Signed in as " + session.user.email
          : "Not signed in"}
      </p>
      <button className="w-10 h-20 border-2" onClick={() => router.push("/sign-in")}>To account page</button>
    </div>
  );
};

export default WatchListView;
