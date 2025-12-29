import { useEffect, useRef, useState } from "react";
import { Blur, Header, Main, ResultScreen } from "./components";
import { easyText, hardText, mediumText } from "./constant";

const PB_KEY = "typing_pb_wpm";
const TEST_DURATION = 60;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)].text;
const getPool = (d) =>
  d === "easy" ? easyText : d === "medium" ? mediumText : hardText;

const App = () => {
  const [openMenu1, setOpenMenu1] = useState(false);
  const [isBlur, setIsBlur] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");
  const [passage, setPassage] = useState(() => pickRandom(getPool("easy")));
  const [typed, setTyped] = useState("");
  const [testComplete, setTestComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [finalWpm, setFinalWpm] = useState(0);
  const [resultVariant, setResultVariant] = useState("complete");
  const [personalBest, setPersonalBest] = useState(null);

  const [mode, setMode] = useState("timed");
  const [passageTimeLeft, setPassageTimeLeft] = useState(
    mode === "timed" ? 60 : 0
  );

  useEffect(() => {
  const raw = localStorage.getItem(PB_KEY);
  const n = raw ? Number(raw) : null;
  setPersonalBest(Number.isFinite(n) ? n : null);
}, []);


  const elapsedSec =
    mode === "timed"
      ? Math.max(0, TEST_DURATION - passageTimeLeft)
      : passageTimeLeft;

  const correctChars = (() => {
    let c = 0;
    const n = Math.min(typed.length, passage.length);
    for (let i = 0; i < n; i++) if (typed[i] === passage[i]) c++;
    return c;
  })();

  const totalTyped = typed.length;
  const incorrectChars = Math.max(0, totalTyped - correctChars);

  const accuracy =
    totalTyped === 0 ? 100 : +((correctChars / totalTyped) * 100).toFixed(1);

  const wpm =
    elapsedSec < 1 ? 0 : Math.round(totalTyped / 5 / (elapsedSec / 60));

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setPassageTimeLeft((t) => {
        if (mode === "timed") return t <= 1 ? 0 : t - 1;
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, mode]);

  useEffect(() => {
    if (!isRunning) return;

    const finishedTimed = mode === "timed" && passageTimeLeft === 0;
    const finishedPassage =
      mode === "passage" && typed.length >= passage.length;

    if (!finishedTimed && !finishedPassage) return;

    const oldPB = personalBest;
    const fwpm = wpm;

    const v =
      oldPB == null ? "baseline" : fwpm > oldPB ? "highscore" : "complete";

    setFinalWpm(fwpm);
    setResultVariant(v);

    if (oldPB == null || fwpm > oldPB) {
      localStorage.setItem(PB_KEY, String(fwpm));
      setPersonalBest(fwpm);
    }

    setIsRunning(false);
    setTestComplete(true);
  }, [
    passageTimeLeft,
    mode,
    typed.length,
    passage.length,
    isRunning,
    wpm,
    personalBest,
  ]);

  const inputRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isBlur ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isBlur]);

  const focusTyping = () =>
    requestAnimationFrame(() => inputRef.current?.focus());

  const startTest = () => {
    setIsBlur(false);
    focusTyping();

    setTyped("");
    setTestComplete(false);
    setPassageTimeLeft(mode === "timed" ? TEST_DURATION : 0);
    setIsRunning(false);
  };

  const restart = () => {
    setIsRunning(false);
    setTyped("");
    setTestComplete(false);
    setPassage(pickRandom(getPool(difficulty)));
    setPassageTimeLeft(mode === "timed" ? 60 : 0);
    focusTyping();
    setIsButtonDisabled(true);
  };

  const changeDifficulty = (d) => {
    if (isRunning) return;

    setDifficulty(d);
    setPassage(pickRandom(getPool(d)));
    setTyped("");
    setTestComplete(false);
    setIsRunning(false);
    setIsButtonDisabled(false);

    setPassageTimeLeft(mode === "timed" ? 60 : 0);

    if (!isBlur) focusTyping();
  };

  const changeMode = (m) => {
    if (isRunning) return;
    setMode(m);
    setTyped("");
    setTestComplete(false);
    setPassageTimeLeft(m === "timed" ? 60 : 0);
  };

  const onGoAgain = () => {
    setTestComplete(false);
    restart();
    focusTyping();
    setTyped("");
  };

  return (
    <main className="blur-effect p-4 sm:px-6 sm:py-7 md:px-15 md:py-8 lg:px-25 overflow-hidden">
      <Header
        personalBest={personalBest}
        resultVariant={resultVariant}
        finalWpm={finalWpm}
        mode={mode}
        changeMode={changeMode}
        timeLeft={passageTimeLeft}
        isRunning={isRunning}
        testComplete={testComplete}
        openMenu1={openMenu1}
        setOpenMenu1={setOpenMenu1}
        changeDifficulty={changeDifficulty}
        isBlur={isBlur}
        isButtonDisabled={isButtonDisabled}
        wpm={wpm}
        accuracy={accuracy}
      />
      {(testComplete && (
        <ResultScreen
          onGoAgain={onGoAgain}
          wpm={wpm}
          accuracy={accuracy}
          correctChars={correctChars}
          totalTyped={totalTyped}
          incorrectChars={incorrectChars}
        />
      )) || (
        <Main
          restart={restart}
          difficulty={difficulty}
          passage={passage}
          typed={typed}
          setTyped={setTyped}
          inputRef={inputRef}
          onFocusTyping={focusTyping}
          openMenu1={openMenu1}
          setTestComplete={setTestComplete}
          setIsRunning={setIsRunning}
          isRunning={isRunning}
          setIsButtonDisabled={setIsButtonDisabled}
          changeDifficulty={changeDifficulty}
          setIsBlur={setIsBlur}
          timeLeft={passageTimeLeft}
        />
      )}
      {isBlur && <Blur setIsBlur={setIsBlur} startTest={startTest} />}
    </main>
  );
};

export default App;
