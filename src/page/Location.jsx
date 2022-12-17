import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capitalize, removeChar } from "../utils/utils";

import Layout from "../components/Layout";

const Location = () => {
  const [location, setLocation] = useState([]);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location-area").then((res) => {
      res.json().then((data) => setLocation(data.results));
    });
  }, []);

  useEffect(() => {
    const promises = location.map((item) => {
      return fetch(item.url).then((res) => res.json());
    });
    Promise.all(promises).then((data) => setLocationData(data));
  }, [location]);

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4 gap-y-8">
        {locationData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-slate-200/10 backdrop-blur-xl border border-solid border-white p-4 rounded-lg h-32 justify-between transition duration-200 ease-in-out hover:bg-slate-50/80"
          >
            {/* <span>{item.id}</span> */}
            <Link
              to={`/location/${item.id}`}
              className="text-xl font-semibold hover:text-blue-600"
            >
              {capitalize(removeChar(item.name, "-"))}
            </Link>
            <Link
              to={`/location/${item.id}`}
              className="text-blue-600 w-fit hover:underline"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Location;
