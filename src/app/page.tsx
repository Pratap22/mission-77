'use client';

import { useState, useEffect } from 'react';
import { Users, Mountain, Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import ItineraryManager, { Itinerary } from '../components/ItineraryManager';
import { District } from '../data/nepal-districts';
import Logo from '../components/Logo';
import { 
  addItinerary, 
  updateItinerary, 
  deleteItinerary, 
  getItineraries,
  updateDistrictStatus,
  getDistrictStatuses
} from '../lib/firebaseService';

// Dynamically import NepalMap to avoid SSR issues with Leaflet
const NepalMap = dynamic(() => import('../components/NepalMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
});

export default function Home() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [coveredDistricts, setCoveredDistricts] = useState<string[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const totalDistricts = 77;
  const progressPercentage = (coveredDistricts.length / totalDistricts) * 100;

  // Load data from Firebase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load itineraries
        const firebaseItineraries = await getItineraries();
        setItineraries(firebaseItineraries);
        
        // Load district statuses
        const districtStatuses = await getDistrictStatuses();
        
        // Convert Firestore data to District objects
        const firebaseDistricts = Object.entries(districtStatuses).map(([id, data]) => ({
          id,
          name: data.name,
          province: data.province,
          coordinates: data.coordinates,
          covered: data.covered || false,
          dateVisited: data.dateVisited,
          highlights: data.highlights
        }));
        setDistricts(firebaseDistricts);
        setCoveredDistricts(firebaseDistricts.filter(d => d.covered).map(d => d.id));
        
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDistrictClick = async (district: District) => {
    try {
      // Toggle covered status
      const isCurrentlyCovered = coveredDistricts.includes(district.id);
      
      await updateDistrictStatus(district.id, {
        covered: !isCurrentlyCovered,
        dateVisited: !isCurrentlyCovered ? new Date().toISOString().split('T')[0] : undefined,
        highlights: !isCurrentlyCovered ? ['Visited'] : undefined
      });
      
      if (!isCurrentlyCovered) {
        setCoveredDistricts(prev => [...prev, district.id]);
      } else {
        setCoveredDistricts(prev => prev.filter(id => id !== district.id));
      }
    } catch (error) {
      console.error('Error updating district status:', error);
    }
  };


  const handleAddItinerary = async (itinerary: Omit<Itinerary, 'id'>) => {
    try {
      const id = await addItinerary(itinerary);
      const newItinerary: Itinerary = {
        ...itinerary,
        id
      };
      setItineraries(prev => [...prev, newItinerary]);
    } catch (error) {
      console.error('Error adding itinerary:', error);
    }
  };

  const handleUpdateItinerary = async (id: string, updates: Partial<Itinerary>) => {
    try {
      await updateItinerary(id, updates);
      setItineraries(prev => prev.map(itinerary => 
        itinerary.id === id ? { ...itinerary, ...updates } : itinerary
      ));
    } catch (error) {
      console.error('Error updating itinerary:', error);
    }
  };

  const handleDeleteItinerary = async (id: string) => {
    try {
      await deleteItinerary(id);
      setItineraries(prev => prev.filter(itinerary => itinerary.id !== id));
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Logo size={96} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Mission 77</h2>
          <p className="text-gray-300 mb-4">Loading your adventure...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-900">
      {/* Map Section - 70% width on tablet and desktop */}
      <div className="w-full md:w-[70%] relative">
        <NepalMap 
          districts={districts}
          onDistrictClick={handleDistrictClick}
        />
        
        {/* Mobile Header */}
        <header className="md:hidden absolute top-4 left-4 right-4 z-20">
          <div className="bg-gray-800/95 backdrop-blur-sm shadow-lg rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size={48} />
              <div>
                <h1 className="text-xl font-bold text-white">Mission 77</h1>
                <p className="text-xs text-gray-300">#77DistrictsOfNepal</p>
              </div>
            </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{coveredDistricts.length}/77</div>
                <div className="text-lg font-semibold text-blue-400">{progressPercentage.toFixed(1)}%</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Sidebar Section - 30% width on tablet and desktop */}
      <div className="hidden md:flex md:w-[30%] flex-col bg-gray-800 border-l border-gray-700">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 right-4 z-30 bg-gray-800/95 backdrop-blur-sm shadow-lg rounded-lg p-2 hover:bg-gray-700 transition-colors md:hidden border border-gray-700"
        >
          {sidebarOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </button>

        {/* Desktop Sidebar */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Mission 77 Header */}
          <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Logo size={58} />
              <div>
                <h1 className="text-2xl font-bold text-white">Mission 77</h1>
                <p className="text-sm text-gray-300">#77DistrictsOfNepal</p>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-white mb-1">{coveredDistricts.length}/77</div>
              <div className="text-2xl font-semibold text-blue-400 mb-2">{progressPercentage.toFixed(1)}%</div>
              <div className="text-sm text-gray-300">Districts Covered</div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Progress</span>
                <span className="text-sm font-medium text-gray-300">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          {/* Itinerary Manager */}
          <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600 p-6">
            <ItineraryManager
              districts={districts}
              coveredDistricts={coveredDistricts}
              itineraries={itineraries}
              onAddItinerary={handleAddItinerary}
              onUpdateItinerary={handleUpdateItinerary}
              onDeleteItinerary={handleDeleteItinerary}
            />
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Mountain className="h-5 w-5 mr-2 text-green-400" />
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Districts Covered</span>
                <span className="font-semibold text-white">{coveredDistricts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Remaining</span>
                <span className="font-semibold text-white">{totalDistricts - coveredDistricts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Progress</span>
                <span className="font-semibold text-white">{progressPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Join Community */}
          <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-lg shadow-sm p-6 text-white border border-gray-600">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Join the Journey
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Connect with fellow adventurers and join upcoming expeditions to explore Nepal&apos;s beautiful districts.
            </p>
            <button 
              onClick={() => window.open('https://chat.whatsapp.com/KHaO9UExvvHASvXQ63RD1D?mode=wwc', '_blank')}
              className="bg-white text-red-600 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Join Community
            </button>
          </div>

          {/* Desktop Footer */}
          <div className="bg-gray-600 rounded-lg p-4 mt-4 border border-gray-500">
            <div className="text-center">
              <p className="text-sm text-gray-200 mb-2">Exploring all 77 districts of Nepal, one adventure at a time</p>
              <div className="flex justify-center space-x-4">
                <span className="text-xs text-gray-400">#77DistrictsOfNepal</span>
                <span className="text-xs text-gray-400">#Mission77</span>
                <span className="text-xs text-gray-400">#NepalAdventure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden absolute top-24 right-4 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto space-y-4 z-20">
          {/* Mission 77 Header */}
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Logo size={48} />
              <div>
                <h1 className="text-xl font-bold text-white">Mission 77</h1>
                <p className="text-sm text-gray-300">#77DistrictsOfNepal</p>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-white mb-1">{coveredDistricts.length}/77</div>
              <div className="text-xl font-semibold text-blue-400 mb-2">{progressPercentage.toFixed(1)}%</div>
              <div className="text-sm text-gray-300">Districts Covered</div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Progress</span>
                <span className="text-sm font-medium text-gray-300">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Itinerary Manager */}
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 p-6">
            <ItineraryManager
              districts={districts}
              coveredDistricts={coveredDistricts}
              itineraries={itineraries}
              onAddItinerary={handleAddItinerary}
              onUpdateItinerary={handleUpdateItinerary}
              onDeleteItinerary={handleDeleteItinerary}
            />
          </div>

          {/* Quick Stats */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Mountain className="h-5 w-5 mr-2 text-green-600" />
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Districts Covered</span>
                <span className="font-semibold">{coveredDistricts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining</span>
                <span className="font-semibold">{totalDistricts - coveredDistricts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold">{progressPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Join Community */}
          <div className="bg-gradient-to-r from-red-600/90 to-blue-600/90 backdrop-blur-sm rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Join the Journey
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Connect with fellow adventurers and join upcoming expeditions to explore Nepal&apos;s beautiful districts.
            </p>
            <button 
              onClick={() => window.open('https://chat.whatsapp.com/KHaO9UExvvHASvXQ63RD1D?mode=wwc', '_blank')}
              className="bg-white text-red-600 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Join Community
            </button>
          </div>
        </div>
      )}

      {/* Floating Footer - Mobile Only */}
      <div className="md:hidden absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-gray-800/95 backdrop-blur-sm shadow-lg rounded-lg p-3 border border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-200 mb-2">Exploring all 77 districts of Nepal, one adventure at a time</p>
            <div className="flex justify-center space-x-6">
              <span className="text-xs text-gray-400">#77DistrictsOfNepal</span>
              <span className="text-xs text-gray-400">#Mission77</span>
              <span className="text-xs text-gray-400">#NepalAdventure</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
