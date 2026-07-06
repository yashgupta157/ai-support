import { useEffect, useState } from "react";

export default function useTypewriter(
  text,
  speed = 8
) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      return;
    }

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);

  }, [text, speed]);

  return displayed;
}