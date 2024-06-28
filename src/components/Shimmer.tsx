
function Shimmer() {
  return (
    <div className="my-6">     
<div role="status" className="w-full animate-pulse mt-2 pt-2">
<div className="cursor-pointer w-full">
                <div className="flex items-center">
                <div className="h-5 mr-2 pr-2 bg-gray-200 rounded-full  w-6 mb-2"></div>
                <div className="h-2.5 bg-gray-200 rounded-full  w-40 mb-2"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
            </div> 
    <div className="h-2 bg-gray-200 rounded-full  mt-2 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  mt-2 mb-2.5"></div>
    <div className="h-2.5 bg-gray-200 rounded-full  w-24 mb-2"></div>
    <span className="sr-only">Loading...</span>
</div>


    </div>
  )
}

export default Shimmer