import { FC } from "react";
import styles from "./post.module.scss";
import { Post as PostItem } from "src/parts";
import { useDispatch, useSelector } from "react-redux";
import { selectPost, setCurrentId } from "src/store/post_slice";
import Like from "../like/like";
import Comment from "../comment/comment";
import Repost from "../repost/repost";
import { selectMessage } from "src/store/message_slice";
import Message from "../message/message";

const Post: FC<Partial<PostItem>> = ({id, content, hashTags, character, chaos, credits}) => {
  const dispatch = useDispatch();
  const {currentId} = useSelector(selectPost)
  const {id: mId} = useSelector(selectMessage);

  const setCurrent = () => {
    dispatch(setCurrentId(id!));
  };

  const unsetCurrent = () => {
    dispatch(setCurrentId(0));
  };

  return (
    <article onMouseEnter={setCurrent} onMouseLeave={unsetCurrent} className={styles.post} style={currentId === id ? {border: "4px solid #0040ff"} : {}} onClick={setCurrent}>
      {mId === id && <Message id={id || 0} />}
      <header>
        <span className={styles.username}>{character}</span>
      </header>
      
      <div className={styles.text}>
        <p>{content}</p>
      </div>

      <div className={styles.buttons}>
        <Repost/>
        <Comment/>
        <Like id={id || 0} chaos={chaos?.value!} credits={credits?.value!} />
      </div>

      <footer className={styles.tags}>
        <span>{hashTags}</span>
      </footer>
    </article>
  );
};

export default Post;