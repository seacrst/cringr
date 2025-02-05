import { useDispatch, useSelector } from "react-redux";
import Post from "../post/post";
import styles from "./page.module.scss";
import { selectPosts, setCredLoseHint, setCurrentId, shuffle } from "src/store/post_slice";
import Notification from "components/notification/notification"
import Title from "../title/title";
import { selectUser, setCredits, setShuffled } from "src/store/user_slice";
import { rand } from "src/lib";
import { range } from "derive-rust";
import { useState } from "react";
import Settings from "../settings/setting";

const Page = () => {
  const posts = useSelector(selectPosts);
  const {user} = useSelector(selectUser);
  const dispatch = useDispatch();

  const click = () => {
    dispatch(setCurrentId(0));
    dispatch(setCredits(rand(-25, 1-5)))
    dispatch(shuffle(user.chaos));
    dispatch(setShuffled(true));
  };

  const hover = () => {
    dispatch(setCredLoseHint(true));
  };
  
  const leave = () => {
    dispatch(setCredLoseHint(false));
  }

  useState(() => range(0, 50_000_000).map(x => x + 1));

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
        <button onMouseEnter={hover} onMouseLeave={leave} onClick={click} className={styles.load_button}>LOAD MORE</button>
        <Settings/>
      </div>
    </section>
  );
};

export default Page;