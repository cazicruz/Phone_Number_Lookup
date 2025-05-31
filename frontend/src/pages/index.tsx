import React, { useState } from 'react';
import { FaSearch, FaSpinner, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import RenderObject from "../components/RenderObject";
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
// import Breadcrumb from '../components/Breadcrumb';
// import LoadingSpinner from '../components/LoadingSpinner';
import { parsePhoneNumberWithError, isValidPhoneNumber } from 'libphonenumber-js';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lookupType, setLookupType] = useState('free');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showAbout, setShowAbout] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const cleanedInput = phoneNumber.replace(/[\s-]/g, '')

      if (!cleanedInput.startsWith('+')) {
        toast.error('Phone number must be in international format (start with +).')
        return;
      }
    
      // Validate and format phone number
      const parsedNumber = parsePhoneNumberWithError(cleanedInput) // Use a default country if needed
    
      //no need fotr this guy since the guy above trows an error on invalid number
      // if (!parsedNumber.isValid()) {
      //   toast.error('Please enter a valid phone number.')
      //   return
      // }
    
      const formattedPhoneNumber = parsedNumber.format('E.164')
    
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/lookup`, {
        phoneNumber: formattedPhoneNumber,
        lookupType
      })
    
      setResult(response.data)
      toast.success('Lookup successful!')
    } catch (error: any) {
      const message =
        Array.isArray(error)
          ? error.map(err => (typeof err === 'string' ? err : String(err))).join('\n')
          : error?.response?.data?.error?.message ||
            error?.response?.data?.error ||
            error?.message ||
            'An error occurred'
    
      toast.error(message)
    } finally {
      setLoading(false)
    }
    
  };

  return (
    <>
      <Head>
        <link 
          rel="canonical" 
          href="https://phone-number-lookup-unu6.vercel.app" 
        />
        <link 
          rel="icon" 
          type="image/png" 
          href="/images/Blue_Icon__Phone___Magnifying_Glass-removebg-preview.png"
        />
        <link 
          rel="apple-touch-icon" 
          href="/images/Blue_Icon__Phone___Magnifying_Glass-removebg-preview.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {/* <Breadcrumb 
            items={[
              { label: 'Home', href: '/' }
            ]} 
          /> */}
        </div>
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Image
                src="/images/Blue_Icon__Phone___Magnifying_Glass-removebg-preview.png"
                alt="Phone Number Lookup Logo"
                width={100}
                height={100}
                priority
                className="mx-auto"
              />
            </motion.div>
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Phone Number Lookup
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              A powerful tool for verifying phone numbers and retrieving detailed carrier information
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+2348012345678"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lookupType" className="block text-sm font-medium text-gray-700">
                  Lookup Type
                </label>
                <select
                  id="lookupType"
                  value={lookupType}
                  onChange={(e) => setLookupType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="free">Free Lookup</option>
                  <option value="hlr">HLR Lookup</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaSearch className="mr-2" />
                    Lookup
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Results Section */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Results</h2>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <p className='text-center text-gray-900 text-2xl mb-4'>
                    Network Provider: <strong>{result.data.original_network?.network_name || result.data?.carrierCode || 'Not available'}</strong>
                  </p>
                  {result.data.original_network?.country_name && (
                    <p className='text-center text-gray-900 text-xl mb-2'>
                      Country: <strong>{result.data.original_network.country_name}</strong>
                    </p>
                  )}
                  {result.data.original_network?.country_iso2 && (
                    <p className='text-center text-gray-900 text-xl'>
                      Country ISO: <strong>{result.data.original_network.country_iso2}</strong>
                    </p>
                  )}
                </div>
                <RenderObject data={result.data} />
              </div>
            </motion.div>
          )}

          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4"><a href='https://cazicruz.github.io/portfolio/'>About the Creator</a></h2>
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden relative">
                <Image 
                  src="/images/DavidOnwuli.png" 
                  alt="David Onwuli" 
                  width={500} // original width
                  height={500} // original height
                  priority
                  className="fit-content"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">David Onwuli .C.</h3>
              <p className="text-gray-600 mb-4">
                A detail-oriented and motivated Software Engineer with a focus on Backend Development. 
                With comprehensive knowledge of primary development languages and a passion for clean, 
                efficient code and robust system architectures.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Backend Development</h4>
                  <p className="text-sm text-gray-600">Deep understanding of API development, Error Handling, Unit Tests and Troubleshooting</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-900">Team Collaboration</h4>
                  <p className="text-sm text-gray-600">Strong team player with excellent communication and collaboration skills</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900">System Design</h4>
                  <p className="text-sm text-gray-600">Expertise in database design and software architecture</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://github.com/cazicruz" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Visit David Onwuli's GitHub profile"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/david-onwuli-6043b723a/" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Visit David Onwuli's LinkedIn profile"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://twitter.com/OnwuliDavi79772" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Visit David Onwuli's Twitter profile"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* {loading && <LoadingSpinner text="Processing your request..." />} */}
    </>
  );
} 