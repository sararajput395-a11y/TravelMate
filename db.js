/**
 * TravelMate Minimal Persistent Database (IndexedDB)
 * Stores: trips, itinerary, packing, budget
 */

const DB_NAME = 'TravelMateDB';
const DB_VERSION = 1;

let dbInstance = null;

const TravelMateDB = {
  // Initialize IndexedDB with minimal object stores
  init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // 1. Trips store: destination, dates, budget, travellers, preferences
        if (!db.objectStoreNames.contains('trips')) {
          db.createObjectStore('trips', { keyPath: 'id' });
        }

        // 2. Itinerary store: tripId, day, city, hotel, activities
        if (!db.objectStoreNames.contains('itinerary')) {
          const itStore = db.createObjectStore('itinerary', { keyPath: 'id', autoIncrement: true });
          itStore.createIndex('tripId', 'tripId', { unique: false });
        }

        // 3. Packing store: tripId, items (category, text, done)
        if (!db.objectStoreNames.contains('packing')) {
          const packStore = db.createObjectStore('packing', { keyPath: 'id' });
          packStore.createIndex('tripId', 'tripId', { unique: false });
        }

        // 4. Budget store: tripId, categories, amounts, expenses
        if (!db.objectStoreNames.contains('budget')) {
          db.createObjectStore('budget', { keyPath: 'tripId' });
        }
      };

      request.onsuccess = (e) => {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };

      request.onerror = (e) => {
        console.error('Database open error:', e.target.error);
        reject(e.target.error);
      };
    });
  },

  // --- TRIPS ---
  getAllTrips() {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('trips', 'readonly');
      const store = tx.objectStore('trips');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  },

  saveTrip(trip) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('trips', 'readwrite');
      tx.objectStore('trips').put(trip);
      tx.oncomplete = () => resolve(trip);
    });
  },

  deleteTrip(tripId) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction(['trips', 'itinerary', 'packing', 'budget'], 'readwrite');
      tx.objectStore('trips').delete(tripId);
      
      // Delete itinerary records
      const itStore = tx.objectStore('itinerary');
      const itIndex = itStore.index('tripId');
      const itReq = itIndex.openKeyCursor(IDBKeyRange.only(tripId));
      itReq.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          itStore.delete(cursor.primaryKey);
          cursor.continue();
        }
      };

      // Delete packing records
      const packStore = tx.objectStore('packing');
      const packIndex = packStore.index('tripId');
      const packReq = packIndex.openKeyCursor(IDBKeyRange.only(tripId));
      packReq.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          packStore.delete(cursor.primaryKey);
          cursor.continue();
        }
      };

      // Delete budget record
      tx.objectStore('budget').delete(tripId);

      tx.oncomplete = () => resolve(true);
    });
  },

  // --- ITINERARY ---
  getItinerary(tripId) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('itinerary', 'readonly');
      const index = tx.objectStore('itinerary').index('tripId');
      const req = index.getAll(tripId);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  },

  saveItineraryDays(tripId, days) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('itinerary', 'readwrite');
      const store = tx.objectStore('itinerary');
      const index = store.index('tripId');
      
      // Clear existing for tripId then insert
      const req = index.openKeyCursor(IDBKeyRange.only(tripId));
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        } else {
          days.forEach(day => {
            store.add({ tripId, ...day });
          });
        }
      };
      tx.oncomplete = () => resolve(true);
    });
  },

  // --- PACKING ---
  getPackingItems(tripId) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('packing', 'readonly');
      const index = tx.objectStore('packing').index('tripId');
      const req = index.getAll(tripId);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  },

  savePackingItem(tripId, item) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('packing', 'readwrite');
      tx.objectStore('packing').put({ tripId, ...item });
      tx.oncomplete = () => resolve(true);
    });
  },

  deletePackingItem(itemId) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('packing', 'readwrite');
      tx.objectStore('packing').delete(itemId);
      tx.oncomplete = () => resolve(true);
    });
  },

  // --- BUDGET ---
  getBudget(tripId) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('budget', 'readonly');
      const req = tx.objectStore('budget').get(tripId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  },

  saveBudget(tripId, budgetData) {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction('budget', 'readwrite');
      tx.objectStore('budget').put({ tripId, ...budgetData });
      tx.oncomplete = () => resolve(true);
    });
  }
};
