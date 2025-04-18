"use client";
import React, { useState } from "react";
import AnimatedInput from "../Custom/AnimatedInput";
import { Business, Location } from "@/types/business-finder";
import { fetchBusinesses } from "@/services/busineesService";
import { getCoordinatesFromLocation } from "@/services/getCordinate";
import BusinessCard from "../BusinessCard";
import dynamic from "next/dynamic";

const SearchComponent = () => {
  const [city, setCity] = useState<string>("Ankara");
  const [sector, setSector] = useState<string>("");
  const [range, setRange] = useState<number>(27);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const MapComponent = dynamic(() => import("./MapComponent"), {
    ssr: false,
  });

  const [location, setLocation] = useState<Location>({
    lat: 39.9334,
    lng: 32.8597,
  });

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSector(e.target.value);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(parseFloat(e.target.value));
  };

  const handleSearch = async () => {
    setIsSearching(true);

    try {
      const coords = await getCoordinatesFromLocation(city);
      if (!coords) return alert("Location not found!");

      setLocation({
        lat: coords.lat,
        lng: coords.lng,
      });

      const fetchedBusinesses = await fetchBusinesses(
        { lat: coords.lat, lng: coords.lng },
        range,
        sector
      );
      setBusinesses(fetchedBusinesses);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className=" ">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="container flex flex-col gap-6 px-5 py-7 w-full md:w-4/12 bg-white rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold">Search Criteria</h4>
          <AnimatedInput
            label="City"
            placeholder="Enter city"
            type="text"
            value={city}
            onChange={handleLocationChange}
            inputClassName="w-full"
          />

          <div className="relative">
            <AnimatedInput
              label="Sector"
              placeholder="Select sector"
              type="text"
              value={sector}
              onChange={handleSectorChange}
              inputClassName="w-full"
            />
            {sector && (
              <button
                onClick={() => setSector("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Range: {range} km
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={range}
              onChange={handleRangeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 km</span>
              <span>100 km</span>
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={isSearching}
            className={`mt-4 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              isSearching
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isSearching ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>

        <div className="flex-1 h-[500px] md:h-auto rounded-lg overflow-hidden">
          <MapComponent
            center={location}
            radius={range}
            businesses={businesses}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        {businesses.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
