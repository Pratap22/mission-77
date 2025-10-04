'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Users, Plus, Edit, Trash2, X, ChevronDown, Search } from 'lucide-react';
import { District } from '../data/nepal-districts';
import { useSearchParams } from 'next/navigation';

export interface Itinerary {
  id: string;
  district: string;
  date: string;
  description: string;
  spots: string[];
  participants: number;
  maxParticipants?: number;
  contactInfo?: string;
}

interface ItineraryManagerProps {
  districts: District[];
  coveredDistricts: string[];
  itineraries: Itinerary[];
  onAddItinerary: (itinerary: Omit<Itinerary, 'id'>) => void;
  onUpdateItinerary: (id: string, itinerary: Partial<Itinerary>) => void;
  onDeleteItinerary: (id: string) => void;
}

export default function ItineraryManager({ 
  districts,
  coveredDistricts,
  itineraries, 
  onAddItinerary, 
  onUpdateItinerary, 
  onDeleteItinerary 
}: ItineraryManagerProps) {
  const searchParams = useSearchParams();
  const showAddButton = searchParams.get('patanahi') !== null;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    district: '',
    date: '',
    description: '',
    spots: [] as string[],
    maxParticipants: 10,
    contactInfo: ''
  });
  const [newSpot, setNewSpot] = useState('');

  // Filter districts for dropdown
  const availableDistricts = districts.filter(district => !coveredDistricts.includes(district.id));
  const filteredDistricts = availableDistricts.filter(district =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    district.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDistrictSelect = (districtName: string) => {
    setFormData(prev => ({ ...prev, district: districtName }));
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateItinerary(editingId, formData);
      setEditingId(null);
    } else {
      onAddItinerary({
        ...formData,
        participants: 0
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      district: '',
      date: '',
      description: '',
      spots: [],
      maxParticipants: 10,
      contactInfo: ''
    });
    setNewSpot('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (itinerary: Itinerary) => {
    setFormData({
      district: itinerary.district,
      date: itinerary.date,
      description: itinerary.description,
      spots: itinerary.spots,
      maxParticipants: itinerary.maxParticipants || 10,
      contactInfo: itinerary.contactInfo || ''
    });
    setEditingId(itinerary.id);
    setIsAdding(true);
  };

  const addSpot = () => {
    if (newSpot.trim() && !formData.spots.includes(newSpot.trim())) {
      setFormData(prev => ({
        ...prev,
        spots: [...prev.spots, newSpot.trim()]
      }));
      setNewSpot('');
    }
  };

  const removeSpot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      spots: prev.spots.filter((_, i) => i !== index)
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-400" />
          Upcoming Adventures
        </h3>
        {showAddButton && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-blue-800 flex items-center shadow-lg font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Itinerary
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="mb-6 p-4 bg-gray-600 rounded-lg border border-gray-500">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  District
                </label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-left flex items-center justify-between"
                  >
                    <span className={formData.district ? 'text-white' : 'text-gray-400'}>
                      {formData.district || 'Select a district'}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-500 rounded-md shadow-lg max-h-60 overflow-hidden">
                      <div className="p-2 border-b border-gray-500">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search districts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredDistricts.length > 0 ? (
                          filteredDistricts.map((district) => (
                            <button
                              key={district.id}
                              type="button"
                              onClick={() => handleDistrictSelect(district.name)}
                              className="w-full px-3 py-2 text-left text-white hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                            >
                              <div className="font-medium">{district.name}</div>
                              <div className="text-sm text-gray-400">{district.province}</div>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-gray-400 text-center">
                            No districts found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Description
              </label>
              <textarea
                required
                className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Places to Visit
              </label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                      placeholder="Add a place..."
                      value={newSpot}
                      onChange={(e) => setNewSpot(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpot())}
                    />
                  <button
                    type="button"
                    onClick={addSpot}
                    className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                {formData.spots.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.spots.map((spot, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center"
                      >
                        {spot}
                        <button
                          type="button"
                          onClick={() => removeSpot(index)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Max Participants
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Contact Info
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Email or phone"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {editingId ? 'Update' : 'Add'} Itinerary
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Itineraries List */}
      <div className="space-y-4">
        {itineraries.length === 0 ? (
          <p className="text-gray-300 text-center py-8">No upcoming adventures planned yet.</p>
        ) : (
          itineraries.map((itinerary) => (
            <div key={itinerary.id} className="bg-gray-600 border border-gray-500 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <h4 className="font-semibold text-white">{itinerary.district}</h4>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2 text-sm text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(itinerary.date).toLocaleDateString()}</span>
                  </div>

                  <p className="text-sm text-gray-200 mb-3">{itinerary.description}</p>

                  {itinerary.spots.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-200 mb-1">Places to Visit:</h5>
                      <div className="flex flex-wrap gap-1">
                        {itinerary.spots.map((spot, index) => (
                          <span
                            key={index}
                            className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                          >
                            {spot}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{itinerary.participants}/{itinerary.maxParticipants} participants</span>
                    </div>
                    {itinerary.contactInfo && (
                      <span>Contact: {itinerary.contactInfo}</span>
                    )}
                  </div>
                </div>

                {showAddButton && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(itinerary)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteItinerary(itinerary.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
