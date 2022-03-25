import { useState, useEffect } from "react";
import { useAuthentification } from "../Context/AuthContext";

const useFetch = () => {
  const [data, setData] = useState(null);

  async function newRequest(endPoint, method, content, apiToken) {
    console.log(content + " -> " + JSON.stringify(content));
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

    setData({ status: "Loading", content: null });
    console.info(API + endPoint, options);
    const response = await fetch(API + endPoint, options);

    const json = await response.json();
    setData({ status: "Done", content: json });
    return { status: "Done", content: json };
  }

  return [data, newRequest];
};

export default useFetch;
