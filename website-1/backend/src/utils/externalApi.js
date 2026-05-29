const axios = require("axios");

const fetchWithRetry = async (url, options = {}, retries = 2) => {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await axios({ url, timeout: 8000, ...options });
      return response.data;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
};

module.exports = { fetchWithRetry };
