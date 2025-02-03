import styles from "./repost.module.scss"
import repostIcon from "assets/icons/repost.svg";
import repostedIcon from "assets/icons/reposted.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increaseChaos } from "src/store/user_slice";

const Repost = () => {
  const [comment, setComment] = useState(false);
  const dispatch = useDispatch();

  const handleComment = () => {
    setComment(true);
    dispatch(increaseChaos(30))
  }

  return (
    <button onClick={handleComment} className={styles.like}>
    {comment ? <img src={repostedIcon} alt="repost" /> : <img src={repostIcon} alt="repost" />}
    REPOST
    </button>
  );
};

export default Repost;