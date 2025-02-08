import styles from "./repost.module.scss"
import repostIcon from "assets/icons/repost.svg";
import repostedIcon from "assets/icons/reposted.svg";
import repost_disabled from "assets/icons/repost_disabled.svg";
import { FC,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotfication } from "src/store/notification_slice";
import { selectPost, setPostId, setRepostId } from "src/store/post_slice";
import { selectMenu } from "src/store/menu_slice";
import { setDecreasedLikes } from "src/store/user_slice";

interface Props {
  id: number
}

const Repost: FC<Props> = ({id}) => {
  const dispatch = useDispatch();
  const {post} = useSelector(selectPost);
  const {repostInfo} = useSelector(selectMenu);

  const handleRepost = () => {
    if (repostInfo) {
      dispatch(setRepostId([id]));
      dispatch(setDecreasedLikes(2));
    } else {
      dispatch(setPostId(id));
      dispatch(setNotfication({
        open: true,
        type: "info",
        title: "Reposted posts appear on the next load if you consider them beneficial",
        message: "However it'll cost you 2 Likes. Reposted posts may not be performing as epic"
      }));
    }
  };

  return (
    <button disabled={post.repostIds.includes(id) || post.liked !== id} onClick={handleRepost} className={styles.repost}>
      {post.liked !== id ? <img src={repost_disabled} alt="repost" /> : post.repostIds.includes(id) ? <img src={repostedIcon} alt="repost"/> : <img src={repostIcon} alt="repost" />  }
      REPOST
    </button>
  );
};

export default Repost;