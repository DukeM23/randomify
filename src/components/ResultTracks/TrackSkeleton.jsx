export default function TrackSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-x-4 py-2 px-4 sm:px-4 md:grid-cols-8 md:py-4 md:gap-x-8">
      <div className="col-span-1 w-[%] h-32 bg-emerald-500 drop-shadow-2xl md:col-span-2 xl:col-span-1" />
      <div className=" h-full bg-emerald-500 flex justify-between items-center gap-x-5 gap-y-1 col-span-2 md:col-span-6">
        <div className="min-w-0 ">
          <h2 className="text-emerald-500 font-bold text-base sm:text-2xl md:text-3xl xl:text-4xl truncate">
            <div className="hover:underline"></div>
          </h2>
          <div className="text-emerald-600 text-sm sm:text-lg md:text-xl xl:text-2xl">
            <p className="truncate"></p>
          </div>
        </div>
      </div>
      <span className="play bg-cream-100  h-full"></span>
    </div>
    // <div className="grid grid-cols-3 gap-x-4 py-2 px-4 sm:px-4 md:grid-cols-8 md:py-4 md:gap-x-8">
    //   <div className="bg-emerald-500 h-48 w-48"></div>
    // </div>
  );
}
