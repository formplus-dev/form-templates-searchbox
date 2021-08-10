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

    if (!url) {
      dispatch({
        type: "FETCHED",
        payload: DUMMY_DATA,
      });
      return;
    };

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

const DUMMY_DATA = [
  {
      "category": [
          "Health", 
          "E-commerce", 
          "Education"
      ], 
      "created": "2021-08-10T10:44:12.730880", 
      "description": "consectetur ullamco culpa commodo veniam,", 
      "link": "https://formpl.us/templates", 
      "name": "fugiat aliqua. occaecat"
  }, 
  {
      "category": [
          "Health", 
          "Education"
      ], 
      "created": "2021-08-10T10:44:12.382082", 
      "description": "fugiat velit proident, cupidatat tempor", 
      "link": "https://formpl.us/templates", 
      "name": "minim nulla"
  }, 
  {
      "category": [
          "Health", 
          "E-commerce", 
          "Education"
      ], 
      "created": "2021-08-10T10:44:12.938170", 
      "description": "incididunt Lorem mollit cillum nulla", 
      "link": "https://formpl.us/templates", 
      "name": "aliqua. minim commodo"
  }, 
  {
      "category": [
          "Health", 
          "E-commerce", 
          "Education"
      ], 
      "created": "2021-08-10T10:44:12.757134", 
      "description": "veniam, laborum. cupidatat irure cillum", 
      "link": "https://formpl.us/templates", 
      "name": "magna elit, commodo"
  }, 
  {
      "category": [
          "Health", 
          "E-commerce", 
          "Education"
      ], 
      "created": "2021-08-10T10:44:12.708762", 
      "description": "culpa laborum. deserunt consectetur commodo", 
      "link": "https://formpl.us/templates", 
      "name": "aliqua. amet, voluptate"
  },
]

export { useFetch };
