import React from "react";

function getSponsors(props) {
  const sponsorList = [
    {
      id: Math.random().toString(12).substring(0),
    },
    {
      id: Math.random().toString(12).substring(0),
    },
    {
      id: Math.random().toString(12).substring(0),
    },
    {
      id: Math.random().toString(12).substring(0),
    },
    {
      id: Math.random().toString(12).substring(0),
    },
    {
      id: Math.random().toString(12).substring(0),
    },
  ];
  return sponsorList;
}

export default getSponsors;
