import { useState } from "react";
import axios from "axios";

const useApi = (baseURL) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const makeRequest = (method, endpoint, body) => {
    setState((prev) => ({ ...prev, loading: true }));

    axios[method](baseURL + endpoint, body)
      .then((response) =>
        setState({ data: response.data, error: null, loading: false })
      )
      .catch((error) => setState({ data: null, error, loading: false }));
  };

  return {
    ...state,
    get: (endpoint, params) => makeRequest("get", endpoint, { params }),
    post: (endpoint, body) => makeRequest("post", endpoint, body),
    put: (endpoint, body) => makeRequest("put", endpoint, body),
    delete: (endpoint) => makeRequest("delete", endpoint),
  };
};

// const { data, error, loading, get, post, put, delete: deleteMethod } = useApi("http://10.236.35.193:8080");

// useEffect(() => {
//   get('/details')
//  }, []);

// useEffect(() => {
//  post('/details', newDetails)
// }, []);

// useEffect(() => {
//  put('/details/123', updateDetails)
// }, []);

// useEffect(() => {
//  deleteMethod('/details/123')
// }, []);

export default useApi;
