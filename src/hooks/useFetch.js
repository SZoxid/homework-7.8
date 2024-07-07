import axios from "axios";
import { useState, useEffect } from "react";
import api from "../api/posts";

const useFetch = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(path, { cancelToken: source.token });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
        } else {
          console.error(error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchPosts, 2000);

    return () => {
      source.cancel("Fetch post cancelled by the user");
    };
  }, [path]);

  return { data, setData, loading, error };
};

export default useFetch;
