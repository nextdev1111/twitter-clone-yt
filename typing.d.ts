type Tweet = {
  id: number;
  tweet: string;
  user_id: User;
  image_id?: Image | null;
  created_at: Date;
};

type Image = {
  id: number;
  url: string;
  height: number;
  width: number;
};

type User = {
  id: string;
  username: string;
  avatar: string;
};

type PostInfo = {
  tweet: string | null;
  image: string | null
}