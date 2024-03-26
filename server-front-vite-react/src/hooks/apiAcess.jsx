import { useState } from 'react';

const apiAcess = () => {
  const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:3000';

  const fetchData = async (endpoint, method = 'GET', data = null) => {
    try {
      setError(null);

      const url = `${apiUrl}/${endpoint}`;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  const getData = async (endpoint) => {
    return fetchData(endpoint);
  };

  const postData = async (endpoint, data) => {
    return fetchData(endpoint, 'POST', data);
  };

  return { getData, postData, error };
};

export default apiAcess;
