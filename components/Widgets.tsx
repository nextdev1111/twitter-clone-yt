import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function Widgets() {
  return (
    <div className="ml-4 col-span-3 mt-5 px-2 hidden lg:inline">
      {/* SearchBox */}
      <div className="flex items-center space-x-2 bg-slate-100 p-3 rounded-full">
        <SearchIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent flex-1 outline-none"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="nextdev1111"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widgets;
