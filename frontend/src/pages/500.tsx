import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Server Error | Phone Number Lookup Tool</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Server Error</h2>
          <p className="text-gray-600 mb-8">Something went wrong on our end. Please try again later.</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </>
  );
} 