"use client"
export default function CTASection() {
 return (
    <>
    <section
    style={{
        backgroundColor: "#5b4f9a", 
        backgroundImage: "linear-gradient(316deg, #5b4f9a 0%, #6e57b8 74%)" 
      }}
      
    className="w-full max-w-screen-2xl h-96 gap-5 flex flex-col justify-center items-center ">
  <p className="text-6xl text-white font-bold">Your Story Awaits</p>
  <p className="text-base font-medium text-white/70 w-3/12 text-center">
  Every story deserves to be told. Join us in creating a vibrant community of writers and storytellers.
  </p>
  <a href="/signup">
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-white hover:bg-gray-700 h-10 px-4 py-2">
    Start Blogging
  </button>
  </a>
</section>

    </>
  )
}