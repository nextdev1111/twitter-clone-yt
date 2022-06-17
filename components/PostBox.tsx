import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  MicrophoneIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import toast from "react-hot-toast";
import supabase from "../utils/supabase";
import { uploadImage } from "../functions/functions";
import { useRecoilState, useSetRecoilState } from "recoil";
import { postInfoAtom, tweetsAtom } from "../atoms/atoms";

function PostBox() {
  const setTweets = useSetRecoilState<Tweet[]>(tweetsAtom);

  // user
  const user = supabase.auth.user();

  // postInfo
  const [postInfo, setPostInfo] = useRecoilState<PostInfo>(postInfoAtom);

  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  // image picker
  const imageRef = useRef<any>();

  // uploadImage function
  const uploadImageFunction = async (e: any) => {
    setLoading(true);

    const imageToast = toast.loading("Uploading image...");

    const newImage: any = await uploadImage(e);

    if (newImage) {
      toast.success("uploaded", {
        id: imageToast,
      });

      setPostInfo({ ...postInfo, image: newImage?.id });

      setLoading(false);
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const notification = toast.loading("Posting...");

    const { data, error } = await supabase
      .from("tweets")
      .upsert({
        user_id: user?.id,
        tweet: postInfo.tweet,
        image_id: postInfo.image ? postInfo.image : null,
      })
      .single();

    if (data) {
      toast("Posted", {
        id: notification,
        icon: "🚀",
      });

      console.log(data);

      setPostInfo({ tweet: null, image: null });

      const { data: NewTweet } = await supabase
        .from("tweets")
        .select(
          "id, tweet, created_at, user_id(id, username, avatar), image_id(id, url, width, height)"
        )
        .eq("id", data.id)
        .single();

      setTweets((tweets) => [NewTweet, ...tweets]);
    } else if (error) {
      toast.error(error.message, {
        id: notification,
        icon: "🚀",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <div className="flex flex-1 items-center pl-2">
        <form
          className="flex flex-1 flex-col"
          onSubmit={(e) => {
            handlePost(e);
          }}
        >
          <div className="flex items-center justify-between">
            <Image
              src={
                user
                  ? user.user_metadata.avatar_url
                  : "https://links.papareact.com/gll"
              }
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
              value={postInfo.tweet as string}
              onChange={(e) => {
                setPostInfo({ ...postInfo, tweet: e.target.value });
              }}
              className="ml-2 h-20 w-full text-md outline-none placehover:text-md"
            />
            {/* File Picker */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={imageRef}
              onChange={(e) => {
                uploadImageFunction(e);
              }}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center flex-col md:flex-row">
            <div className="my-2 md:my-0 w-full justify-between md:justify-start flex space-x-2 flex-1 text-twitter">
              <div
                className={`menuDiv ${postInfo.image && "!bg-red-100"}`}
                onClick={() => {
                  if (!user) {
                    return toast.error("You need to be logged in");
                  }

                  // if the image is already setup it will remove the image
                  if (postInfo.image) {
                    setPostInfo({ ...postInfo, image: null });
                  } else {
                    imageRef.current.click();
                  }
                }}
              >
                <PhotographIcon
                  className={`menuButton ${postInfo.image && "!text-red-500"}`}
                />
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

            <button
              disabled={
                postInfo.tweet === (undefined || null) ||
                postInfo.tweet?.length < 2 ||
                !user ||
                loading === true
              }
              type="submit"
              className="m-2 bg-twitter hover:bg-sky-600 transition-all duration-200  px-5 py-2 font-bold text-white rounded-full disabled:opacity-40 w-full md:w-auto shadow-md disabled:bg-gray-400"
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostBox;
