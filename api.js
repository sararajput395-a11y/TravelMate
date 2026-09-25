/**
 * TravelMate Frontend API Service
 * Connects frontend -> backend -> database
 */
const API_BASE = '/api';

const TravelMateAPI = {
  // Trips
  async getTrips() {
    const res = await fetch(`${API_BASE}/trips`);
    return res.json();
  },

  async createTrip(trip) {
    const res = await fetch(`${API_BASE}/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip)
    });
    return res.json();
  },

  async updateTrip(tripId, updates) {
    const res = await fetch(`${API_BASE}/trips/${tripId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return res.json();
  },

  async deleteTrip(tripId) {
    const res = await fetch(`${API_BASE}/trips/${tripId}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Itinerary
  async getItinerary(tripId) {
    const res = await fetch(`${API_BASE}/trips/${tripId}/itinerary`);
    return res.json();
  },

  async saveItinerary(tripId, days) {
    const res = await fetch(`${API_BASE}/trips/${tripId}/itinerary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(days)
    });
    return res.json();
  },

  // Packing
  async getPacking(tripId) {
    const res = await fetch(`${API_BASE}/trips/${tripId}/packing`);
    return res.json();
  },

  async savePacking(tripId, items) {
    const res = await fetch(`${API_BASE}/trips/${tripId}/packing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    });
    return res.json();
  },

  // Budget
  async getBudget(tripId) {
    const res = await fetch(`${API_BASE}/trips/${tripId}/budget`);
    return res.json();
  },

  async saveBudget(tripId, budgetData) {
    const res = await fetch(`${API_BASE}/trips/${tripId}/budget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budgetData)
    });
    return res.json();
  },

  // Groq AI Trip Generation
  async generateTrip(preferences) {
    const res = await fetch('/generate-trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  }
};

window.TravelMateAPI = TravelMateAPI;
