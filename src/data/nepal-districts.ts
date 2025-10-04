export interface District {
  id: string;
  name: string;
  province: string;
  coordinates: [number, number]; // [longitude, latitude]
  covered: boolean;
  dateVisited?: string;
  description?: string;
  highlights?: string[];
}

export const nepalDistricts: District[] = [
  // Province 1 (Koshi)
  { id: 'taplejung', name: 'Taplejung', province: 'Koshi', coordinates: [87.6667, 27.3500], covered: false },
  { id: 'panchthar', name: 'Panchthar', province: 'Koshi', coordinates: [87.5833, 27.1667], covered: false },
  { id: 'ilam', name: 'Ilam', province: 'Koshi', coordinates: [87.9167, 26.9167], covered: false },
  { id: 'jhapa', name: 'Jhapa', province: 'Koshi', coordinates: [87.9167, 26.5833], covered: false },
  { id: 'morang', name: 'Morang', province: 'Koshi', coordinates: [87.3000, 26.6667], covered: false },
  { id: 'sunsari', name: 'Sunsari', province: 'Koshi', coordinates: [87.2500, 26.7500], covered: false },
  { id: 'dhankuta', name: 'Dhankuta', province: 'Koshi', coordinates: [87.3333, 26.9833], covered: false },
  { id: 'terhathum', name: 'Terhathum', province: 'Koshi', coordinates: [87.5833, 27.0833], covered: false },
  { id: 'sankhuwasabha', name: 'Sankhuwasabha', province: 'Koshi', coordinates: [87.3333, 27.4167], covered: false },
  { id: 'bhojpur', name: 'Bhojpur', province: 'Koshi', coordinates: [87.0833, 27.1667], covered: false },
  { id: 'solukhumbu', name: 'Solukhumbu', province: 'Koshi', coordinates: [86.7167, 27.8000], covered: false },
  { id: 'okhaldhunga', name: 'Okhaldhunga', province: 'Koshi', coordinates: [86.5000, 27.3167], covered: false },
  { id: 'khotang', name: 'Khotang', province: 'Koshi', coordinates: [86.7500, 27.2000], covered: false },
  { id: 'udayapur', name: 'Udayapur', province: 'Koshi', coordinates: [86.6667, 26.7500], covered: false },

  // Province 2 (Madhesh)
  { id: 'saptari', name: 'Saptari', province: 'Madhesh', coordinates: [86.7500, 26.5833], covered: false },
  { id: 'siraha', name: 'Siraha', province: 'Madhesh', coordinates: [86.2500, 26.6667], covered: false },
  { id: 'dhanusha', name: 'Dhanusha', province: 'Madhesh', coordinates: [85.9167, 26.7500], covered: false },
  { id: 'mahottari', name: 'Mahottari', province: 'Madhesh', coordinates: [85.7500, 26.8333], covered: false },
  { id: 'sarlahi', name: 'Sarlahi', province: 'Madhesh', coordinates: [85.5000, 26.9167], covered: false },
  { id: 'rautahat', name: 'Rautahat', province: 'Madhesh', coordinates: [85.2500, 26.8333], covered: false },
  { id: 'bara', name: 'Bara', province: 'Madhesh', coordinates: [85.0833, 27.0000], covered: false },
  { id: 'parsa', name: 'Parsa', province: 'Madhesh', coordinates: [84.8333, 27.0833], covered: false },

  // Province 3 (Bagmati)
  { id: 'dolakha', name: 'Dolakha', province: 'Bagmati', coordinates: [86.0833, 27.6667], covered: false },
  { id: 'ramechhap', name: 'Ramechhap', province: 'Bagmati', coordinates: [86.0833, 27.3333], covered: false },
  { id: 'sindhuli', name: 'Sindhuli', province: 'Bagmati', coordinates: [85.9167, 27.2500], covered: false },
  { id: 'kavrepalanchok', name: 'Kavrepalanchok', province: 'Bagmati', coordinates: [85.5833, 27.5833], covered: false },
  { id: 'bhaktapur', name: 'Bhaktapur', province: 'Bagmati', coordinates: [85.4167, 27.6667], covered: false },
  { id: 'lalitpur', name: 'Lalitpur', province: 'Bagmati', coordinates: [85.3333, 27.6667], covered: false },
  { id: 'kathmandu', name: 'Kathmandu', province: 'Bagmati', coordinates: [85.3333, 27.7000], covered: false },
  { id: 'nuwakot', name: 'Nuwakot', province: 'Bagmati', coordinates: [85.1667, 27.9167], covered: false },
  { id: 'rasuwa', name: 'Rasuwa', province: 'Bagmati', coordinates: [85.3333, 28.0833], covered: false },
  { id: 'dhading', name: 'Dhading', province: 'Bagmati', coordinates: [84.9167, 27.8333], covered: false },
  { id: 'makwanpur', name: 'Makwanpur', province: 'Bagmati', coordinates: [85.0833, 27.4167], covered: false },
  { id: 'chitwan', name: 'Chitwan', province: 'Bagmati', coordinates: [84.4167, 27.5000], covered: false },

  // Province 4 (Gandaki)
  { id: 'manang', name: 'Manang', province: 'Gandaki', coordinates: [84.0000, 28.6667], covered: true },
  { id: 'mustang', name: 'Mustang', province: 'Gandaki', coordinates: [83.8333, 28.8333], covered: false },
  { id: 'myagdi', name: 'Myagdi', province: 'Gandaki', coordinates: [83.2500, 28.3333], covered: false },
  { id: 'kaski', name: 'Kaski', province: 'Gandaki', coordinates: [83.9167, 28.2500], covered: true },
  { id: 'lamjung', name: 'Lamjung', province: 'Gandaki', coordinates: [84.3333, 28.2500], covered: false },
  { id: 'tanahun', name: 'Tanahun', province: 'Gandaki', coordinates: [84.2500, 27.9167], covered: false },
  { id: 'nawalpur', name: 'Nawalpur', province: 'Gandaki', coordinates: [84.0833, 27.6667], covered: false },
  { id: 'syangja', name: 'Syangja', province: 'Gandaki', coordinates: [83.8333, 28.0833], covered: false },
  { id: 'parbat', name: 'Parbat', province: 'Gandaki', coordinates: [83.7500, 28.1667], covered: false },
  { id: 'baglung', name: 'Baglung', province: 'Gandaki', coordinates: [83.5833, 28.2500], covered: false },
  { id: 'gorkha', name: 'Gorkha', province: 'Gandaki', coordinates: [84.6667, 28.0000], covered: false },

  // Province 5 (Lumbini)
  { id: 'kapilvastu', name: 'Kapilvastu', province: 'Lumbini', coordinates: [83.0000, 27.5000], covered: false },
  { id: 'rupandehi', name: 'Rupandehi', province: 'Lumbini', coordinates: [83.4167, 27.5000], covered: false },
  { id: 'arghakhanchi', name: 'Arghakhanchi', province: 'Lumbini', coordinates: [83.0833, 27.9167], covered: false },
  { id: 'gulmi', name: 'Gulmi', province: 'Lumbini', coordinates: [83.2500, 28.0833], covered: false },
  { id: 'palpa', name: 'Palpa', province: 'Lumbini', coordinates: [83.6667, 27.8333], covered: false },
  { id: 'nawalparasi-east', name: 'Nawalparasi East', province: 'Lumbini', coordinates: [84.0000, 27.6667], covered: false },
  { id: 'nawalparasi-west', name: 'Nawalparasi West', province: 'Lumbini', coordinates: [83.7500, 27.7500], covered: false },
  { id: 'rolpa', name: 'Rolpa', province: 'Lumbini', coordinates: [82.7500, 28.2500], covered: false },
  { id: 'pyuthan', name: 'Pyuthan', province: 'Lumbini', coordinates: [82.9167, 28.0833], covered: false },
  { id: 'dang', name: 'Dang', province: 'Lumbini', coordinates: [82.3333, 27.8333], covered: false },
  { id: 'banke', name: 'Banke', province: 'Lumbini', coordinates: [81.6667, 28.0833], covered: false },
  { id: 'bardiya', name: 'Bardiya', province: 'Lumbini', coordinates: [81.4167, 28.3333], covered: false },

  // Province 6 (Karnali)
  { id: 'western-rukum', name: 'Western Rukum', province: 'Karnali', coordinates: [82.5000, 28.5000], covered: false },
  { id: 'salyan', name: 'Salyan', province: 'Karnali', coordinates: [82.1667, 28.3333], covered: false },
  { id: 'dolpa', name: 'Dolpa', province: 'Karnali', coordinates: [82.9167, 29.0000], covered: false },
  { id: 'humla', name: 'Humla', province: 'Karnali', coordinates: [81.8333, 29.8333], covered: false },
  { id: 'jumla', name: 'Jumla', province: 'Karnali', coordinates: [82.1667, 29.2500], covered: false },
  { id: 'kalikot', name: 'Kalikot', province: 'Karnali', coordinates: [81.6667, 29.1667], covered: false },
  { id: 'mugu', name: 'Mugu', province: 'Karnali', coordinates: [82.2500, 29.5000], covered: false },
  { id: 'surkhet', name: 'Surkhet', province: 'Karnali', coordinates: [81.6667, 28.6667], covered: false },
  { id: 'dailekh', name: 'Dailekh', province: 'Karnali', coordinates: [81.7500, 28.8333], covered: false },
  { id: 'jajarkot', name: 'Jajarkot', province: 'Karnali', coordinates: [82.0833, 28.9167], covered: false },

  // Province 7 (Sudurpashchim)
  { id: 'kailali', name: 'Kailali', province: 'Sudurpashchim', coordinates: [80.7500, 28.6667], covered: false },
  { id: 'achham', name: 'Achham', province: 'Sudurpashchim', coordinates: [81.2500, 29.0833], covered: false },
  { id: 'doti', name: 'Doti', province: 'Sudurpashchim', coordinates: [80.9167, 29.2500], covered: false },
  { id: 'bajhang', name: 'Bajhang', province: 'Sudurpashchim', coordinates: [81.3333, 29.5000], covered: false },
  { id: 'bajura', name: 'Bajura', province: 'Sudurpashchim', coordinates: [81.5000, 29.4167], covered: false },
  { id: 'kanchanpur', name: 'Kanchanpur', province: 'Sudurpashchim', coordinates: [80.2500, 28.8333], covered: false },
  { id: 'dadeldhura', name: 'Dadeldhura', province: 'Sudurpashchim', coordinates: [80.5833, 29.2500], covered: false },
  { id: 'baitadi', name: 'Baitadi', province: 'Sudurpashchim', coordinates: [80.4167, 29.5000], covered: false },
  { id: 'darchula', name: 'Darchula', province: 'Sudurpashchim', coordinates: [80.6667, 29.6667], covered: false },
];

export const provinces = [
  { name: 'Koshi', color: '#ef4444', districts: nepalDistricts.filter(d => d.province === 'Koshi') },
  { name: 'Madhesh', color: '#f97316', districts: nepalDistricts.filter(d => d.province === 'Madhesh') },
  { name: 'Bagmati', color: '#eab308', districts: nepalDistricts.filter(d => d.province === 'Bagmati') },
  { name: 'Gandaki', color: '#22c55e', districts: nepalDistricts.filter(d => d.province === 'Gandaki') },
  { name: 'Lumbini', color: '#06b6d4', districts: nepalDistricts.filter(d => d.province === 'Lumbini') },
  { name: 'Karnali', color: '#8b5cf6', districts: nepalDistricts.filter(d => d.province === 'Karnali') },
  { name: 'Sudurpashchim', color: '#ec4899', districts: nepalDistricts.filter(d => d.province === 'Sudurpashchim') },
];
