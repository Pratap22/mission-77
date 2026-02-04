'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEffect } from 'react';
import Link from 'next/link';
import { District } from '../data/nepal-districts';
import { useSearchParams } from 'next/navigation';
import 'leaflet/dist/leaflet.css';

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
  const searchParams = useSearchParams();
  const canModify = searchParams.get('patanahi') !== null;

  // Create custom icons with larger size for better visibility
  const coveredIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="35" height="55" viewBox="0 0 35 55" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 0C7.8 0 0 7.8 0 17.5c0 17.5 17.5 37.5 17.5 37.5s17.5-20 17.5-37.5C35 7.8 27.2 0 17.5 0z" fill="#22c55e"/>
        <circle cx="17.5" cy="17.5" r="8" fill="white"/>
        <path d="M13.5 17.5l3 3 6-6" stroke="#22c55e" stroke-width="3" fill="none"/>
      </svg>
    `),
    iconSize: [35, 55],
    iconAnchor: [17, 55],
    popupAnchor: [1, -50],
  });

  const uncoveredIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="35" height="55" viewBox="0 0 35 55" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 0C7.8 0 0 7.8 0 17.5c0 17.5 17.5 37.5 17.5 37.5s17.5-20 17.5-37.5C35 7.8 27.2 0 17.5 0z" fill="#ef4444"/>
        <circle cx="17.5" cy="17.5" r="8" fill="white"/>
        <text x="17.5" y="22" text-anchor="middle" font-size="12" fill="#ef4444">?</text>
      </svg>
    `),
    iconSize: [35, 55],
    iconAnchor: [17, 55],
    popupAnchor: [1, -50],
  });

  const handleDistrictClick = (district: District) => {
    if (canModify) {
      onDistrictClick(district);
    }
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
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-lg">{district.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{district.province} Province</p>
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${district.covered ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">
                    {district.covered ? 'Covered' : 'Not Covered'}
                  </span>
                </div>
                <p className="text-xs text-blue-600 font-medium mb-1">
                  {canModify 
                    && `Click to ${district.covered ? 'unmark' : 'mark'} as covered`
                  }
                </p>
                {district.covered && district.dateVisited && (
                  <p className="text-xs text-gray-500 mt-1">
                    Visited: {district.dateVisited}
                  </p>
                )}
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <Link 
                    href="/blog"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium block"
                  >
                    📖 View Travel Stories →
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
