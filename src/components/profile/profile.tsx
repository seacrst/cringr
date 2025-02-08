export default Profile;
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.scss";
import { setProfile } from "src/store/menu_slice";
import profile_icon from "assets/icons/profile_icon.svg";
import { selectPost, selectPosts } from "src/store/post_slice";

import Captian_Obvious from "assets/images/Captian_Obvious.jpg";
import Cancel_Witch from "assets/images/Cancel_Witch.jpg";
import Doomsday_Dennis from "assets/images/Doomsday_Dennis.jpg";
import Hype_Henry from "assets/images/Hype_Henry.jpg";
import Flat_Earther2 from "assets/images/Flat_Earther2.jpg";
import { names, profiles } from "src/lib";

function Profile() {
  const dispatch = useDispatch();
  const { post } = useSelector(selectPost);
  const { shuffle } = useSelector(selectPosts);
  const profile = shuffle.find(({id}) => id === post.postId)!;

  const pic = (() => {
    switch (profile.character) {
      case names[0]: return Flat_Earther2;
      case names[1]: return Hype_Henry;
      case names[2]: return Doomsday_Dennis;
      case names[3]: return Cancel_Witch;
      case names[4]: return Captian_Obvious;
      default: return "";
    }
  })();

  const charater = profiles.find(({name}) => name === profile.character)!;

  const close = () => {
    dispatch(setProfile(false));
  };

  return (
    <div className={styles.modal}>
      <img className={styles.icon} src={profile_icon} alt="message" />
      <article className={styles.box}>
        <img width={100} src={pic} alt="pic" />
        <div>
          <p className={styles.name}>{charater.name}</p>
          <p className={styles.about}>{charater.about}</p>
          <p className={styles.ability}>{charater.ability}</p>
        </div>
      </article>
      <div className={styles.extra}>
        <p>Joined: <span className={styles.joined}>{charater.joined}</span></p>
        <p>{typeof charater.followers === "string" || charater.followers > 1 ? "Followers" : "Follower"}: <span className={styles.followers}>{charater.followers}</span></p>
      </div>
      <button className={styles.bt} onClick={close}>CLOSE</button>
    </div>
  );
};