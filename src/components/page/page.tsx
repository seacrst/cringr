import { useDispatch, useSelector } from "react-redux";
import Post from "../post/post";
import styles from "./page.module.scss";
import { selectPosts, setCurrentId, shuffle } from "src/store/post_slice";
import Notification from "components/notification/notification"
import Title from "../title/title";
import { selectUser } from "src/store/user_slice";

const Page = () => {
  const posts = useSelector(selectPosts);
  const {user} = useSelector(selectUser);
  const dispatch = useDispatch();

  const click = () => {
    dispatch(setCurrentId(0));
    dispatch(shuffle(user.chaos));
  };

  return (
    <section className={styles.page}>
      <Notification/>

      <Title/>
      <div className={styles.posts}>
        {posts.shuffle.map(({id, content, character, hashTags, onLike, chaos, credits})=> (
          <Post chaos={chaos} credits={credits} id={id} key={id} content={content} hashTags={hashTags} character={character} onLike={onLike}/>
        ))}
      </div>

      <div className={styles.actions}>
        <button onClick={click} className={styles.load_button}>LOAD MORE</button>
      </div>
    </section>
  );
};

export default Page;