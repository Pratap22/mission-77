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
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { Itinerary } from '../components/ItineraryManager';

// Collection names
const ITINERARIES_COLLECTION = 'itineraries';
const DISTRICTS_COLLECTION = 'districts';

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
    await updateDoc(districtRef, {
      ...status,
      updatedAt: Timestamp.now()
    });
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

