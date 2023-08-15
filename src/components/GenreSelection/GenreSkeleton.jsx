export default function GenreSkeleton() {
  const genreLength = new Array(45).fill("");
  const widths = ["w-32", "w-36", "w-40", "w-48"];
  return (
    <div className="flex justify-center flex-wrap h-screen">
      {genreLength.map((_, idx) => {
        let index = Math.floor(Math.random() * widths.length);
        return (
          <div
            key={idx}
            className={`h-10 ${widths[index]} m-2 border-2 rounded-full animate-skeleton border-emerald-500 bg-emerald-600 text-gray-900 font-semibold`}
          />
        );
      })}
      ;
    </div>
  );
}
