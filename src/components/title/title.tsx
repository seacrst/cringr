import { useDispatch, useSelector } from "react-redux";
import styles from "./title.module.scss";
import { selectUser } from "src/store/user_slice";
import { useEffect } from "react";
import { setOpen, setNotfication } from "src/store/modal_slice";

const Title = () => {
  const {user} = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.likes === 0) {
      dispatch(setOpen(true))
      dispatch(setNotfication({
        title: "Failure",
        message: "Run out of likes"
      }));
    }
  }, [user])
  
  return (
    <header className={styles.title}>
        <div className={styles.left}>
          {user.followers} {user.followers === 1 ? "Follower" : "Followers"}
        </div>
        <h1>CRINGR</h1>
        <div className={styles.right}>
          <span>{user.likes} {user.likes === 1 ? "Like Left" : "Likes Left"}</span>
        </div>
    </header>
  );
};

export default Title;