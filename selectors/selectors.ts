import { selectorFamily } from "recoil";
import { tweetsAtom } from "../atoms/atoms";

// WE WILL PASS AN id, then it will give us tweet details
export const tweetSelector = selectorFamily<any, number>({
  key: "tweetSelector",
  get:
    (id: number) =>
    ({ get }) => {
      const tweet = get(tweetsAtom).find((tweet) => tweet.id === id);

      if (tweet) {
        return tweet;
      }
    },
  set:
    (id: number) =>
    ({ get, set }, newValue) => {
      const tweets = get(tweetsAtom);

      const index = tweets.findIndex((tweet) => tweet.id === id);

      const updatedTweets = [...tweets]; // shallow clone

      updatedTweets[index] = newValue;

      set(tweetsAtom, updatedTweets);
    },
});
