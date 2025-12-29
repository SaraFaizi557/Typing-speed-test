import { useMemo } from "react";

const Confetti = () => {
  const pieces = Array.from({ length: 80 });
  return (
    <div className="pointer-events-none w-screen sm:-left-20 absolute inset-x-0 -bottom-10 h-44">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 block h-4 w-1.5 opacity-90 animate-[fall_1.8s_linear_infinite]"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1.2}s`,
            transform: `rotate(${Math.random() * 180}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-220px) rotate(360deg); opacity: 0; }
        }
        /* random-ish colors */
        .animate-\\[fall_1\\.8s_linear_infinite\\] {
          background: currentColor;
        }
        .animate-\\[fall_1\\.8s_linear_infinite\\]:nth-child(4n+1){ color: #60a5fa; }
        .animate-\\[fall_1\\.8s_linear_infinite\\]:nth-child(4n+2){ color: #34d399; }
        .animate-\\[fall_1\\.8s_linear_infinite\\]:nth-child(4n+3){ color: #fbbf24; }
        .animate-\\[fall_1\\.8s_linear_infinite\\]:nth-child(4n){ color: #f87171; }
      `}</style>
    </div>
  );
};

const TestComplete = ({
  variant = "complete",
  wpm,
  accuracy,
  incorrectChars,
  totalTyped,
  // personalBest,
  onGoAgain,
}) => {
  const ui = useMemo(() => {
    if (variant === "baseline") {
      return {
        title: "Baseline Established!",
        subtitle: "You’ve set the bar. Now try to beat it.",
        btn: "Beat This Score",
        icon: "/icon-completed.svg",
        showConfetti: false,
        iconClass: "w-12.5 h-12.5 md:w-15 md:h-15",
        noBadgeBg: false,
      };
    }
    if (variant === "highscore") {
      return {
        title: "High Score Smashed!",
        subtitle: "You broke your personal best. Keep going!",
        btn: "Beat This Score",
        icon: "/icon-new-pb.svg",
        showConfetti: true,
        noBadgeBg: true,
        iconClass: "w-18 h-18 md:w-20 md:h-20",
      };
    }
    return {
      title: "Test Complete!",
      subtitle: "Solid run. Keep pushing to beat your high score.",
      btn: "Go Again",
      icon: "/icon-completed.svg",
      showConfetti: false,
      iconClass: "w-12.5 h-12.5 md:w-15 md:h-15",
      noBadgeBg: false,
    };
  }, [variant]);

  localStorage.setItem("typing_pb_wpm", "10");

  return (
    <div className="relative h-[88vh] sm:h-[83vh] flex gap-5 mt-10 md:gap-7 flex-col items-center justify-start">
      {ui.showConfetti ? <Confetti /> : null}

      {ui.noBadgeBg ? (
        <img className={ui.iconClass} src={ui.icon} alt="status icon" />
      ) : (
        <div className="w-fit h-fit p-2 sm:p-2.5 md:p-3.5 rounded-full bg-(--Green-500)/12">
          <div className="w-fit h-fit p-2 sm:p-2.5 md:p-3.5 rounded-full bg-(--Green-500)/20">
            <img className={ui.iconClass} src={ui.icon} alt="status icon" />
          </div>
        </div>
      )}

      <div className="flex flex-col text-center sm:mb-5 items-center gap-2">
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-(--Neutral-0) font-bold">
          {ui.title}
        </h3>
        <p className="text-(--Neutral-400) sm:text-lg md:text-xl md:font-[350] font-light">
          {ui.subtitle}
        </p>
      </div>

      <div className="flex mb-4 sm:mb-7 md:items-center md:justify-center w-full flex-col gap-3 sm:flex-row sm:gap-4 md:gap-5">
        <div className="w-full md:w-40 border-2 border-(--Neutral-800) rounded-lg px-5 py-3 flex flex-col gap-1">
          <p className="text-lg font-normal text-(--Neutral-400)">WPM:</p>
          <h3 className="text-2xl font-bold text-(--Neutral-0)">{wpm}</h3>
        </div>

        <div className="w-full md:w-40 border-2 border-(--Neutral-800) rounded-lg px-5 py-3 flex flex-col gap-1">
          <p className="text-lg font-normal text-(--Neutral-400)">Accuracy:</p>
          <h3
            className={`text-2xl font-bold ${
              accuracy === 100 ? "text-(--Neutral-0)" : "text-(--Red-500)"
            }`}
          >
            {accuracy}%
          </h3>
        </div>

        <div className="w-full md:w-40 border-2 border-(--Neutral-800) rounded-lg px-5 py-3 flex flex-col gap-1">
          <p className="text-lg font-normal text-(--Neutral-400)">
            Characters:
          </p>
          <h3 className="text-2xl font-bold text-(--Green-500)">
            {totalTyped}
            <span className="text-(--Neutral-500)">/</span>
            <span className="text-(--Red-500)">{incorrectChars}</span>
          </h3>
        </div>
      </div>

      <button
        onClick={onGoAgain}
        className="outline-none select-none mb-10 focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-3 focus-visible:ring-offset-black active:scale-98 flex items-center justify-center px-3.5 py-2.5 text-lg font-[600] cursor-pointer rounded-[.7rem] text-(--Neutral-900) gap-2 bg-(--Neutral-0) hover:bg-(--Neutral-0)/92 transition-colors duration-400"
      >
        {ui.btn}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="--Neutral-900"
          viewBox="0 0 20 20"
        >
          <path
            fill="#000"
            d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422"
          />
        </svg>
      </button>
      <img
        className="absolute select-none left-4 top-10 sm:w-7 md:left-20 md:top-30 w-5"
        src="/pattern-star-2.svg"
        alt="pattern star2"
      />
      <img
        className="absolute select-none right-5 bottom-2 sm:w-15 md:right-20 md:w-16 md:bottom-90 w-9"
        src="/pattern-star-1.svg"
        alt="pattern star1"
      />
    </div>
  );
};

export default TestComplete;
