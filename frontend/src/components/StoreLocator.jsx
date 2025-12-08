import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React/Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map center changes
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
};

const StoreLocator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-33.8688, 151.2093]); // Sydney default
  const [mapZoom, setMapZoom] = useState(11);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Delay map load animation
    setTimeout(() => setMapLoaded(true), 500);
  }, []);

  // Location data with coordinates
  const shoppingLocations = {
    sa: [
      {
        name: "City Cross, Rundle Mall (Near the food court)",
        lat: -34.9232,
        lng: 138.6006,
        address: "City Cross, Rundle Mall, Adelaide SA 5000"
      },
      {
        name: "Brickworks Marketplace (In front of Woolworths)",
        lat: -34.9444,
        lng: 138.6006,
        address: "Brickworks Marketplace, Torrensville SA 5031"
      },
    ],
    nsw: [
      {
        name: "UTS (BUILDING 5 COURTARD)",
        lat: -33.8832,
        lng: 151.2016,
        address: "UTS Building 5, Ultimo NSW 2007"
      },
      {
        name: "Westfield Eastgardens (Level 3, lift outside Hoyts)",
        lat: -33.9394,
        lng: 151.2306,
        address: "Westfield Eastgardens, Eastgardens NSW 2036"
      },
      {
        name: "Westfield Hornsby (Level 3, opposite NRMA / Chemist Warehouse)",
        lat: -33.7025,
        lng: 151.0994,
        address: "Westfield Hornsby, Hornsby NSW 2077"
      },
      {
        name: "Westfield Parramatta (Level 1 lift lobby, near Medibank)",
        lat: -33.8167,
        lng: 151.0000,
        address: "Westfield Parramatta, Parramatta NSW 2150"
      },
      {
        name: "Westfield Sydney (QVBNext to the reception)",
        lat: -33.8688,
        lng: 151.2093,
        address: "Westfield Sydney, Sydney NSW 2000"
      },
      {
        name: "Westfield Warringah (Level 2 & Behind McDonald's)",
        lat: -33.7833,
        lng: 151.2667,
        address: "Westfield Warringah, Brookvale NSW 2100"
      },
      {
        name: "Wwestfield Miranda (Foot Locker & Cotton On)",
        lat: -34.0333,
        lng: 151.1000,
        address: "Westfield Miranda, Miranda NSW 2228"
      },
      {
        name: "Castle Towers (Station tunnel, near McDonald's)",
        lat: -33.7333,
        lng: 151.0000,
        address: "Castle Towers, Castle Hill NSW 2154"
      },
      {
        name: "Westpoint Blacktown (at G floor food core)",
        lat: -33.7667,
        lng: 150.9167,
        address: "Westpoint Blacktown, Blacktown NSW 2148"
      },
      {
        name: "Tramsheds (On the top floor)",
        lat: -33.8833,
        lng: 151.1833,
        address: "Tramsheds, Forest Lodge NSW 2037"
      },
      {
        name: "Balgowlah Village Centre (B1 to Ground Floor)",
        lat: -33.8000,
        lng: 151.2667,
        address: "Balgowlah Village Centre, Balgowlah NSW 2093"
      },
      {
        name: "Pemulwuy Marketplace (At Woolworths entrance)",
        lat: -33.8167,
        lng: 150.9167,
        address: "Pemulwuy Marketplace, Pemulwuy NSW 2145"
      },
      {
        name: "Forestway Shopping Centre",
        lat: -33.7333,
        lng: 151.1833,
        address: "Forestway Shopping Centre, Frenchs Forest NSW 2086"
      },
      {
        name: "Stanhope Village (Near the food court)",
        lat: -33.7333,
        lng: 150.9167,
        address: "Stanhope Village, Stanhope Gardens NSW 2768"
      },
      {
        name: "Emerton Village (At Woolworths entrance)",
        lat: -33.7500,
        lng: 150.8500,
        address: "Emerton Village, Emerton NSW 2770"
      },
      {
        name: "Ed.Square Shopping Centre (B1 parking to G Floor)",
        lat: -33.8833,
        lng: 150.8833,
        address: "Ed.Square Shopping Centre, Edmondson Park NSW 2174"
      },
    ],
  };

  // Handle location click
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setMapZoom(16);
  };

  // Get all visible locations based on selected state
  const getVisibleLocations = () => {
    if (selectedState === "sa") {
      return shoppingLocations.sa;
    } else if (selectedState === "nsw") {
      return shoppingLocations.nsw;
    }
    return [...shoppingLocations.sa, ...shoppingLocations.nsw];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className={`text-center mb-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}>
        <h1 className="text-3xl md:text-5xl font-bold text-[#0a214f] mb-4">
          Alien Snail Locations
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#0a214f] to-transparent mx-auto mb-4 animate-pulse"></div>
        <p className="text-lg md:text-xl text-gray-600">
          Phone Case Vending in NSW & SA
        </p>
      </div>

      {/* State Selection Buttons */}
      <div className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-700 delay-100 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <button
          onClick={() => setSelectedState(selectedState === "sa" ? null : "sa")}
          className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden group ${
            selectedState === "sa"
              ? "bg-[#0a214f] text-white border-2 border-[#0a214f]"
              : "bg-white text-[#0a214f] border-2 border-blue-200 hover:border-[#0a214f]"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <div className="flex items-center gap-3 relative z-10">
            <span className="transition-transform duration-300 group-hover:scale-110 inline-block">Adelaide, SA</span>
            <span className={`text-sm px-2 py-1 rounded-full transition-all duration-300 ${
              selectedState === "sa" ? "bg-white/20" : "bg-blue-100 group-hover:bg-blue-200"
            }`}>
              {shoppingLocations.sa.length}
            </span>
          </div>
        </button>

        <button
          onClick={() => setSelectedState(selectedState === "nsw" ? null : "nsw")}
          className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden group ${
            selectedState === "nsw"
              ? "bg-[#0a214f] text-white border-2 border-[#0a214f]"
              : "bg-white text-[#0a214f] border-2 border-blue-200 hover:border-[#0a214f]"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <div className="flex items-center gap-3 relative z-10">
            <span className="transition-transform duration-300 group-hover:scale-110 inline-block">Sydney, NSW</span>
            <span className={`text-sm px-2 py-1 rounded-full transition-all duration-300 ${
              selectedState === "nsw" ? "bg-white/20" : "bg-blue-100 group-hover:bg-blue-200"
            }`}>
              {shoppingLocations.nsw.length}
            </span>
          </div>
        </button>
      </div>

      {/* Main Content: Locations List and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Locations List */}
        <div className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
        style={{ transitionDelay: "200ms" }}
        >
          <div className="bg-blue-50 rounded-xl shadow-lg p-6 border-2 border-blue-200 h-full transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-blue-300">
              <div className="w-12 h-12 rounded-full bg-[#0a214f] flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 hover:rotate-12">
                <svg className="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-[#0a214f] transition-all duration-300">
                  {selectedState === "sa" ? "Adelaide, SA" : selectedState === "nsw" ? "Sydney, NSW" : "All Locations"}
                </h2>
                <p className="text-sm text-gray-600 mt-1 transition-all duration-300">{getVisibleLocations().length} locations available</p>
              </div>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {getVisibleLocations().map((location, idx) => {
                const isSelected = selectedLocation?.name === location.name;
                
                return (
                  <div
                    key={idx}
                    onClick={() => handleLocationClick(location)}
                    className={`group flex items-start gap-3 p-4 bg-white rounded-lg border-2 cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                      isSelected
                        ? "border-[#0a214f] shadow-lg bg-blue-50 scale-[1.02] animate-pulse"
                        : "border-blue-200 hover:border-[#0a214f]"
                    }`}
                    style={{ 
                      animationDelay: `${idx * 50}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ease-out ${idx * 50}ms`
                    }}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
                      isSelected 
                        ? "bg-[#0a214f] scale-125 ring-2 ring-[#0a214f] ring-offset-2" 
                        : "bg-[#0a214f] group-hover:scale-110 group-hover:rotate-12"
                    }`}>
                      <svg className={`w-4 h-4 text-white transition-transform duration-300 ${
                        isSelected ? "scale-110" : "group-hover:scale-110"
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm md:text-base transition-all duration-300 ${
                        isSelected
                          ? "text-[#0a214f] font-semibold"
                          : "text-gray-700 group-hover:text-[#0a214f] group-hover:font-medium"
                      }`}>
                        {location.name}
                      </p>
                      <p className={`text-xs mt-1 transition-all duration-300 ${
                        isSelected ? "text-gray-600" : "text-gray-500 group-hover:text-gray-600"
                      }`}>{location.address}</p>
                    </div>
                    {isSelected && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-[#0a214f] rounded-full animate-ping"></div>
                        <div className="w-2 h-2 bg-[#0a214f] rounded-full -mt-2"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leaflet Map */}
        <div className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"
        }`}
        style={{ transitionDelay: "300ms" }}
        >
          <div className={`bg-white rounded-xl shadow-lg border-2 border-blue-200 h-full overflow-hidden transition-all duration-500 ${
            mapLoaded ? "shadow-xl" : ""
          }`}>
            <div className="p-4 border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white transition-all duration-300 hover:from-blue-100">
              <h3 className="text-lg font-bold text-[#0a214f] flex items-center gap-2 transition-all duration-300">
                <svg className="w-5 h-5 transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="transition-all duration-300">Interactive Map</span>
              </h3>
            </div>
            <div className={`w-full h-[600px] rounded-b-xl relative z-0 transition-all duration-500 ${
              mapLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}>
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
                scrollWheelZoom={true}
              >
                <MapController center={mapCenter} zoom={mapZoom} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {getVisibleLocations().map((location, idx) => {
                  const isSelected = selectedLocation?.name === location.name;
                  return (
                    <Marker
                      key={idx}
                      position={[location.lat, location.lng]}
                      eventHandlers={{
                        click: () => handleLocationClick(location),
                        mouseover: (e) => {
                          e.target.openPopup();
                        },
                      }}
                    >
                      <Popup className="transition-all duration-300">
                        <div style={{ padding: "8px", minWidth: "200px" }}>
                          <h3 style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "#0a214f", fontSize: "16px" }}>
                            {location.name}
                          </h3>
                          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                            {location.address}
                          </p>
                          {isSelected && (
                            <div style={{ marginTop: "8px", padding: "4px 8px", background: "#0a214f", color: "white", borderRadius: "4px", fontSize: "12px", display: "inline-block" }}>
                              Selected
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className={`text-center transition-all duration-700 delay-400 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-blue-200 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 animate-pulse">
              <svg className="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 transition-all duration-300 hover:text-[#0a214f]">Find Us Near You</h3>
          </div>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto transition-all duration-300">
            Click on any location to see it on the map. Visit any of our vending machine locations to create your custom phone case in just 4-5 minutes. Simply scan the QR code, upload your image, and watch your personalized case come to life!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
