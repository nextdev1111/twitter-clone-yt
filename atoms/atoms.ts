import { atom } from "recoil";

//  this is for the feed purpose
export const tweetsAtom = atom<Tweet[]>({
  key: "tweets",
  default: [],
});

// this is for the postBox purpose
export const postInfoAtom = atom<PostInfo>({
  key: "postInfo",
  default: { tweet: null, image: null },
});
