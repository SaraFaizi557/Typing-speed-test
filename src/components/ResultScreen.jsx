import { useEffect, useMemo } from "react";
import TestComplete from "./TestComplete";

const PB_KEY = "typing_pb_wpm";

function readPB() {
  try {
    const raw = localStorage.getItem(PB_KEY);
    if (raw == null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export default function ResultScreen({
  wpm,
  accuracy,
  incorrectChars,
  totalTyped,
  onGoAgain,
}) {
  const savedPB = useMemo(() => readPB(), []);

  const variant = useMemo(() => {
    if (savedPB == null) return "baseline";
    if (wpm > savedPB) return "highscore";
    return "complete";
  }, [wpm, savedPB]);

  const personalBestToShow = useMemo(() => {
    if (savedPB == null) return wpm;
    return wpm > savedPB ? wpm : savedPB;
  }, [wpm, savedPB]);

  useEffect(() => {
    if (!Number.isFinite(wpm)) return;
    if (savedPB == null || wpm > savedPB) {
      localStorage.setItem(PB_KEY, String(wpm));
    }
  }, [wpm, savedPB]);

  return (
    <TestComplete
      variant={variant}
      wpm={wpm}
      accuracy={accuracy}
      incorrectChars={incorrectChars}
      totalTyped={totalTyped}
      personalBest={personalBestToShow}
      onGoAgain={onGoAgain}
    />
  );
}
