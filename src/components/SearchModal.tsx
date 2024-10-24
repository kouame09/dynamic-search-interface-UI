import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  date: string;
  content: string;
  timeToRead?: string;
  thumbnail?: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Apple's WWDC 2023",
    date: "JUL 2, 2023",
    content: "• Controlled by natural inputs such as eyes, hands, and voice, it transcends traditional displays.\n\n• Powered by visionOS, the world's first spatial operating system, users can interact with digital content as if it were physically present in their space.",
    thumbnail: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=300&h=300&fit=crop",
    timeToRead: "7 min"
  },
  {
    id: 2,
    title: "Meta's Data Setup",
    date: "JUN 28, 2023",
    content: "Comprehensive overview of Meta's latest data infrastructure and privacy measures.",
    timeToRead: "5 min"
  },
  {
    id: 3,
    title: "July Fund",
    date: "JUN 25, 2023",
    content: "Analysis of technology investment trends and opportunities in July 2023.",
    timeToRead: "10 min"
  }
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#e8d5cc] p-8 flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm"
      >
        Open Search
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4"
          >
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="bg-white/90 backdrop-blur-md w-full max-w-2xl rounded-xl shadow-xl overflow-hidden relative"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="p-4 flex items-center border-b border-gray-200">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-1 bg-transparent outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="space-y-2">
                  <h2 className="font-semibold text-gray-900 mb-4">Summaries</h2>
                  {filteredArticles.map(article => (
                    <motion.button
                      key={article.id}
                      className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                        selectedArticle?.id === article.id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => setSelectedArticle(article)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {article.title}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {selectedArticle && (
                    <motion.div
                      key={selectedArticle.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <span className="text-sm text-gray-500">{selectedArticle.date}</span>
                      <h2 className="text-xl font-semibold mt-1 mb-3">{selectedArticle.title}</h2>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{selectedArticle.content}</p>
                      
                      {selectedArticle.thumbnail && (
                        <div className="mt-4 flex items-center gap-4">
                          <img
                            src={selectedArticle.thumbnail}
                            alt={selectedArticle.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="text-sm text-gray-500">
                            Time to read: {selectedArticle.timeToRead}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}