async function getImage(path, apiToken, callback) {
  console.log("CALLED", path);
  const API = "https://api.liste-gravity.fr/";

  let options = {
    method: "GET",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + apiToken,
    },
  };

  const res = await fetch(API + "static/image/" + path, options);
  const imageBlob = await res.blob();
  const imageObjectURL = URL.createObjectURL(imageBlob);

  callback(imageObjectURL);
}

export default getImage;
