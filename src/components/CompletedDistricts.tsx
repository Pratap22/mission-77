'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import { District } from '../data/nepal-districts';

interface CompletedDistrictsProps {
  districts: District[];
  coveredDistricts: string[];
}

export default function CompletedDistricts({ districts, coveredDistricts }: CompletedDistrictsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get completed districts
  const completedDistricts = districts.filter(district => 
    coveredDistricts.includes(district.id)
  );

  // Group by province
  const districtsByProvince = completedDistricts.reduce((acc, district) => {
    if (!acc[district.province]) {
      acc[district.province] = [];
    }
    acc[district.province].push(district);
    return acc;
  }, {} as Record<string, District[]>);

  // Sort districts within each province by name
  Object.keys(districtsByProvince).forEach(province => {
    districtsByProvince[province].sort((a, b) => a.name.localeCompare(b.name));
  });

  // Sort provinces by number of districts (descending)
  const sortedProvinces = Object.keys(districtsByProvince).sort((a, b) => 
    districtsByProvince[b].length - districtsByProvince[a].length
  );

  if (completedDistricts.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-white flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
          Completed Districts ({completedDistricts.length})
        </h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
          {sortedProvinces.map((province) => (
            <div key={province} className="border-b border-gray-600 pb-3 last:border-b-0">
              <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {province} Province ({districtsByProvince[province].length})
              </h4>
              <div className="grid grid-cols-1 gap-2 ml-5">
                {districtsByProvince[province].map((district) => (
                  <div
                    key={district.id}
                    className="flex items-center justify-between text-sm bg-gray-600 rounded-md p-2 hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-white font-medium">{district.name}</span>
                    {district.dateVisited && (
                      <span className="text-gray-400 text-xs flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(district.dateVisited).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
