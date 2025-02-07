import { useDispatch, useSelector } from "react-redux";
import Post from "../post/post";
import styles from "./page.module.scss";
import { resetCommented, resetRepostedId, selectPost, selectPosts, setCredLoseHint, setCurrentId, shuffle } from "src/store/post_slice";
import Notification from "components/notification/notification"
import Title from "../title/title";
import { selectUser, setCredits, setShuffled } from "src/store/user_slice";
import { rand } from "src/lib";
import Settings from "../settings/setting";
import Info from "../info/info";
import { selectMenu, setInfo } from "src/store/menu_slice";
import { ElementRef, useEffect, useRef } from "react";
import { selectModal } from "src/store/notification_slice";

const Page = () => {
  const posts = useSelector(selectPosts);
  const {user} = useSelector(selectUser);
  const dispatch = useDispatch();
  const {open} = useSelector(selectModal);
  const {info} = useSelector(selectMenu);
  const {post} = useSelector(selectPost);

  const scrollRef = useRef<ElementRef<"div">>(null);

  const handleShuffle = () => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
    
    dispatch(setCurrentId(0));
    dispatch(setCredits(rand(-25, -15)));
    dispatch(shuffle([user.chaos, post.repostIds]));
    dispatch(resetRepostedId());
    dispatch(resetCommented());
    dispatch(setShuffled(true));
  };

  const hover = () => {
    if (!open) {
      dispatch(setCredLoseHint(true));
    }
  };
  
  const leave = () => {
    if (!open) {
      dispatch(setCredLoseHint(false));
    }
  };

  useEffect(() => {
    dispatch(setInfo(true));
  }, []);


  return (
    <section className={styles.page}>
      <Notification/>
      {info && <Info/>}

      <Title/>
      <div  className={styles.posts}>
        <div ref={scrollRef} className={styles.scroll_target}></div>
        {posts.shuffle.map(({id, content, character, hashTags, onLike, chaos, credits, reposted})=> (
          <Post reposted={reposted} chaos={chaos} credits={credits} id={id} key={id} content={content} hashTags={hashTags} character={character} onLike={onLike}/>
        ))}
        {posts.reposted.map(({id, content, character, hashTags, onLike, chaos, credits, reposted})=> (
          <Post reposted={reposted} chaos={chaos} credits={credits} id={id} key={id} content={content} hashTags={hashTags} character={character} onLike={onLike}/>
        ))}
      </div>

      <div className={styles.actions}>
        <button onMouseEnter={hover} onMouseLeave={leave} onClick={handleShuffle} className={styles.load_button}>LOAD NEXT</button>
        <Settings/>
      </div>
    </section>
  );
};

export default Page;