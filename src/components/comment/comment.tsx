import styles from "./comment.module.scss"
import commentIcon from "assets/icons/comment.svg";
import commentIconChecked from "assets/icons/commented.svg";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { comments } from "src/parts";
import { setNotfication } from "src/store/notification_slice";
import { selectPost, setPostId } from "src/store/post_slice";
import { selectUser } from "src/store/user_slice";
import commmentDisabled from "assets/icons/comment_disabled.svg";

interface CommentProps {
  id: number
}

const Comment: FC<CommentProps> = ({id}) => {
  const { post } = useSelector(selectPost);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleComment = () => {
    const comment = comments[Math.floor(Math.random() * comments.length)];

    dispatch(setPostId(id));
    dispatch(setNotfication({
      open: true,
      title: "Disinfo Bot",
      message: comment,
      type: "comment"
    }));
  };

  return (
    <button disabled={post.commentsIds.includes(id) || user.credits > 20} onClick={handleComment} className={styles.comment}>
      {post.commentsIds.includes(id) ? <img src={commentIconChecked} alt="comment" /> : user.credits > 20 ? <img src={commmentDisabled} alt="comment" /> :  <img src={commentIcon} alt="comment" />}
      COMMENT
    </button>
  );
};

export default Comment;