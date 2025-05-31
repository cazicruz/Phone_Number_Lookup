import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-4"
    >
      <FaSpinner className="animate-spin text-blue-600 text-2xl mb-2" />
      <p className="text-gray-600">{text}</p>
    </motion.div>
  );
} 