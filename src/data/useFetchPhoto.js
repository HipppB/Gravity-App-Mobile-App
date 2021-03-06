import React, { useState, useEffect } from "react";
import { Platform } from "react-native";

function useFetchPhoto() {
  const [data, setData] = useState(null);
  async function newRequest(file, apiToken) {
    try {
      setData({ status: "Loading", content: null });
      const API = "https://api.liste-gravity.fr/static/upload";
      let options = {
        method: "POST",
        headers: {
          Accept: "multipart/form-data",

          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + apiToken,
        },
      };
      let formdata = new FormData();
      if (Platform.OS === "ios") {
        formdata.append("image", {
          type: "image/jpg",
          name: "image.png",
          uri: file.replace("file://", ""),
        });
      } else {
        formdata.append("image", {
          type: "image/jpg",
          name: "image.png",
          uri: file,
        });
      }
      console.info(formdata);
      options.body = formdata;
      const response = await fetch(API, options);

      const json = await response.json();
      console.log("HEY NEW RESULT PHOTO ", json);

      setData({ status: "Done", content: json });
      return { status: "Done", content: json };
    } catch (e) {
      console.warn(e);
      setData({ status: "Error", content: e });
      return { status: "Error", content: e };
    }
  }

  return [data, newRequest];
}

export default useFetchPhoto;
