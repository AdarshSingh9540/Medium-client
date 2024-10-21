"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, RefreshCw, ChevronRight } from "lucide-react";

// Define the type for suggestion items
interface Suggestion {
  title: string;
  description: string;
}

function AISuggestionWidget() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newSuggestions: Suggestion[] = [
      { title: "The Future of AI in Content Creation", description: "Explore how AI is revolutionizing the way we create and consume content." },
      { title: "Sustainable Living: Small Changes, Big Impact", description: "Discover easy ways to adopt a more eco-friendly lifestyle." },
      { title: "Mastering the Art of Productivity", description: "Learn time-management techniques to boost your efficiency and achieve more." }
    ];
    setSuggestions(newSuggestions);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <Lightbulb className="mr-2 text-yellow-500" />
          AI Content Ideas
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchSuggestions}
          className="text-purple-600 hover:text-purple-700 focus:outline-none bg-purple-100 p-2 rounded-full"
          disabled={isLoading}
        >
          <RefreshCw className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-48"
          >
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
          </motion.div>
        ) : (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-semibold text-purple-700 mb-2">{suggestion?.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{suggestion?.description}</p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                >
                  Use this idea <ChevronRight className="ml-1 w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-800">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">Spark Your Creativity</h2>
          <AISuggestionWidget />
        </div>
      </section>
    </div>
  );
}
