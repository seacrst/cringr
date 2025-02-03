import styles from "./comment.module.scss"
import repost from "assets/icons/heart.svg";
import commentIcon from "assets/icons/comment.svg";
import commentIconChecked from "assets/icons/commented.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increaseChaos } from "src/store/user_slice";

const Comment = () => {
  const [comment, setComment] = useState(false);
  const dispatch = useDispatch();

  const handleComment = () => {
    setComment(true);
    dispatch(increaseChaos(30))
  }

  return (
    <button onClick={handleComment} className={styles.like}>
    {comment ? <img src={commentIconChecked} alt="comment" /> : <img src={commentIcon} alt="comment" />}
    COMMENT
    </button>
  );
};

export default Comment;