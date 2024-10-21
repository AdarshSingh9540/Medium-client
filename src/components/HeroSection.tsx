"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Footer from "./Footer";
import CardWithAnimation from "./CardWithAnimation";
import AISuggestionWidget from "./AiSuggestion";
import CTASection from "./MessageBanner";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-800">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <a href="/" className="hidden lg:block">
            <div className="font-bold text-md flex items-center">
              <img
                className="w-12 mr-2"
                src="https://static.thenounproject.com/png/19895-200.png"
                alt=""
              />
              IndiBlog
            </div>
          </a>
          <div className="hidden md:flex space-x-20 font-medium">
            <a
              href="#features"
              className="hover:text-purple-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-purple-600 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#contact"
              className="hover:text-purple-600 transition-colors"
            >
              Contact
            </a>
          </div>
          <a href="/signup">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors">
              Sign Up
            </button>
          </a>
        </nav>
      </header>

      <div className="bg-gradient-to-b from-purple-600 to-indigo-400 w-fit flex gap-2 mt-6 py-[6px] pl-3 pr-4 mx-auto rounded-full font-semibold text-white">
        <img alt="" loading="lazy" width="16" height="17" decoding="async" data-nimg="1" src="https://conqrr.vercel.app/_next/static/media/bi_stars.7e13c393.svg" />
        Streamline Your Blogging Journey
      </div>

      <main className="container mx-auto px-4 py-10">
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-xl lg:text-5xl md:text-6xl font-bold mb-6">
              Redefine your{" "}
              <span className="text-purple-600">Blogging journey</span>
              <br />
              with streamlined solutions
            </h1>
            <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
              Experience seamless, AI-powered solutions for every step of your
              content creation process
            </p>
            <a href="/signup">
              <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-md hover:bg-slate-900 transition-colors">
                Get Started
              </button>
            </a>
          </motion.div>
        </section>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto h-auto text-center bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="border border-gray-200 p-4">
            <div className="border border-gray-200 p-2 rounded-2xl">
              <img
                src="https://res.cloudinary.com/dzvdh7yez/image/upload/v1728635917/Screenshot_2024-10-11_140816_gh6phs.png"
                alt="BlogWave Dashboard"
                width={1200}
                height={600}
                className="w-full h-auto p-4"
              />
            </div>
          </div>
        </motion.section>


      </main>
      
      <AISuggestionWidget/>
    
      <CardWithAnimation />
      <CTASection/>
      <Footer />
    </div>
  );
}