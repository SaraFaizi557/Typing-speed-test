const Blur = ({ setIsBlur }) => {
  return (
    <div onMouseDown={(e) => e.preventDefault()} className="absolute gap-3 sm:gap-4 flex flex-col items-center left-0 pt-[25vh] lg:pt-[22vh] w-full backdrop-blur-sm h-full lg:h-[81vh] sm:h-[78vh] top-50 sm:top-60 lg:top-50 bottom-0 bg-[--Neutral-800]">
      <button
        onClick={() => {
          setIsBlur(false);

        }}
        className="cursor-pointer text-(--Neutral-0) shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-(--Blue-400) focus-visible:ring-offset-3 focus-visible:ring-offset-black w-fit select-none active:scale-98 font-medium tracking-wide text-lg px-4 py-2.5 sm:px-5.5 sm:py-3 rounded-xl bg-(--Blue-600) hover:bg-(--Blue-400) transiton-all duration-400"
      >
        Start Typing Test
      </button>
      <p className="text-(--Neutral-0) text-md sm:text-xl select-none">
        Or click the text and start typing
      </p>
    </div>
  );
};

export default Blur;
