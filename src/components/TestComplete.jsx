const TestComplete = ({ wpm, accuracy, incorrectChars, totalTyped, onGoAgain }) => {
  return (
    <div className="flex gap-5 mt-10 md:gap-7 flex-col items-center justify-center">
      <div className="w-fit h-fit p-2 sm:p-2.5 md:p-3.5 rounded-full bg-(--Green-500)/12">
        <div className="w-fit h-fit p-2 sm:p-2.5 md:p-3.5 rounded-full bg-(--Green-500)/20">
          <img
            className="w-12.5 h-12.5 md:w-15 md:h-15"
            src="/icon-completed.svg"
            alt="icon completed"
          />
        </div>
      </div>
      <div className="flex flex-col text-center sm:mb-5 items-center gap-2">
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-(--Neutral-0) font-bold">
          Test Complete!
        </h3>
        <p className="text-(--Neutral-400) sm:text-lg md:text-xl md:font-[350] font-light">
          Solid run. Keep pushing to beat your high score.
        </p>
      </div>
      <div className="flex mb-4 sm:mb-7 md:items-center md:justify-center w-full flex-col gap-3 sm:flex-row sm:gap-4 md:gap-5">
        <div className="w-full md:w-40 border-2 border-(--Neutral-800) rounded-lg px-5 py-3 flex flex-col gap-1">
          <p className="text-lg font-normal text-(--Neutral-400)">WPM:</p>
          <h3 className="text-2xl font-bold text-(--Neutral-0)">{wpm}</h3>
        </div>
        <div className="w-full md:w-40 border-2 border-(--Neutral-800) rounded-lg px-5 py-3 flex flex-col gap-1">
          <p className="text-lg font-normal text-(--Neutral-400)">Accuracy:</p>
          <h3 className="text-2xl font-bold text-(--Neutral-0)">{accuracy}%</h3>
        </div>
        <div className="w-full md:w-40 border-2 border-(--Neutral-800) rounded-lg px-5 py-3 flex flex-col gap-1">
          <p className="text-lg font-normal text-(--Neutral-400)">
            Characters:
          </p>
          <h3 className="text-2xl font-bold text-(--Green-500)">
            {totalTyped}<span className="text-(--Neutral-500)">/</span><span className="text-(--Red-500)">{incorrectChars}</span>
          </h3>
        </div>
      </div>
      <button onClick={() => {
        onGoAgain()
      }} className="outline-none select-none mb-10 focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-3 focus-visible:ring-offset-black active:scale-98 flex items-center justify-center px-3.5 py-2.5 text-lg font-[600] cursor-pointer rounded-[.7rem] text-(--Neutral-900) gap-2 bg-(--Neutral-0) hover:bg-(--Neutral-0)/92 transition-colors duration-400">
        Go Again <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="--Neutral-900" viewBox="0 0 20 20"><path fill="#000" d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422"/></svg>
      </button>
      <img className="absolute select-none left-4 top-38 sm:left-8 sm:top-40 sm:w-7 md:left-30 md:top-60 w-5" src="/pattern-star-2.svg" alt="pattern star2" />
      <img className="absolute select-none right-5 bottom-10 sm:right-10 sm:bottom-100 sm:w-15 md:right-30 md:w-16 md:bottom-110 w-9" src="/pattern-star-1.svg" alt="pattern star1" />
    </div>
  );
};

export default TestComplete;
