export default function TrackSkeleton() {
  return (
    <div className="grid grid-cols-8 gap-x-4 py-2 px-4 sm:px-4 md:py-4 md:gap-x-8">
      <div className="col-span-2 w-[%] h-[10rem] animate-skeleton bg-emerald-800 drop-shadow-2xl rounded-md md:col-span-2 xl:col-span-1" />
      <div className="h-full flex justify-between items-center gap-x-5 gap-y-1 col-span-6 lg:col-span-6 xl:col-span-7">
        <div className="w-3/4 flex flex-col justify-center gap-y-3">
          <div className="w-full h-6 animate-skeleton bg-emerald-800 rounded-md" />
          <div className="w-1/4 h-5 bg-emerald-800 rounded-md" />
        </div>
        <div className="w-12 h-12 animate-skeleton bg-emerald-800 rounded-full"></div>
      </div>
    </div>
    // <div className="grid grid-cols-3 gap-x-4 py-2 px-4 sm:px-4 md:grid-cols-8 md:py-4 md:gap-x-8">
    //   <div className="bg-emerald-500 h-48 w-48"></div>
    // </div>
  );
}
