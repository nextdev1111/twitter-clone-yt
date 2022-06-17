import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { tweetsAtom } from "../atoms/atoms";
import supabase from "../utils/supabase";
import PostBox from "./PostBox";
import TweetBox from "./TweetBox";

function Feed() {
  // serverside render -- first to load ( when website IS loading)
  // client side rendering -- loads when website has been loaded

  const [tweets, setTweets] = useRecoilState<Tweet[]>(tweetsAtom);

  useEffect(() => {
    // FETCH POSTS
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const notification = toast.loading("Fetching Posts");

    const { data, error } = await supabase
      .from("tweets")
      .select(
        "id, tweet, created_at, user_id(id, username, avatar), image_id(id, url, width, height)"
      )
      .order("id", { ascending: false });

    if (data) {
      toast.success("Success", {
        id: notification,
      });

      setTweets(data);
    } else if (error) {
      toast.error(error.message, {
        id: notification,
      });
    }
  };

  console.log(tweets);

  return (
    <div className="col-span-7 lg:col-span-4">
      {/* PostBox */}
      <PostBox />

      {/* Tweets */}
      <div className="max-h-[85vh] overflow-scroll scrollbar-hide">
        {tweets?.map((tweet) => (
          <TweetBox key={tweet.id} tweetId={tweet.id} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
