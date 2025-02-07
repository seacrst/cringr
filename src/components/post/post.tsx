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
import repostIcon from "assets/icons/reposted.svg";

import Captian_Obvious from "assets/images/Captian_Obvious.jpg";
import Cancel_Witch from "assets/images/Cancel_Witch.jpg";
import Doomsday_Dennis from "assets/images/Doomsday_Dennis.jpg";
import Hype_Henry from "assets/images/Hype_Henry.jpg";
import Flat_Earther2 from "assets/images/Flat_Earther2.jpg";
import { names } from "src/lib";
import { selectModal } from "src/store/notification_slice";

const Post: FC<Partial<PostItem>> = ({id, content, hashTags, character, chaos, credits, reposted}) => {
  const dispatch = useDispatch();
  const {post: {currentId}} = useSelector(selectPost);
  const {id: mId} = useSelector(selectMessage);
  const {open} = useSelector(selectModal);

  const setCurrent = () => {
    if (!open) {
      dispatch(setCurrentId(id!));
    }
  };

  const unsetCurrent = () => {
    if (!open) {
      dispatch(setCurrentId(0));
    }
  };

  const pic = (() => {
    switch (character) {
      case names[0]: return Flat_Earther2;
      case names[1]: return Hype_Henry;
      case names[2]: return Doomsday_Dennis;
      case names[3]: return Cancel_Witch;
      case names[4]: return Captian_Obvious;
      default: return "";
    }
  })();

  return (
    <article onMouseEnter={setCurrent} onMouseLeave={unsetCurrent} className={styles.post} style={currentId === id ? {border: "4px solid #0040ff"} : {}} onClick={setCurrent}>
      {mId === id && <Message id={id || 0} />}
      <header className={styles.character}>
        <img className={styles.pic} src={pic} alt="character" />
        <span className={styles.username}>{character}</span>
      </header>
      
      <div className={styles.text}>
        <p>{content}</p>
        <footer className={styles.tags}>
          <span>{hashTags}</span>
        </footer>
      </div>

      <div className={styles.buttons}>
        {reposted ? <span className={styles.reposted}>
          <img src={repostIcon} alt="repostIcon" />
          Disinfo Bot Reposted
        </span> : <Repost id={id!} />}
        <Comment id={id!} />
        <Like id={id || 0} chaos={chaos?.value!} credits={credits?.value!} />
      </div>
    </article>
  );
};

export default Post;