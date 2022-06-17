import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import { tweetSelector } from "../selectors/selectors";
import Timeago from "react-timeago";

type Props = {
  tweetId: number;
};

function TweetBox({ tweetId }: Props) {
  const [tweet, setTweet] = useRecoilState<Tweet>(tweetSelector(tweetId));

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        {/* Profile Image */}
        <div>
          <Image
            src={tweet.user_id?.avatar}
            className="rounded-full"
            alt=""
            layout="fixed"
            height={40}
            width={40}
            objectFit="cover"
          />
        </div>
        {/* end profile image */}

        {/* details */}
        <div className="w-full">
          {/* user */}
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.user_id.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.user_id.username.replace(/\s+/g, "").toLowerCase()}
            </p>

            <Timeago
              date={tweet.created_at}
              className="text-sm text-gray-500"
            />
          </div>

          <p className="p-1">{tweet.tweet}</p>

          {tweet.image_id?.url && (
            <div className="mt-2">
              <Image
                src={`https://udtndleajmnrvcztmlur.supabase.co/storage/v1/object/public/images/${tweet.image_id.url}`}
                className="m-5 ml-0 mb-1 max-w-full rounded-lg object-cover shadow-lg w-full"
                layout="responsive"
                width = {tweet.image_id.width}
                height = {tweet.image_id.height}
              />
            </div>
          )}
        </div>
        {/* end details */}
      </div>
    </div>
  );
}

export default TweetBox;
