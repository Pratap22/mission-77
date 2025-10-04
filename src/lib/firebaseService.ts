import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp,
  DocumentData,
  FieldValue
} from 'firebase/firestore';
import { db } from './firebase';
import { Itinerary } from '../components/ItineraryManager';
import { deleteField } from 'firebase/firestore';

// Collection names - different for production and development
const isDevelopment = process.env.NODE_ENV === 'development';
const ITINERARIES_COLLECTION = isDevelopment ? 'itineraries-dev' : 'itineraries';
const DISTRICTS_COLLECTION = isDevelopment ? 'districts-dev' : 'districts';

// Log environment info
console.log(`🔥 Firebase Collections: ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}`);
console.log(`📋 Itineraries: ${ITINERARIES_COLLECTION}`);
console.log(`🗺️ Districts: ${DISTRICTS_COLLECTION}`);

// Utility function to get current environment info
export const getEnvironmentInfo = () => ({
  isDevelopment,
  itinerariesCollection: ITINERARIES_COLLECTION,
  districtsCollection: DISTRICTS_COLLECTION,
  environment: isDevelopment ? 'development' : 'production'
});

// Itinerary functions
export const addItinerary = async (itinerary: Omit<Itinerary, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, ITINERARIES_COLLECTION), {
      ...itinerary,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding itinerary:', error);
    throw error;
  }
};

export const updateItinerary = async (id: string, updates: Partial<Itinerary>) => {
  try {
    const itineraryRef = doc(db, ITINERARIES_COLLECTION, id);
    await updateDoc(itineraryRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating itinerary:', error);
    throw error;
  }
};

export const deleteItinerary = async (id: string) => {
  try {
    await deleteDoc(doc(db, ITINERARIES_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    throw error;
  }
};

export const getItineraries = async () => {
  try {
    const q = query(collection(db, ITINERARIES_COLLECTION), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Itinerary[];
  } catch (error) {
    console.error('Error getting itineraries:', error);
    throw error;
  }
};

// District functions
export const updateDistrictStatus = async (districtId: string, status: {
  covered: boolean;
  dateVisited?: string;
  highlights?: string[];
}) => {
  try {
    const districtRef = doc(db, DISTRICTS_COLLECTION, districtId);
    
    const updateData: Record<string, string | boolean | Timestamp | FieldValue | string[]> = {
      covered: status.covered,
      updatedAt: Timestamp.now()
    };

    // Only add dateVisited if it's provided and not undefined
    if (status.dateVisited !== undefined) {
      updateData.dateVisited = status.dateVisited;
    } else if (status.covered === false) {
      // If marking as uncovered, delete the dateVisited field
      updateData.dateVisited = deleteField();
    }

    // Only add highlights if it's provided and not undefined
    if (status.highlights !== undefined) {
      updateData.highlights = status.highlights;
    } else if (status.covered === false) {
      // If marking as uncovered, delete the highlights field
      updateData.highlights = deleteField();
    }

    await updateDoc(districtRef, updateData);
  } catch (error) {
    console.error('Error updating district status:', error);
    throw error;
  }
};

export const getDistrictStatuses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, DISTRICTS_COLLECTION));
    const statuses: Record<string, DocumentData> = {};
    querySnapshot.docs.forEach(doc => {
      statuses[doc.id] = doc.data();
    });
    return statuses;
  } catch (error) {
    console.error('Error getting district statuses:', error);
    throw error;
  }
};

