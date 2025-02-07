import { useEffect, useRef, useState, FC } from "react";
import { COMMENT_TYPING_SPEED } from "src/lib";

const TypingText: FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  // @ts-ignore
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!text) return;

    setDisplayedText("");
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        const char = text[indexRef.current];
        if (char !== undefined) {
          setDisplayedText((prev) => prev + char);
          indexRef.current += 1;
        }
      }

      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        onComplete();
      }
    }, COMMENT_TYPING_SPEED);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
};

export default TypingText;
