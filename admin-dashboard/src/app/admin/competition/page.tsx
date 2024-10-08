"use client";
import React, { useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

// Define the Restaurant interface
interface Restaurant {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  additionalData: string;
  rating: number;
  strengths: string[];
  weaknesses: string[];
}

// Define the MapComponent functional component
const MapComponent: React.FC = () => {
  const defaultCenter = { lat: 19.1013665, lng: 72.8273958 }; // Example coordinates for San Francisco
  const defaultZoom = 15;

  // Define an array of restaurants
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Ettarra Coffee House",
      latitude: 19.1013665,
      longitude: 72.8273958,
      additionalData: "Some data for Restaurant 1",
      rating: 4.5,
      strengths: ["Strength 1", "Strength 2"],
      weaknesses: ["Weakness 1", "Weakness 2"],
    },
    {
      id: 2,
      name: "Love Latte Juhu",
      latitude: 19.1112055,
      longitude: 72.8241743,
      additionalData: "Some data for Restaurant 2",
      rating: 4.0,
      strengths: ["Strength 1", "Strength 2"],
      weaknesses: ["Weakness 1", "Weakness 2"],
    },
    {
      id: 2,
      name: "Ananda Cafe",
      latitude: 19.1057439,
      longitude: 72.8234257,
      additionalData: "Some data for Restaurant 3",
      rating: 4.0,
      strengths: ["Strength 1", "Strength 2"],
      weaknesses: ["Weakness 1", "Weakness 2"],
    }
    // Add other restaurants here
  ];

  // Define state to keep track of the selected restaurant
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  // Define state to control the display of the comparison panel
  const [showComparisonPanel, setShowComparisonPanel] = useState(false);

  // Function to handle the button click and show the comparison panel
  const handleComparisonButtonClick = () => {
    setShowComparisonPanel(true);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className="md:pl-64">
        <div style={{ height: "700px", width: "100%", position:"relative" }}>
          <Map zoom={defaultZoom} center={defaultCenter}>
            {restaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                position={{
                  lat: restaurant.latitude,
                  lng: restaurant.longitude,
                }}
                onClick={() => setSelectedRestaurant(restaurant)}
                clickable={true}
              />
            ))}

            {selectedRestaurant && (
              <InfoWindow
                position={{
                  lat: selectedRestaurant.latitude,
                  lng: selectedRestaurant.longitude,
                }}
                onClose={() => setSelectedRestaurant(null)}
              >
                <div className="p-4">
                  {/* Display only the name of the selected restaurant */}
                  <h3 className="font-bold text-lg">
                    {selectedRestaurant.name}
                  </h3>
                  {/* Add a button to open the comparison panel */}
                  <button
                    onClick={handleComparisonButtonClick}
                    className="mt-2 p-2 bg-blue-600 text-white rounded-sm"
                  >
                    View Comparison
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>

          {/* Glassmorphism comparison panel */}
          {showComparisonPanel && (
            <div className="glassmorphism absolute right-4 z-10 top-4 backdrop-blur-lg rounded-md overflow-hidden border border-gray-300">
              <div className="p-4 font-semibold text-blue-700">
                <h3 className="text-xl mb-2">
                  Comparison with {selectedRestaurant?.name}
                </h3>
                <div className="mb-2">
                  <span className="text-gray-900">Rating:</span>{" "}
                  {selectedRestaurant?.rating}
                </div>
                <div className="mb-2">
                  <span className="text-gray-900">Strengths:</span>{" "}
                  {selectedRestaurant?.strengths.join(", ")}
                </div>
                <div className="mb-2">
                  <span className="text-gray-900">Weaknesses:</span>{" "}
                  {selectedRestaurant?.weaknesses.join(", ")}
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
                  onClick={() => setShowComparisonPanel(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </APIProvider>
  );
};

// Export the MapComponent
export default MapComponent;
