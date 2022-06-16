import React, { SVGProps } from "react";
import {
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  LightningBoltIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import supabase from "../utils/supabase";
import toast from "react-hot-toast";

function Sidebar() {
  const user = supabase.auth.user();

  // handleLogout using supabase
  async function handleLogout() {
    await supabase.auth.signOut();

    toast("Logged out successfully", {
      icon: "🥲",
    });
  }

  // handle login using supabase with github
  async function handleLogin() {
    const notification = toast.loading("Signing in...");

    const { user, error } = await supabase.auth.signIn({
      provider: "github",
    });

    if (user) {
      toast("Signed In", {
        id: notification,
        icon: "🥳",
      });
    } else if (error) {
      toast.error(error.message, {
        id: notification,
      });
    }
  }

  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <div className="m-5 p-4 rounded-full cursor-pointer hover:bg-sky-100 duration-100 grid items-center">
        {/*  Logo */}
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
          width={30}
          height={25}
          layout="fixed"
          quality={100}
          priority={true}
        />
      </div>

      {/* Sidebar Rows */}
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow
        Icon={UserIcon}
        title={user ? "Sign Out" : "Sign In"}
        onClick={user ? handleLogout : handleLogin}
      />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />

      {/* Tweet Button */}
      <div className="mt-4 hover:bg-sky-600 transition-all duration-200 bg-twitter rounded-full py-3 px-5 md:py-3 text-white flex items-center justify-center font-bold w-full shadow-md cursor-pointer">
        <span className="hidden md:inline-flex">Tweet</span>
        <span className="md:hidden">
          <LightningBoltIcon className="w-7 h-7" />
        </span>
      </div>
    </div>
  );
}

export default Sidebar;

type Props = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => void;
};

export const SidebarRow = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer max-w-fit items-center space-x-2 px-5 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 group m-1"
    >
      <Icon className="w-7 h-7 text-gray-600" />
      <span className="ml-2 text-[20px] hidden md:inline-flex">{title}</span>
    </div>
  );
};
