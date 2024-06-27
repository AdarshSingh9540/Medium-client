
function Shimmer() {
  return (
    <div>     
<div role="status" className="w-full animate-pulse mt-2 pt-2">
<div className="cursor-pointer w-full">
                <div className="flex items-center">
                <div className="h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="font-bold mt-2"></div>
                <div className="mt-2"></div>
                <div className="text-slate-400 text-sm mt-2"></div>
                <div className="bg-slate-200 h-1 w-full mt-2"></div>
            </div>
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div>


    </div>
  )
}

export default Shimmer