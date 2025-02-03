import { useDispatch, useSelector } from "react-redux";
import Post from "../post/post";
import styles from "./page.module.scss";
import { selectGenPostSlice, selectPost, shuffle } from "src/store/post_slice";
import {  genSlice } from "src/lib2";
import { genPostIds } from "src/lib";
import { setOpen } from "src/store/modal_slice";
import Notification from "components/notification/notification"
import Title from "../title/title";

const Page = () => {
  const posts = useSelector(selectGenPostSlice);
  genPostIds();

  const dispatch = useDispatch();

  const click = () => {
    dispatch(shuffle());
  };

  return (
    <section className={styles.page}>
      <Notification/>
      <Title/>
      <div className={styles.posts}>
        {posts.map(({id, post, character})=> (
          <Post id={id} key={id} post={post} character={character}/>
        ))}
      </div>

      <div className={styles.actions}>
        <button onClick={click} className={styles.load_button}>LOAD MORE</button>
      </div>
    </section>
  );
};

export default Page;