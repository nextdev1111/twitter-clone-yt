import type { NextPage } from "next";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import supabase from "../utils/supabase";

const Home: NextPage = () => {
  const user = supabase.auth.user();

  return (
    <div className="max-w-[1400px] m-auto">
      <main className="grid grid-cols-9">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed />

        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
};

export default Home;
