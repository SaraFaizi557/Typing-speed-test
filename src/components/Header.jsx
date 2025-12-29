import { ChevronDown, Circle, CircleDot } from "lucide-react";
import { useState } from "react";
import { menu1Items, menu2Items } from "../constant";

const Header = ({
  changeDifficulty,
  openMenu1,
  setOpenMenu1,
  testComplete,
  timeLeft,
  changeMode,
  mode,
  isRunning,
  wpm,
  accuracy,
  personalBest
}) => {
  const [openMenu2, setOpenMenu2] = useState(false);
  const [menu1SelectedItem, setMenu1SelectedItem] = useState("Easy");
  const [menu2SelectedItem, setMenu2SelectedItem] = useState("Timed (60s)");
  const mm = Math.floor(timeLeft / 60);
  const ss = String(timeLeft % 60).padStart(2, "0");
  const display = `${mm}:${ss}`;

  const handleOpenMenu1 = () => {
    setOpenMenu1((prev) => !prev);
  };

  const handleOpenMenu2 = () => {
    setOpenMenu2((prev) => !prev);
  };

  const handleMenu1ItemClick = (title) => {
    setMenu1SelectedItem(title);
  };

  const handleMenu2ItemClick = (title) => {
    setMenu2SelectedItem(title);
  };

  const accuracyClass =
    accuracy >= 100
      ? "text-(--Neutral-0)"
      : accuracy >= 90
      ? "text-(--Yellow-400)"
      : "text-(--Red-500)";

  const timeClass = !isRunning
    ? "text-(--Neutral-0)"
    : mode === "timed" && timeLeft <= 10
    ? "text-(--Red-500)" 
    : "text-(--Yellow-400)"

  return (
    <div
      className={`flex flex-col gap-4 lg:gap-8 pb-4 md:pb-3 ${
        testComplete === false ? "border-b border-(--Neutral-600)" : " "
      }`}
    >
      <div className="flex items-center sm:mb-5 justify-between">
        <div>
          <img
            className="flex md:hidden select-none"
            src="/logo-small.svg"
            alt="small logo"
          />
          <img
            className="md:flex hidden select-none"
            src="/logo-large.svg"
            alt="large logo"
          />
        </div>
        <div className="flex items-center gap-2">
          <img
            className="select-none"
            src="/icon-personal-best.svg"
            alt="personal best"
          />
          <p className="sm:hidden text-lg font-normal text-(--Neutral-400)">
            Best:
            <span className="text-[1rem] text-(--Neutral-0) font-light">
              {" "}
              {personalBest == null ? "--" : personalBest} WPM
            </span>
          </p>

          <p className="hidden sm:block text-lg font-normal text-(--Neutral-400)">
            Personal best:
            <span className="text-[1rem] text-(--Neutral-0) font-light">
              {" "}
              {personalBest == null ? "--" : personalBest} WPM
            </span>
          </p>
        </div>
      </div>
      {!testComplete && (
        <div className="flex flex-col sm:items-start lg:flex-row md:justify-between gap-6 sm:gap-3">
          <div className="flex items-center justify-around">
            <div className="flex flex-col sm:flex-row sm:gap-2.5 items-center sm:pr-5 lg:pr-4">
              <p className="text-md sm:text-lg font-normal text-(--Neutral-400)">
                WPM:
              </p>
              <h3 className="text-2xl font-bold text-(--Neutral-0)">{wpm}</h3>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2.5 items-center border-l border-r border-(--Neutral-600) px-8 sm:px-5 lg:px-4">
              <p className="text-md sm:text-lg font-normal text-(--Neutral-400)">
                Accuracy:
              </p>
              <h3
                className={`text-2xl font-bold text-(--Neutral-0) ${accuracyClass}`}
              >
                {accuracy}%
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2.5 items-center sm:pl-5 lg:pl-4">
              <p className="text-md sm:text-lg font-normal text-(--Neutral-400)">
                Time:
              </p>
              <h3
                className={`text-2xl font-bold text-(--Neutral-0) ${timeClass}`}
              >
                {display}
              </h3>
            </div>
          </div>
          <div className="relative">
            <div className="sm:flex hidden items-center justify-around">
              <div className="flex items-center gap-1.5 pr-3">
                <p className="text-md font-normal text-(--Neutral-400) mr-2">
                  Difficulty:{" "}
                </p>
                {menu1Items.map(({ id, title }) => (
                  <button
                    key={id}
                    onClick={() => {
                      handleMenu1ItemClick(title);
                      changeDifficulty(title.toLowerCase());
                    }}
                    className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:border-(--Blue-400) hover:text-(--Blue-200) transition-all duration-300 px-2 py-1 rounded-lg font-extralight text-sm border ${
                      menu1SelectedItem === title
                        ? "border-(--Blue-400) text-(--Blue-200)"
                        : "border-(--Neutral-400) text-(--Neutral-0)"
                    }`}
                    // disabled={isButtonDisabled}
                    disabled={isRunning}
                  >
                    {title}
                  </button>
                ))}
              </div>
              <div className="h-8 w-[0.1rem] bg-(--Neutral-600)"></div>
              <div className="flex items-center gap-1.5 pl-3">
                <p className="text-md font-normal text-(--Neutral-400) mr-2">
                  Mode:{" "}
                </p>
                {menu2Items.map(({ id, title }) => {
                  const value = title.toLowerCase().includes("timed")
                    ? "timed"
                    : "passage";
                  const active = mode === value;

                  return (
                    <button
                      key={id}
                      onClick={() => {
                        handleMenu2ItemClick(title);
                        changeMode(value);
                      }}
                      className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:border-(--Blue-400) hover:text-(--Blue-200) transition-all duration-300 px-2 py-1 rounded-lg font-light text-sm border ${
                        menu2SelectedItem === title
                          ? "border-(--Blue-400) text-(--Blue-200)"
                          : "border-(--Neutral-400) text-(--Neutral-0)"
                      } ${
                        active
                          ? "border-(--Blue-400) text-(--Blue-200)"
                          : "border-(--Neutral-400) text-(--Neutral-0)"
                      }`}
                      disabled={isRunning}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex sm:hidden items-center gap-3">
              <button
                disabled={isRunning}
                onClick={() => handleOpenMenu1()}
                className="outline-none w-full gap-3 cursor-pointer text-md font-light py-1 flex items-center justify-center text-(--Neutral-0) border border-(--Neutral-400) rounded-lg"
              >
                {menu1SelectedItem}{" "}
                <img src="/icon-down-arrow.svg" alt="icon arrow down" />
              </button>
              <button
                disabled={isRunning}
                onClick={() => handleOpenMenu2()}
                className="outline-none w-full gap-3 cursor-pointer text-md font-light py-1 flex items-center justify-center text-(--Neutral-0) border border-(--Neutral-400) rounded-lg"
              >
                {menu2SelectedItem}
                <img src="/icon-down-arrow.svg" alt="icon arrow down" />
              </button>
            </div>
            <div className="absolute md:hidden w-full flex gap-3.5 top-10.5">
              {openMenu1 && (
                <div className="w-[48%] sm:w-[49%] rounded-lg flex flex-col bg-(--Neutral-800)">
                  {menu1Items.map(({ id, title }) => (
                    <div
                      key={id}
                      onClick={() => {
                        handleMenu1ItemClick(title);
                        changeDifficulty(title.toLowerCase());
                      }}
                      className={`cursor-pointer flex items-center px-2 sm:px-4 pb-1.5 pt-2 ${
                        id === 1 || id === 2
                          ? "border-b border-(--Neutral-700)"
                          : "border-none"
                      }`}
                    >
                      {menu1SelectedItem === title ? (
                        <CircleDot
                          size={26}
                          strokeWidth={4}
                          fill="hsl(210,100%,65%)"
                          className="text-(--Neutral-800) mr-2 -ml-1 outline-none focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:border-(--Blue-400)"
                        />
                      ) : (
                        <Circle
                          size={18}
                          strokeWidth={1.5}
                          className="text-(--Neutral-0) mr-3 outline-none focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:border-(--Blue-400)"
                        />
                      )}
                      <p className="text-(--Neutral-0) text-md font-extralight">
                        {title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {openMenu2 && (
                <div className="w-[48%] absolute right-0 h-fit rounded-lg flex flex-col bg-(--Neutral-800)">
                  {menu2Items.map(({ id, title }) => {
                    const value = title.toLowerCase().includes("timed")
                      ? "timed"
                      : "passage";
                    const active = mode === value;
                    return (
                      <div
                        key={id}
                        onClick={() => {
                          handleMenu2ItemClick(title);
                          changeMode(value);
                        }}
                        className={`cursor-pointer flex items-center px-2 sm:px-4 pb-1.5 pt-2 ${
                          id === 1
                            ? "border-b border-(--Neutral-700)"
                            : "border-none"
                        } ${
                          active
                            ? "border-(--Blue-400) text-(--Blue-200)"
                            : "border-(--Neutral-400) text-(--Neutral-0)"
                        }`}
                      >
                        {menu2SelectedItem === title ? (
                          <CircleDot
                            size={26}
                            strokeWidth={4}
                            fill="hsl(210,100%,65%)"
                            className="text-(--Neutral-800) mr-2 -ml-1 outline-none focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:border-(--Blue-400)"
                          />
                        ) : (
                          <Circle
                            size={18}
                            strokeWidth={1.5}
                            className="text-(--Neutral-0) mr-3 outline-none focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:border-(--Blue-400)"
                          />
                        )}
                        <p className="text-(--Neutral-0) text-md font-extralight">
                          {title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
