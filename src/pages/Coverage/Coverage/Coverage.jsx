import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const mapRef = useRef();
  const position = [23.685, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value.trim();

    if (!location) {
      toast.error("Please enter a district name");
      return;
    }

    // find district
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (!district) {
      toast.error("District not found!");
      return;
    }

    const coordinate = [district.latitude, district.longitude];

    // fly smoothly to district
    mapRef.current.flyTo(coordinate, 10, {
      animate: true,
      duration: 1.8,
    });

    toast.success(`Showing results for ${district.district}`);
  };

  return (
    <div className="my-12 px-4 md:px-10 max-w-6xl mx-auto">
      <Toaster />

      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-6">
        We are available in all 64 districts
      </h2>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSearch} className="w-full md:w-1/2">
          <label className=" input-bordered flex items-center gap-3 rounded-xl shadow-sm  px-4">
            <svg
              className="h-[1.2em] opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              type="search"
              className="grow 
              focus:outline-0 focus:border-b-2 focus:border-secondary"
              name="location"
              placeholder="Search district…"
            />

            <button className="btn btn-secondary text-white rounded-lg px-4 -mr-3">
              Search
            </button>
          </label>
        </form>
      </div>

      {/* Map */}
      <div className="w-full h-[400px] md:h-[600px] rounded-xl shadow-lg border overflow-hidden">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full"
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <span className="font-semibold text-lg">{center.district}</span>
                <br />
                <span className="text-sm text-gray-700">
                  Service Area: {center.covered_area.join(", ")}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
