import { createContext, useState } from "react";
import { Post } from "../../api/postTypes";

export type PostContextTypes = {
  postData: Post[];
  setPostData: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const PostContext = createContext<PostContextTypes>({
  postData: [],
  setPostData: () => {},
});

const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [postData, setPostData] = useState<Post[]>([]);

  return (
    <PostContext.Provider value={{ postData, setPostData }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
