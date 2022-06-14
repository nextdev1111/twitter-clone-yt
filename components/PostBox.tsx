import Image from "next/image";
import React from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  MicrophoneIcon,
  PhotographIcon,
} from "@heroicons/react/outline";

function PostBox() {
  return (
    <div className="flex space-x-2 p-5">
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <Image
              src={"https://links.papareact.com/gll"}
              alt=""
              width={40}
              height={40}
              layout="fixed"
              objectFit="cover"
              className="h-10 w-10 rounded-full"
            />
            <input
              type="text"
              placeholder="What's happening"
              className="ml-2 h-20 w-full text-md outline-none placehover:text-md"
            />
            {/* File Picker */}
            <input type="file" accept="image/*" className="hidden" />
          </div>

          {/* Icons */}
          <div className="flex items-center flex-col md:flex-row">
            <div className="my-2 md:my-0 w-full justify-between md:justify-start flex space-x-2 flex-1 text-twitter">
              <div className="menuDiv">
                <PhotographIcon className="menuButton" />
              </div>
              <div className="menuDiv">
                <MicrophoneIcon className="menuButton" />
              </div>
              <div className="menuDiv">
                <EmojiHappyIcon className="menuButton" />
              </div>
              <div className="menuDiv">
                <CalendarIcon className="menuButton" />
              </div>
              <div className="menuDiv">
                <LocationMarkerIcon className="menuButton" />
              </div>
            </div>

            <button className="m-2 bg-twitter hover:bg-sky-600 transition-all duration-200 px-5 py-2 font-bold text-white rounded-full disabled:bg-gray-400 disabled:opacity-40 w-full md:w-auto shadow-md">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostBox;
