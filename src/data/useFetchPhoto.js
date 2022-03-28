import { useState, useEffect } from "react";
import { useAuthentification } from "../Context/AuthContext";
import { Platform } from "react-native";

const useFetchPhoto = () => {
  const [data, setData] = useState(null);
  // const { apiToken } = useAuthentification();

  async function newRequest(file, apiToken) {
    setData({ status: "Loading", content: null });
    const API = "https://api.liste-gravity.fr/static/upload";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; ",
        Authorization: "Bearer " + apiToken,
      },
    };
    let formdata = new FormData();
    console.log("file", file.replace("file://", ""));
    if (Platform.OS === "ios") {
      formdata.append("image", {
        type: "image/jpg",
        name: "image.png",
        uri: file.replace("file://", ""),
      });
    } else {
      formdata.append("image", file);
    }
    options.body = formdata;
    console.info(API, options);
    const response = await fetch(API, options);

    const json = await response.json();
    console.log("HEY NEW RESULT PHOTO ", json);

    setData({ status: "Done", content: json });
    return { status: "Done", content: json };
  }

  return [data, newRequest];
};

export default useFetchPhoto;
