import { useState } from "react";

const Main = ({
  passage,
  inputRef,
  typed,
  setTyped,
  onFocusTyping,
  restart,
  setTestComplete,
  setIsButtonDisabled,
  setTimeLeft,
  isRunning,
  setIsRunning,
  isBlur
}) => {
  const [resetButton, setResetButton] = useState(false);

  const caretIndex = typed.length;

  return (
    <>
      <div className="flex flex-col py-8 lg:py-10 border-b border-[var(--Neutral-600)]">
        <h1 
          onClick={onFocusTyping}
          className="select-none cursor-text lg:min-h-[50vh] md:[word-spacing:0.6rem] md:tracking-wide text-[var(--Neutral-400)] text-[1.9rem] sm:text-[2.2rem] lg:text-[2.6rem] font-light leading-[2.75rem] sm:leading-[2.9rem] lg:leading-[3.5rem]"
        >
          {passage.split("").map((char, i) => {
            const t = typed[i];
            const isTyped = t != null;
            const isCorrect = isTyped && t === char;
            const isWrong = isTyped && t !== char;
            const isCurrent = i === caretIndex;

            return (
              <span
                key={i}
                className={`${
                  isCorrect
                    ? "text-(--Green-500)"
                    : isWrong
                    ? "text-(--Red-500) underline"
                    : ""
                } ${
                  isCurrent
                    ? "bg-(--Neutral-0)/15 rounded [animation:blink_1s_infinite]"
                    : ""
                }`}
              >
                {char}
              </span>
            );
          })}
          {caretIndex === passage.length && (
            <span
              className={`bg-(--Neutral-0)/15 rounded [animation:blink_1s_infinite]`}
            >
              &nbsp;
            </span>
          )}
        </h1>

        <input
          ref={inputRef}
          type="text"
          value={typed}
          readOnly={isBlur}
          onChange={(e) => {
            if (isBlur) return;
            const next = e.target.value.slice(0, passage.length);

            if (!isRunning && next.length > 0) setIsRunning(true);
            setTyped(next);
            setResetButton(next.length > 0);

            if (next.length === passage.length) {
              setTestComplete(true);
              setIsRunning(false);
            }
            if (!isRunning && next.length > 0) setIsRunning(true);
          }}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
              e.preventDefault();
            }
          }}
          autoComplete="off"
          spellCheck={false}
          className="absolute left-0 top-0 w-px h-px outline-none select-none"
        />
      </div>

      <div className="flex items-center justify-center py-6 sm:py-7">
        <button
          onClick={() => {
            restart();
            setTyped("");
            setTimeLeft(60);
            setIsRunning(false);
            setTestComplete(false);
            setResetButton(false);
            setIsButtonDisabled(false);
          }}
          className="outline-none active:scale-98 flex items-center justify-center px-4 py-3 text-xl cursor-pointer rounded-[.7rem] text-(--Neutral-0) gap-3 bg-(--Neutral-800)"
        >
          Restart Test <img src="/icon-restart.svg" alt="icon restart" />
        </button>
      </div>
    </>
  );
};

export default Main;
