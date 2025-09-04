'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

export default function PollsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add scroll to top functionality
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <header className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-primary mr-2" />
                <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Polls
                </h1>
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/30 rounded-full mx-auto" />
            </header>
            <main className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {children}
              </motion.div>
            </main>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}