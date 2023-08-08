export default function GenreSkeleton() {
  const genreLength = new Array(126).fill("");
  const widths = ["32", "36", "40", "48"];
  console.log(genreLength);
  return (
    <div className="flex justify-center flex-wrap">
      {genreLength.map((_, idx) => {
        const index = Math.floor(Math.random() * widths.length);
        return (
          <div
            key={idx}
            className={`h-10 w-${widths[index]} m-2 border-2 rounded-full animate-skeleton border-emerald-500 bg-emerald-600 text-gray-900 font-semibold`}
          />
        );
      })}
      ;
    </div>
  );
}