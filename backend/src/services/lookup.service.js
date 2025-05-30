// require('dotenv').config();

const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const { CHECK_MOBI_API_KEY, CHECKMOBI_VERIFY_BASE_URL, CHECKMOBI_HLR_BASE_URL } = process.env;

console.log('VERIFY URL:', CHECKMOBI_VERIFY_BASE_URL);
console.log('HLR URL:', CHECKMOBI_HLR_BASE_URL);
console.log('API KEY:', CHECK_MOBI_API_KEY ? 'Loaded' : 'Missing');

// Configure axios instance with timeout and retry logic
const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Authorization': `${CHECK_MOBI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Configure retry logic
axiosRetry(axiosInstance, {
  retries: 3, // Number of retries
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Progressive delay: 1s, 2s, 3s
  },
  retryCondition: (error) => {
    // Retry on network errors or 5xx server errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           (error.response && error.response.status >= 500);
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retry attempt ${retryCount} for ${requestConfig.url} errors: ${error.response.data.error}`);
  }
});

const freeLookupVerification = async (phoneNumber) => {
  try {
    const response = await axiosInstance.get(`${CHECKMOBI_VERIFY_BASE_URL}/${phoneNumber}`);
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - service is taking too long to respond');
    }
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`API Error: ${error.response.data.error || error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the service');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

const hlrLookupVerification = async (phoneNumber) => {
  try {
    const response = await axiosInstance.get(`${CHECKMOBI_HLR_BASE_URL}/${phoneNumber}`);
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - service is taking too long to respond');
    }
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`API Error: ${error.response.data.error || error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the service');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

module.exports = { freeLookupVerification, hlrLookupVerification };