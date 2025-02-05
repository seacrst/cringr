import { Howl } from "howler";
import { useEffect, useState } from "react";
import styles from "./settings.module.scss";
import bg_music from "assets/audio/pop-beat-62044.mp3"
import sound_on from "assets/icons/sound_on.svg"
import sound_off from "assets/icons/sound_off.svg"

const music = new Howl({
  src: [bg_music],
  loop: true,
  volume: 0,
  autoplay: false,
  sprite: {
    loop: [40, 18_168, true]
  },
});


const Settings = () => {
  const [sound, setSound] = useState(true);

  useEffect(() => {
    if (sound && !music.playing()) {
      music.play("loop");
      music.fade(0, 0.3, 2000);
    } else {
      music.stop();
    }
  }, [sound]);
  
  const toggleSound = () => {
    setSound(s => !s);
  };
  
  return (
    <div className={styles.setting}>
      <button className={styles.sound} onClick={toggleSound}>{sound ? (
        <img src={sound_on} alt="sound" />
      ) : <img src={sound_off} alt="sound" />}</button>
    </div>
  );
};

export default Settings;