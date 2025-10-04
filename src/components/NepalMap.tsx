'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEffect } from 'react';
import { District } from '../data/nepal-districts';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';

// Fix for default markers in React-Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface NepalMapProps {
  districts: District[];
  onDistrictClick: (district: District) => void;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 7);
  }, [map, center]);

  return null;
}

export default function NepalMap({ districts, onDistrictClick }: NepalMapProps) {
  // Create custom icons with smaller size for mobile optimization
  const coveredIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="20" height="32" viewBox="0 0 20 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.5 0 0 4.5 0 10c0 10 10 22 10 22s10-12 10-22C20 4.5 15.5 0 10 0z" fill="#22c55e"/>
        <circle cx="10" cy="10" r="5" fill="white"/>
        <path d="M7.5 10l1.5 1.5 3-3" stroke="#22c55e" stroke-width="1.5" fill="none"/>
      </svg>
    `),
    iconSize: [20, 32],
    iconAnchor: [10, 32],
    popupAnchor: [1, -28],
  });

  const uncoveredIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="20" height="32" viewBox="0 0 20 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.5 0 0 4.5 0 10c0 10 10 22 10 22s10-12 10-22C20 4.5 15.5 0 10 0z" fill="#ef4444"/>
        <circle cx="10" cy="10" r="5" fill="white"/>
        <text x="10" y="13" text-anchor="middle" font-size="6" fill="#ef4444">?</text>
      </svg>
    `),
    iconSize: [20, 32],
    iconAnchor: [10, 32],
    popupAnchor: [1, -28],
  });

  const handleDistrictClick = (district: District) => {
    onDistrictClick(district);
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[28.3949, 84.1240]} // Center of Nepal
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        className=""
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        dragging={true}
      >
        <MapController center={[28.3949, 84.1240]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MarkerClusterGroup
          chunkedLoading
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
          maxClusterRadius={50}
          disableClusteringAtZoom={12}
        >
          {districts.map((district) => (
          <Marker
            key={district.id}
            position={[district.coordinates[1], district.coordinates[0]]} // Convert [lng, lat] to [lat, lng]
            icon={district.covered ? coveredIcon : uncoveredIcon}
            eventHandlers={{
              click: () => handleDistrictClick(district),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg">{district.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{district.province} Province</p>
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${district.covered ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">
                    {district.covered ? 'Covered' : 'Not Covered'}
                  </span>
                </div>
                <p className="text-xs text-blue-600 font-medium mb-1">
                  Click to {district.covered ? 'unmark' : 'mark'} as covered
                </p>
                {district.covered && district.dateVisited && (
                  <p className="text-xs text-gray-500 mt-1">
                    Visited: {district.dateVisited}
                  </p>
                )}
                {/* <button
                  className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  onClick={() => handleDistrictClick(district)}
                >
                  {district.covered ? 'View Details' : 'Mark as Covered'}
                </button> */}
              </div>
            </Popup>
          </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
