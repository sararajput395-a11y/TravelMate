/**
 * TravelMate Minimal Backend Server
 * Uses Node.js built-in modules (http, fs, path). No external dependencies required.
 * Integrates Groq AI model: openai/gpt-oss-120b
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// Load .env variables without external dependencies
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    }
  }
}
loadEnv();

const PORT = parseInt(process.env.PORT, 10) || 3000;
const DB_FILE = path.join(__dirname, 'database.json');

// Initial seed data if database.json does not exist
const initialData = {
  trips: [
    {
      id: 'trip-1',
      title: 'Kyoto Spring Blossom Escape',
      destination: 'Kyoto, Japan',
      departureDate: '2026-04-10',
      returnDate: '2026-04-15',
      durationDays: 5,
      travellerType: 'couple',
      travellerCount: 2,
      travelStyle: 'Romantic & Scenic',
      accommodation: 'Traditional Machiya Ryokan',
      pace: 'Balanced (The Sweet Spot)',
      budgetAmount: 2400,
      currency: '$',
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&auto=format&fit=crop&q=80',
      status: 'Upcoming 🌸',
      notes: 'Rent floral kimonos in Gion, drink Uji matcha lattes by the Kamo river.'
    },
    {
      id: 'trip-2',
      title: 'Amalfi Coast Citrus Sunshine',
      destination: 'Positano, Italy',
      departureDate: '2026-06-15',
      returnDate: '2026-06-20',
      durationDays: 5,
      travellerType: 'friends',
      travellerCount: 4,
      travelStyle: 'Beach & Chill',
      accommodation: 'Cliffside Pastel Villa',
      pace: 'Relaxed (Slow Mornings)',
      budgetAmount: 3200,
      currency: '€',
      coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=700&auto=format&fit=crop&q=80',
      status: 'In Journal 🍋',
      notes: 'Rent pastel Vespas, drink limoncello spritz.'
    }
  ],
  itinerary: {
    'trip-1': [
      {
        dayNumber: 1,
        dateLabel: 'Apr 10 (Day 1)',
        city: 'Kyoto (Higashiyama)',
        hotel: '🌸 Kamo River Machiya Inn',
        morning: {
          time: '9:00 AM - 12:00 PM',
          activities: [
            { title: 'Kiyomizu-dera Wooden Stage', desc: 'Wander through morning mist and cherry blossoms.', tag: 'Temple' },
            { title: 'Matcha Soft Cream & Dango', desc: 'Stroll down Ninenzaka and Sannenzaka stone alleys.', tag: 'Treat' }
          ]
        },
        afternoon: {
          time: '1:30 PM - 5:00 PM',
          activities: [
            { title: 'Gion Tea Ceremony Experience', desc: 'Quiet matcha whisking in historic tea salon.', tag: 'Culture' },
            { title: 'Traditional Pottery Painting', desc: 'Craft pastel ceramic sake cups to take home.', tag: 'Workshop' }
          ]
        },
        evening: {
          time: '6:30 PM - 9:30 PM',
          activities: [
            { title: 'Kaiseki Dinner along Pontocho', desc: 'Riverside dining on tatami mats tasting sakura dishes.', tag: 'Dinner' },
            { title: 'Lantern Walk by Shirakawa Canal', desc: 'Paper lantern glow along weeping willows.', tag: 'Night Walk' }
          ]
        }
      },
      {
        dayNumber: 2,
        dateLabel: 'Apr 11 (Day 2)',
        city: 'Arashiyama & Sagano',
        hotel: '🌸 Kamo River Machiya Inn',
        morning: {
          time: '8:30 AM - 11:30 AM',
          activities: [
            { title: 'Arashiyama Bamboo Grove Walk', desc: 'Listen to giant bamboo stalks swaying gently.', tag: 'Nature' }
          ]
        },
        afternoon: {
          time: '12:30 PM - 4:00 PM',
          activities: [
            { title: 'Hozugawa Romantic River Boat', desc: 'Scenic canyon boat ride past sakura trees.', tag: 'Boating' }
          ]
        },
        evening: {
          time: '6:00 PM - 9:00 PM',
          activities: [
            { title: 'Yudofu Silk Tofu Hot Pot', desc: 'Kyoto tofu stewed with savory dipping sauce.', tag: 'Dinner' }
          ]
        }
      }
    ]
  },
  packing: {
    'trip-1': [
      { id: 1, category: 'essentials', text: 'Passport & International Driving Permit', done: true },
      { id: 2, category: 'essentials', text: 'Travel Insurance Documents & Tickets', done: true },
      { id: 3, category: 'clothing', text: 'Cute walking sneakers (broken-in)', done: true },
      { id: 4, category: 'clothing', text: 'Pastel cardigan & lightweight rain jacket', done: false },
      { id: 5, category: 'electronics', text: 'Universal plug adapter & USB-C cables', done: true },
      { id: 6, category: 'electronics', text: 'Fujifilm Instax / Polaroid Camera', done: true },
      { id: 7, category: 'toiletries', text: 'Mini sunscreen SPF 50 & lip balm', done: true },
      { id: 8, category: 'fun', text: 'TravelMate scrapbook journal & gel pens', done: true }
    ]
  },
  budget: {
    'trip-1': {
      total: 2400,
      categories: {
        Stay: { name: '🏨 Stays & Ryokan', allocated: 950, spent: 890, colorClass: 'cat-stay' },
        Food: { name: '🍜 Cafes & Kaiseki', allocated: 600, spent: 440, colorClass: 'cat-food' },
        Activities: { name: '🎟️ Shrines & Tours', allocated: 350, spent: 210, colorClass: 'cat-activities' },
        Transport: { name: '🚄 Shinkansen & Subway', allocated: 300, spent: 160, colorClass: 'cat-transport' },
        Shopping: { name: '🛍️ Ceramics & Crafts', allocated: 200, spent: 80, colorClass: 'cat-shopping' }
      },
      expenses: [
        { id: 101, title: 'Ryokan Deposit & Booking', category: 'Stay', amount: 890, date: 'Apr 02' },
        { id: 102, title: 'Kiyomizu & Garden Tickets', category: 'Activities', amount: 45, date: 'Apr 10' },
        { id: 103, title: 'Nishiki Market Street Snacks', category: 'Food', amount: 35, date: 'Apr 10' },
        { id: 104, title: 'Kyoto Sightseeing Bus Pass', category: 'Transport', amount: 24, date: 'Apr 10' }
      ]
    }
  }
};

// Database helper functions
function loadDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    saveDatabase(initialData);
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

function saveDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Request Body Parser Helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// JSON Response Helper
function sendJSON(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Serve Static Files
function serveStatic(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

// Groq AI Request with Retry Handling
async function callGroqWithRetry(apiKey, payload, retries = 2) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (attempt < retries && (response.status === 429 || response.status >= 500)) {
          await new Promise(r => setTimeout(r, 1000 * attempt));
          continue;
        }
        let parsedErr = errorText;
        try {
          const errObj = JSON.parse(errorText);
          parsedErr = errObj.error?.message || errorText;
        } catch (_) {}
        throw new Error(`Groq API error (${response.status}): ${parsedErr}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error('No content returned from Groq model');
      return JSON.parse(content);
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 1200 * attempt));
    }
  }
}

// Server Dispatcher
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const db = loadDatabase();

  // --- 0. GROQ AI GENERATE TRIP ENDPOINT ---
  if ((pathname === '/generate-trip' || pathname === '/api/generate-trip') && req.method === 'POST') {
    try {
      const params = await parseBody(req);
      const apiKey = process.env.XAI_API_KEY || process.env.GROQ_API_KEY;

      if (!apiKey || apiKey === '$$$$$' || apiKey.trim() === '') {
        return sendJSON(res, 400, {
          error: 'Missing or placeholder Groq API key. Please replace XAI_API_KEY=$$$$$ in .env with your real Groq API key.',
          isConfigError: true
        });
      }

      const duration = parseInt(params.durationDays, 10) || 3;
      const budget = parseFloat(params.budgetAmount) || 2000;
      const destination = params.destination || 'Kyoto, Japan';

      const promptUser = `Create a complete travel plan for:
Destination: ${destination}
Dates: ${params.departureDate} to ${params.returnDate} (${duration} days)
Travellers: ${params.travellerCount || 2} (${params.travellerType || 'couple'})
Travel Style: ${params.travelStyle || 'Romantic & Scenic'}
Accommodation Preference: ${params.accommodation || 'Boutique Hotel'}
Pace: ${params.pace || 'Balanced'}
Budget: ${params.currency || '$'}${budget}
Notes/Wishes: ${params.notes || 'None'}

Return ONLY a valid JSON object matching this exact structure:
{
  "tripSummary": "A cute 2-sentence summary of the voyage.",
  "days": [
    {
      "dayNumber": 1,
      "dateLabel": "Day 1",
      "city": "Specific neighborhood/area",
      "hotel": "Hotel name matching accommodation preference",
      "morning": {
        "time": "9:00 AM - 12:00 PM",
        "activities": [
          { "title": "Activity name", "desc": "Brief 1-line description", "tag": "Sight/Coffee/Walk" }
        ]
      },
      "afternoon": {
        "time": "1:30 PM - 5:00 PM",
        "activities": [
          { "title": "Activity name", "desc": "Brief 1-line description", "tag": "Explore/Museum/Shop" }
        ]
      },
      "evening": {
        "time": "6:30 PM - 9:30 PM",
        "activities": [
          { "title": "Activity name", "desc": "Brief 1-line description", "tag": "Dinner/Sunset/Relax" }
        ]
      }
    }
  ],
  "packingSuggestions": [
    { "category": "essentials", "text": "Specific item" },
    { "category": "clothing", "text": "Clothing item tailored to expected seasonal weather in ${destination}" },
    { "category": "electronics", "text": "Tech or gadget item" },
    { "category": "toiletries", "text": "Care or skincare item for travel weather" },
    { "category": "fun", "text": "Journal, stickers, or travel souvenir item" }
  ],
  "budgetBreakdown": {
    "total": ${budget},
    "categories": {
      "Stay": { "name": "🏨 Stays & Accommodation", "allocated": ${Math.round(budget * 0.4)}, "spent": 0, "colorClass": "cat-stay" },
      "Food": { "name": "🍜 Cafes & Dining", "allocated": ${Math.round(budget * 0.25)}, "spent": 0, "colorClass": "cat-food" },
      "Activities": { "name": "🎟️ Tours & Sights", "allocated": ${Math.round(budget * 0.15)}, "spent": 0, "colorClass": "cat-activities" },
      "Transport": { "name": "🚄 Transit & Travel", "allocated": ${Math.round(budget * 0.12)}, "spent": 0, "colorClass": "cat-transport" },
      "Shopping": { "name": "🛍️ Souvenirs & Treats", "allocated": ${Math.round(budget * 0.08)}, "spent": 0, "colorClass": "cat-shopping" }
    }
  }
}
Generate all ${duration} days in the "days" array. Keep activities delightful and appropriate for ${destination}.`;

      // Call Groq API with specified model openai/gpt-oss-120b
      const groqPayload = {
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: 'You are TravelMate AI, a warm and helpful travel planner. You generate structured travel plans with weather-aware packing suggestions, realistic day-by-day itineraries, and budget breakdowns. Always output ONLY a valid JSON object without markdown fences or additional prose.'
          },
          {
            role: 'user',
            content: promptUser
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
      };

      const aiData = await callGroqWithRetry(apiKey, groqPayload, 2);

      // Create new trip object
      const tripId = 'trip-' + Date.now();
      const newTrip = {
        id: tripId,
        title: `${destination} Voyage ✨`,
        destination: destination,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        durationDays: duration,
        travellerType: params.travellerType || 'couple',
        travellerCount: parseInt(params.travellerCount, 10) || 2,
        travelStyle: params.travelStyle || 'Romantic & Scenic',
        accommodation: params.accommodation || 'Boutique Hotel',
        pace: params.pace || 'Balanced',
        budgetAmount: budget,
        currency: params.currency || '$',
        coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&auto=format&fit=crop&q=80',
        status: 'AI Curated 🌸',
        notes: aiData.tripSummary || params.notes || 'Generated with Groq AI'
      };

      // Format packing items
      const packingList = (aiData.packingSuggestions || []).map((item, idx) => ({
        id: Date.now() + idx,
        category: item.category || 'essentials',
        text: item.text,
        done: false
      }));

      // Format budget
      const budgetData = aiData.budgetBreakdown || {
        total: budget,
        categories: {
          Stay: { name: '🏨 Stays & Accommodation', allocated: Math.round(budget * 0.4), spent: 0, colorClass: 'cat-stay' },
          Food: { name: '🍜 Cafes & Dining', allocated: Math.round(budget * 0.25), spent: 0, colorClass: 'cat-food' },
          Activities: { name: '🎟️ Tours & Sights', allocated: Math.round(budget * 0.15), spent: 0, colorClass: 'cat-activities' },
          Transport: { name: '🚄 Transit & Travel', allocated: Math.round(budget * 0.12), spent: 0, colorClass: 'cat-transport' },
          Shopping: { name: '🛍️ Souvenirs & Treats', allocated: Math.round(budget * 0.08), spent: 0, colorClass: 'cat-shopping' }
        },
        expenses: []
      };

      // Save to existing database.json
      db.trips.unshift(newTrip);
      db.itinerary[tripId] = aiData.days || [];
      db.packing[tripId] = packingList;
      db.budget[tripId] = budgetData;
      saveDatabase(db);

      return sendJSON(res, 200, {
        success: true,
        trip: newTrip,
        days: aiData.days || [],
        packing: packingList,
        budget: budgetData
      });
    } catch (err) {
      console.error('Groq generation error:', err);
      return sendJSON(res, 500, {
        error: err.message || 'Failed to generate trip with Groq AI',
        canRetry: true
      });
    }
  }

  // --- API ROUTES ---

  // 1. Trips: GET & POST
  if (pathname === '/api/trips' && req.method === 'GET') {
    return sendJSON(res, 200, db.trips);
  }

  if (pathname === '/api/trips' && req.method === 'POST') {
    try {
      const trip = await parseBody(req);
      if (!trip.id) trip.id = 'trip-' + Date.now();
      db.trips.unshift(trip);
      saveDatabase(db);
      return sendJSON(res, 201, trip);
    } catch (err) {
      return sendJSON(res, 400, { error: 'Invalid payload' });
    }
  }

  // 2. Trip by ID: GET, PUT, DELETE
  const tripMatch = pathname.match(/^\/api\/trips\/([^/]+)$/);
  if (tripMatch) {
    const tripId = tripMatch[1];

    if (req.method === 'GET') {
      const trip = db.trips.find(t => t.id === tripId);
      return trip ? sendJSON(res, 200, trip) : sendJSON(res, 404, { error: 'Trip not found' });
    }

    if (req.method === 'PUT') {
      try {
        const updates = await parseBody(req);
        const idx = db.trips.findIndex(t => t.id === tripId);
        if (idx !== -1) {
          db.trips[idx] = { ...db.trips[idx], ...updates };
          saveDatabase(db);
          return sendJSON(res, 200, db.trips[idx]);
        }
        return sendJSON(res, 404, { error: 'Trip not found' });
      } catch (err) {
        return sendJSON(res, 400, { error: 'Invalid payload' });
      }
    }

    if (req.method === 'DELETE') {
      db.trips = db.trips.filter(t => t.id !== tripId);
      delete db.itinerary[tripId];
      delete db.packing[tripId];
      delete db.budget[tripId];
      saveDatabase(db);
      return sendJSON(res, 200, { success: true });
    }
  }

  // 3. Itinerary: GET & POST
  const itinMatch = pathname.match(/^\/api\/trips\/([^/]+)\/itinerary$/);
  if (itinMatch) {
    const tripId = itinMatch[1];
    if (req.method === 'GET') {
      return sendJSON(res, 200, db.itinerary[tripId] || []);
    }
    if (req.method === 'POST') {
      try {
        const days = await parseBody(req);
        db.itinerary[tripId] = days;
        saveDatabase(db);
        return sendJSON(res, 200, { success: true, count: days.length });
      } catch (err) {
        return sendJSON(res, 400, { error: 'Invalid payload' });
      }
    }
  }

  // 4. Packing: GET & POST
  const packMatch = pathname.match(/^\/api\/trips\/([^/]+)\/packing$/);
  if (packMatch) {
    const tripId = packMatch[1];
    if (req.method === 'GET') {
      return sendJSON(res, 200, db.packing[tripId] || []);
    }
    if (req.method === 'POST') {
      try {
        const items = await parseBody(req);
        db.packing[tripId] = items;
        saveDatabase(db);
        return sendJSON(res, 200, { success: true });
      } catch (err) {
        return sendJSON(res, 400, { error: 'Invalid payload' });
      }
    }
  }

  // 5. Budget: GET & POST
  const budgetMatch = pathname.match(/^\/api\/trips\/([^/]+)\/budget$/);
  if (budgetMatch) {
    const tripId = budgetMatch[1];
    if (req.method === 'GET') {
      return sendJSON(res, 200, db.budget[tripId] || null);
    }
    if (req.method === 'POST') {
      try {
        const budgetData = await parseBody(req);
        db.budget[tripId] = budgetData;
        saveDatabase(db);
        return sendJSON(res, 200, { success: true });
      } catch (err) {
        return sendJSON(res, 400, { error: 'Invalid payload' });
      }
    }
  }

  // --- STATIC FRONTEND FILES ---
  if (req.method === 'GET') {
    let cleanPath = pathname === '/' ? '/index.html' : pathname;
    const targetFile = path.join(__dirname, cleanPath);

    const ext = path.extname(cleanPath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
      return serveStatic(res, targetFile, mimeTypes[ext] || 'text/plain');
    }
  }

  // Default 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

// Start Server
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`🌸 TravelMate backend running at http://localhost:${PORT}`);
  });
}

module.exports = server;
