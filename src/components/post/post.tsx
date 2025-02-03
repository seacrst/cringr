import { FC } from "react";
import styles from "./post.module.scss";
import { Post as PostItem } from "src/parts";
import { useDispatch, useSelector } from "react-redux";
import { selectPost, setCurrentId } from "src/store/post_slice";
import Like from "../like/like";
import Comment from "../comment/comment";
import Repost from "../repost/repost";

const Post: FC<Partial<PostItem>> = ({id, post, character}) => {
  const dispatch = useDispatch();
  const {currentId} = useSelector(selectPost)

  const setCurrent = () => {
    dispatch(setCurrentId(id!))
  };

  return (
    <article className={styles.post} style={currentId === id ? {border: "4px solid #0040ff"} : {}} onClick={setCurrent}>
      <header>
        <span className={styles.username}>{character}</span>
      </header>
      <div className={styles.text}>
        <p>{post}</p>
      </div>

      <div className={styles.buttons}>
        <Repost/>
        <Comment/>
        <Like/>
      </div>

      <footer className={styles.tags}>
        #Lorem #ipsum #dolor.
      </footer>
    </article>
  );
};

export default Post;