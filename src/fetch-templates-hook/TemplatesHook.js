import { useReducer, useRef, useEffect } from "react";

const useFetch = (url) => {
  const cache = useRef({});

  const initialState = {
    status: "idle",
    error: null,
    templates: [],
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return {
          ...initialState,
          status: "fetching",
        };
      case "FETCHED":
        return {
          ...initialState,
          status: "fetched",
          templates: action.payload,
        };
      case "FETCH_ERROR":
        return {
          ...initialState,
          status: "error",
          error: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;

    if (!url) return;

    const fetchTemplates = async () => {
      dispatch({
        type: "FETCHING",
      });
      if (cache.current[url]) {
        const templates = cache.current[url];
        dispatch({
          type: "FETCHED",
          payload: templates,
        });
      } else {
        try {
          const response = await fetch(url);
          const templates = await response.json();
          cache.current[url] = templates;
          if (cancelRequest) return;
          dispatch({
            type: "FETCHED",
            payload: templates,
          });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };
    fetchTemplates();

    return () => {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};

export { useFetch };
