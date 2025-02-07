import styles from "./repost.module.scss"
import repostIcon from "assets/icons/repost.svg";
import repostedIcon from "assets/icons/reposted.svg";
import repost_disabled from "assets/icons/repost_disabled.svg";
import { FC,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotfication } from "src/store/notification_slice";
import { selectPost, setPostId } from "src/store/post_slice";

interface Props {
  id: number
}

const Repost: FC<Props> = ({id}) => {
  const dispatch = useDispatch();
  const {post} = useSelector(selectPost);

  const handleRepost = () => {
    dispatch(setPostId(id));
    dispatch(setNotfication({
      open: true,
      type: "info",
      title: "",
      message: "Reposted posts appear on the next load if you consider them beneficial. However it's cost you 2 Likes"
    }));
  };

  return (
    <button disabled={post.repostIds.includes(id) || post.liked !== id} onClick={handleRepost} className={styles.repost}>
      {post.liked !== id ? <img src={repost_disabled} alt="repost" /> : post.repostIds.includes(id) ? <img src={repostedIcon} alt="repost"/> : <img src={repostIcon} alt="repost" />  }
      REPOST
    </button>
  );
};

export default Repost;