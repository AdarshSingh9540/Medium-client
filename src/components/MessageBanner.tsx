"use client";

export default function CTASection() {
  return (
    <section
      style={{
        backgroundColor: "#5b4f9a",
        backgroundImage: "linear-gradient(316deg, #5b4f9a 0%, #6e57b8 74%)",
      }}
      className="w-full max-w-screen-2xl h-96 gap-5 flex flex-col justify-center items-center p-4 md:p-8"
    >
      <p className="text-4xl md:text-6xl text-white font-bold text-center">
        Your Story Awaits
      </p>
      <p className="text-sm md:text-base font-medium text-white/70 w-full md:w-4/12 text-center">
        Every story deserves to be told. Join us in creating a vibrant community of writers and storytellers.
      </p>
      <a href="/signup">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-white hover:bg-gray-700 h-10 px-4 py-2">
          Start Blogging
        </button>
      </a>

    </section>
  );
}
