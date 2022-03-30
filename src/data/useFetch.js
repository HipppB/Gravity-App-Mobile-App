import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);

  async function newRequest(endPoint, method, content, apiToken) {
    setData({ status: "Loading", content: null });
    console.log("HEY NEW REQUEST ", content + " -> " + JSON.stringify(content));
    const API = "https://api.liste-gravity.fr/";
    let options = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + apiToken,
      },
    };
    if (method !== "GET") {
      options.body = JSON.stringify(content);
    }

    console.info(API + endPoint, options);
    try {
      const response = await fetch(API + endPoint, options);

      const json = await response.json();
      console.log("HEY NEW RESULT FETCH", endPoint, "->", data);

      if (json?.statusCode === 401) {
        setData({ status: "Unauthorized", content: json });
      }
      setData({ status: "Done", content: json });

      return { status: "Done", content: json };
    } catch (e) {
      console.warn(e);
      setData({ status: "Error", content: e });

      return { status: "Error", content: e };
    }
  }

  return [data, newRequest];
};

export default useFetch;
