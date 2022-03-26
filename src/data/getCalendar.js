import React from "react";
import useFetch from "./useFetch";
function getCalendar(props) {
  const [request, newRequest] = useFetch();

  // newRequest();
  const fakeEventList = [
    {
      id: 0,
      name: "Distribution de crêpes",
      where: "Mardi 13h30 à NDL",
      imageUrl:
        "https://img.cuisineaz.com/660x660/2015/01/29/i113699-photo-de-crepe-facile.jpeg",
    },
    {
      id: 1,
      name: "Chateau gonflables",
      where: "Mercredi à NDL",
      imageUrl:
        "https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2020/04/29/node_746530/46890704/public/2020/04/29/B9723329275Z.1_20200429122506_000%2BGDUFUH1P3.1-0.jpg?itok=3XoSM_XN1588708778",
    },
    {
      id: 2,
      name: "Soirée GRAVITY",
      where: "Jeudi 22h là bas",
      imageUrl:
        "https://img.20mn.fr/FOC2G1cgQ9eZa6gvB6rN2Ck/960x614_nantes-warehouse-organise-derniere-soiree-mercredi.jpg",
    },
    {
      id: 3,
      name: "Débat présidentiel",
      where: "vendredi 13h30 à NDL",
      imageUrl:
        "https://img.huffingtonpost.com/asset/5c9324852400003200053c0d.jpeg?ops=scalefit_630_noupscale",
    },
  ];
  return fakeEventList;
}

export default getCalendar;
