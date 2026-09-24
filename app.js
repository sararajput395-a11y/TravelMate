/**
 * TravelMate - Cute Scrapbook Travel Planner
 * Vanilla JavaScript (No backend, no external libraries)
 */

// ================= APP STATE & MOCK DATA =================
const state = {
  activeView: 'home',
  currentTripId: 'trip-1',
  currency: '$',
  
  // Curated Mock Trips
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
      notes: 'Rent floral kimonos in Gion, drink Uji matcha lattes by the Kamo river, collect shrine stamps (Goshuin).',
      days: [
        {
          dayNumber: 1,
          dateLabel: 'Apr 10 (Day 1)',
          city: 'Kyoto (Higashiyama)',
          hotel: '🌸 Kamo River Machiya Inn',
          morning: {
            time: '9:00 AM - 12:00 PM',
            activities: [
              { title: 'Kiyomizu-dera Wooden Stage', desc: 'Wander through morning mist and scenic wooden terrace over cherry blossoms.', tag: 'Temple' },
              { title: 'Matcha Soft Cream & Dango', desc: 'Stroll down Ninenzaka and Sannenzaka stone alleys.', tag: 'Treat' }
            ]
          },
          afternoon: {
            time: '1:30 PM - 5:00 PM',
            activities: [
              { title: 'Gion Tea Ceremony Experience', desc: 'Quiet meditative matcha whisking in a historic wooden tea salon.', tag: 'Culture' },
              { title: 'Traditional Pottery Painting', desc: 'Craft our own pastel ceramic sake cups to take home.', tag: 'Workshop' }
            ]
          },
          evening: {
            time: '6:30 PM - 9:30 PM',
            activities: [
              { title: 'Kaiseki Dinner along Pontocho', desc: 'Riverside dining on tatami mats tasting seasonal sakura dishes.', tag: 'Dinner' },
              { title: 'Lantern Walk by Shirakawa Canal', desc: 'Listen to willow trees rustle under gentle paper lantern glow.', tag: 'Night Walk' }
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
              { title: 'Arashiyama Bamboo Grove Walk', desc: 'Listen to wind swaying gigantic emerald bamboo stalks early.', tag: 'Nature' },
              { title: 'Tenryu-ji Zen Garden & Pond', desc: 'Admire 14th century stone landscape and reflecting waters.', tag: 'UNESCO' }
            ]
          },
          afternoon: {
            time: '12:30 PM - 4:00 PM',
            activities: [
              { title: 'Hozugawa Romantic River Boat', desc: 'Traditional oarsmen steering past steep sakura canyon cliffs.', tag: 'Boating' },
              { title: 'Monkey Park Iwatayama', desc: 'Gentle hike overlooking panoramic Kyoto basin vista.', tag: 'Views' }
            ]
          },
          evening: {
            time: '6:00 PM - 9:00 PM',
            activities: [
              { title: 'Yudofu (Hot Pot Tofu) Feast', desc: 'Classic Kyoto silk tofu stewed with kelp and savory dipping sauce.', tag: 'Cuisine' },
              { title: 'Footbath Cafe & Craft Beer', desc: 'Relax tired feet in natural thermal water with local yuzu soda.', tag: 'Relaxation' }
            ]
          }
        },
        {
          dayNumber: 3,
          dateLabel: 'Apr 12 (Day 3)',
          city: 'Fushimi Inari & Uji',
          hotel: '🌸 Kamo River Machiya Inn',
          morning: {
            time: '8:00 AM - 11:00 AM',
            activities: [
              { title: 'Fushimi Inari 10,000 Torii Gates', desc: 'Hike into the mountain tunnels of vermilion wooden torii arches.', tag: 'Hiking' },
              { title: 'Kitsune (Fox) Wooden Charms', desc: 'Draw funny facial expressions on votive fox plaques.', tag: 'Souvenir' }
            ]
          },
          afternoon: {
            time: '12:30 PM - 4:30 PM',
            activities: [
              { title: 'Day Trip to Uji Matcha Capital', desc: 'Taste world-famous Gyokuro green tea and matcha soba noodles.', tag: 'Foodie' },
              { title: 'Byodoin Phoenix Hall', desc: 'The majestic 10-yen coin pavilion reflected in tranquil pond.', tag: 'History' }
            ]
          },
          evening: {
            time: '6:30 PM - 9:30 PM',
            activities: [
              { title: 'Cozy Izakaya in Kawaramachi', desc: 'Yakitori skewers, warm sake, tamagoyaki and hearty laughs.', tag: 'Izakaya' },
              { title: 'Night Polaroid Photo Hunt', desc: 'Capture neon reflections and retro vintage vending machines.', tag: 'Scrapbook' }
            ]
          }
        },
        {
          dayNumber: 4,
          dateLabel: 'Apr 13 (Day 4)',
          city: 'Northern Kyoto & Kinkaku-ji',
          hotel: '🌸 Kamo River Machiya Inn',
          morning: {
            time: '9:30 AM - 12:00 PM',
            activities: [
              { title: 'Golden Pavilion (Kinkaku-ji)', desc: 'Glistening gold leaf leafed structure shining over mirror lake.', tag: 'Sightseeing' },
              { title: 'Ryoan-ji Mystery Rock Garden', desc: 'Ponder 15 raked stones where one always remains hidden.', tag: 'Meditation' }
            ]
          },
          afternoon: {
            time: '1:30 PM - 5:00 PM',
            activities: [
              { title: 'Philosopher’s Path Sakura Stroll', desc: 'Canal trail lined with thousands of weeping cherry blossoms.', tag: 'Scenic' },
              { title: 'Cute Cat Cafe & Bookstore', desc: 'Read vintage travel mangas with fluffy sleeping felines.', tag: 'Cozy' }
            ]
          },
          evening: {
            time: '6:30 PM - 9:00 PM',
            activities: [
              { title: 'Kobe Wagyu Beef Teppanyaki', desc: 'Chefs sizzling melt-in-mouth cuts with garlic chips.', tag: 'Gourmet' },
              { title: 'Packing Scrapbook Souvenirs', desc: 'Tape ticket stubs and stamp pages into TravelMate journal.', tag: 'Memory' }
            ]
          }
        },
        {
          dayNumber: 5,
          dateLabel: 'Apr 14 (Day 5)',
          city: 'Kyoto to Kansai Departure',
          hotel: '🌸 Checked Out',
          morning: {
            time: '9:00 AM - 11:30 AM',
            activities: [
              { title: 'Nishiki Market Morning Crawl', desc: 'Sample grilled octopus skewers, mochi, and pickled vegetables.', tag: 'Market' },
              { title: 'Baggage Drop at Kyoto Station', desc: 'Admire the hyper-modern futuristic glass architecture.', tag: 'Transit' }
            ]
          },
          afternoon: {
            time: '1:00 PM - 4:00 PM',
            activities: [
              { title: 'Haruka Hello Kitty Express Train', desc: 'Cute high-speed ride directly toward Kansai International Airport.', tag: 'Train' },
              { title: 'Duty Free Tokyo Banana Shopping', desc: 'Stash boxes of fluffy banana sponge cakes for friends.', tag: 'Treats' }
            ]
          },
          evening: {
            time: '5:30 PM onward',
            activities: [
              { title: 'Board Flight Home ✈️', desc: 'Flip through camera roll and celebrate unforgettable days!', tag: 'Departure' }
            ]
          }
        }
      ]
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
      notes: 'Rent vintage pastel Vespas, drink icy limoncello spritz, cliff jump into crystal blue waters.',
      days: [
        {
          dayNumber: 1,
          dateLabel: 'Jun 15 (Day 1)',
          city: 'Positano',
          hotel: '🍋 Villa Rosa Positano',
          morning: {
            time: '10:00 AM - 1:00 PM',
            activities: [
              { title: 'Check in & Espresso on Balcony', desc: 'Watch colorful boats bobbing in the turquoise bay below.', tag: 'Check-in' }
            ]
          },
          afternoon: {
            time: '2:00 PM - 6:00 PM',
            activities: [
              { title: 'Spiaggia Grande Beach Lounging', desc: 'Rent striped umbrellas, swim in warm Tyrrhenian waters.', tag: 'Beach' }
            ]
          },
          evening: {
            time: '7:30 PM - 10:00 PM',
            activities: [
              { title: 'Seafood Linguine under Lemon Trees', desc: 'Homemade pasta with fresh clams, local olive oil and white wine.', tag: 'Dinner' }
            ]
          }
        }
      ]
    },
    {
      id: 'trip-3',
      title: 'Banff Alpine Lakes & Cozy Cabins',
      destination: 'Banff & Lake Louise, Canada',
      departureDate: '2026-09-02',
      returnDate: '2026-09-06',
      durationDays: 4,
      travellerType: 'solo',
      travellerCount: 1,
      travelStyle: 'Adventure & Nature',
      accommodation: 'Rustic Pine Log Cabin',
      pace: 'Fast-Paced (See Everything!)',
      budgetAmount: 1800,
      currency: '$',
      coverImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=700&auto=format&fit=crop&q=80',
      status: 'Archived 🌲',
      notes: 'Sunrise canoe on Moraine Lake, spot elk herds, soak in natural hot springs under starry skies.',
      days: [
        {
          dayNumber: 1,
          dateLabel: 'Sep 02 (Day 1)',
          city: 'Lake Louise',
          hotel: '🌲 Fairmont Chateau Lake Louise',
          morning: {
            time: '6:30 AM - 10:00 AM',
            activities: [
              { title: 'Moraine Lake Sunrise Canoe', desc: 'Paddle across glacial turquoise waters under the Valley of Ten Peaks.', tag: 'Bucket List' }
            ]
          },
          afternoon: {
            time: '12:00 PM - 4:30 PM',
            activities: [
              { title: 'Plain of Six Glaciers Teahouse Hike', desc: 'Hike 10km to high altitude heritage teahouse for apple crumble.', tag: 'Hiking' }
            ]
          },
          evening: {
            time: '6:30 PM - 9:00 PM',
            activities: [
              { title: 'Campfire Fondue & Stargazing', desc: 'Melted gruyere cheese fondue beside crackling alpine fire.', tag: 'Campfire' }
            ]
          }
        }
      ]
    }
  ],

  // Active Day in Itinerary
  selectedDayNumber: 1,

  // Packing List Mock Items
  packingItems: [
    { id: 1, category: 'essentials', text: 'Passport & International Driving Permit', done: true },
    { id: 2, category: 'essentials', text: 'Travel Insurance Documents & Tickets', done: true },
    { id: 3, category: 'essentials', text: 'Physical Debit/Credit cards & Yen cash', done: true },
    { id: 4, category: 'clothing', text: 'Cute walking sneakers (broken-in)', done: true },
    { id: 5, category: 'clothing', text: 'Pastel cardigan & lightweight rain jacket', done: false },
    { id: 6, category: 'clothing', text: '3x linen shirts & comfy travel pants', done: false },
    { id: 7, category: 'clothing', text: 'Sleepwear & socks for tatami rooms', done: true },
    { id: 8, category: 'electronics', text: 'Universal plug adapter & USB-C cables', done: true },
    { id: 9, category: 'electronics', text: 'Pocket Wi-Fi router / eSIM QR code', done: true },
    { id: 10, category: 'electronics', text: 'Portable 10,000mAh Powerbank', done: false },
    { id: 11, category: 'electronics', text: 'Fujifilm Instax / Polaroid Camera', done: true },
    { id: 12, category: 'toiletries', text: 'Mini sunscreen SPF 50 & lip balm', done: true },
    { id: 13, category: 'toiletries', text: 'Hydrating face sheet masks for flights', done: false },
    { id: 14, category: 'toiletries', text: 'Band-aids & blister patches for walking', done: false },
    { id: 15, category: 'fun', text: 'TravelMate scrapbook journal & gel pens', done: true },
    { id: 16, category: 'fun', text: 'Washi tape rolls for ticket stubs', done: true },
    { id: 17, category: 'fun', text: 'Compact umbrella for spring showers', done: false }
  ],

  // Budget Breakdown & Expenses
  budget: {
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
      { id: 104, title: 'Kyoto Sightseeing Bus Pass', category: 'Transport', amount: 24, date: 'Apr 10' },
      { id: 105, title: 'Handmade Matcha Bowl & Whisk', category: 'Shopping', amount: 80, date: 'Apr 11' },
      { id: 106, title: 'Hozugawa Boat Excursion', category: 'Activities', amount: 165, date: 'Apr 11' },
      { id: 107, title: 'Riverside Kaiseki Tasting', category: 'Food', amount: 220, date: 'Apr 11' }
    ]
  },

  // Curated Destinations
  destinations: [
    {
      id: 'dest-1',
      title: 'Kyoto Old Town',
      country: 'Japan 🇯🇵',
      type: 'culture',
      vibe: 'Zen & Nostalgic',
      desc: 'Wooden machiya townhouses, mossy stone lanterns, and serene cherry blossom riverbanks.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80',
      badge: 'Historic 🏯'
    },
    {
      id: 'dest-2',
      title: 'Amalfi Coast',
      country: 'Italy 🇮🇹',
      type: 'beach',
      vibe: 'Sun-drenched & Pastel',
      desc: 'Cliff-hugging pastel buildings descending into crystalline Mediterranean waves.',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80',
      badge: 'Coastal 🌊'
    },
    {
      id: 'dest-3',
      title: 'Lake Louise & Banff',
      country: 'Canada 🇨🇦',
      type: 'nature',
      vibe: 'Pristine & Alpine',
      desc: 'Vibrant turquoise glacial waters crowned by jagged snowy peaks and wild pine forests.',
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&auto=format&fit=crop&q=80',
      badge: 'Alpine 🌲'
    },
    {
      id: 'dest-4',
      title: 'Montmartre & Le Marais',
      country: 'Paris, France 🇫🇷',
      type: 'romantic',
      vibe: 'Artistic & Dreamy',
      desc: 'Cobblestone hills, warm flaky pain au chocolat, vintage bookstalls, and accordion melodies.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
      badge: 'Romantic 🥐'
    },
    {
      id: 'dest-5',
      title: 'Ubud Rice Terraces',
      country: 'Bali, Indonesia 🇮🇩',
      type: 'nature',
      vibe: 'Peaceful & Lush',
      desc: 'Emerald green cascading paddies, open-air yoga shalas, smoothie bowls, and frangipani blossoms.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
      badge: 'Tropical 🌿'
    },
    {
      id: 'dest-6',
      title: 'Hallstatt Lakeside',
      country: 'Austria 🇦🇹',
      type: 'culture',
      vibe: 'Fairytale & Misty',
      desc: 'A storybook 16th-century village nestled between towering Dachstein mountains and glass water.',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80',
      badge: 'Fairytale 🏰'
    }
  ]
};

// ================= DOM NAVIGATION =================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const page = link.getAttribute('data-page');
      navigateTo(page);
      if (mainNav.classList.contains('show')) {
        mainNav.classList.remove('show');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
    });
  }
}

function navigateTo(pageId) {
  state.activeView = pageId;

  // Toggle active view container
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${pageId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Update nav buttons
  document.querySelectorAll('.nav-link').forEach(btn => {
    if (btn.getAttribute('data-page') === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Specific render triggers
  if (pageId === 'itinerary') {
    renderItinerary();
  } else if (pageId === 'packing') {
    renderPackingList();
  } else if (pageId === 'budget') {
    renderBudget();
  } else if (pageId === 'trips') {
    renderMyTrips();
  } else if (pageId === 'destinations') {
    renderDestinations();
  }
}

// Toast helper
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ================= 1. PLAN TRIP FORM & LIVE PREVIEW =================
function initPlanTripForm() {
  const form = document.getElementById('planTripForm');
  const destInput = document.getElementById('tripDestination');
  const depInput = document.getElementById('departureDate');
  const retInput = document.getElementById('returnDate');
  const durationPreview = document.getElementById('tripDurationPreview');
  const travellersInput = document.getElementById('travellerCount');
  const styleSelect = document.getElementById('travelStyle');
  const paceSelect = document.getElementById('travelPace');

  // Preview elements
  const previewTitle = document.getElementById('previewTitle');
  const previewSubtitle = document.getElementById('previewSubtitle');
  const previewBadgeStyle = document.getElementById('previewBadgeStyle');
  const previewBadgePace = document.getElementById('previewBadgePace');

  // Pre-fill tomorrow and +5 days as friendly defaults
  const today = new Date();
  const depDefault = new Date(today);
  depDefault.setDate(today.getDate() + 14);
  const retDefault = new Date(today);
  retDefault.setDate(today.getDate() + 19);

  depInput.value = depDefault.toISOString().split('T')[0];
  retInput.value = retDefault.toISOString().split('T')[0];
  calculateDuration();

  function calculateDuration() {
    if (!depInput.value || !retInput.value) {
      durationPreview.value = 'Select dates...';
      return 0;
    }
    const d1 = new Date(depInput.value);
    const d2 = new Date(retInput.value);
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays > 0) {
      durationPreview.value = `${diffDays} Days / ${diffDays - 1} Nights`;
      return diffDays;
    } else {
      durationPreview.value = 'Return must be after departure';
      return 0;
    }
  }

  function updateLivePreview() {
    const dest = destInput.value.trim() || 'Kyoto, Japan';
    const days = calculateDuration() || 5;
    const count = travellersInput.value || 2;
    const style = styleSelect.value;
    const pace = paceSelect.value.split(' ')[0];

    previewTitle.textContent = dest;
    previewSubtitle.textContent = `${count} Travellers • ${days} Days`;
    previewBadgeStyle.textContent = style;
    previewBadgePace.textContent = pace;
  }

  destInput.addEventListener('input', updateLivePreview);
  depInput.addEventListener('change', updateLivePreview);
  retInput.addEventListener('change', updateLivePreview);
  travellersInput.addEventListener('input', updateLivePreview);
  styleSelect.addEventListener('change', updateLivePreview);
  paceSelect.addEventListener('change', updateLivePreview);

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const daysCount = calculateDuration();
    if (daysCount <= 0) {
      alert('Please check your dates! Return date must follow departure date.');
      return;
    }

    const newTrip = {
      id: 'trip-' + Date.now(),
      title: `${destInput.value} Holiday ✨`,
      destination: destInput.value,
      departureDate: depInput.value,
      returnDate: retInput.value,
      durationDays: daysCount,
      travellerType: document.getElementById('travellerType').value,
      travellerCount: parseInt(travellersInput.value, 10),
      travelStyle: styleSelect.value,
      accommodation: document.getElementById('accommodationType').value,
      pace: paceSelect.value,
      budgetAmount: parseFloat(document.getElementById('budgetAmount').value) || 2000,
      currency: document.getElementById('budgetCurrency').value === 'JPY' ? '¥' :
                document.getElementById('budgetCurrency').value === 'EUR' ? '€' :
                document.getElementById('budgetCurrency').value === 'GBP' ? '£' : '$',
      coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&auto=format&fit=crop&q=80',
      status: 'Ready to Pack 🎒',
      notes: document.getElementById('tripNotes').value || 'Collect pastel memories!',
      days: generateMockDays(destInput.value, daysCount, document.getElementById('accommodationType').value)
    };

    // Add to state and set active
    state.trips.unshift(newTrip);
    state.currentTripId = newTrip.id;
    state.selectedDayNumber = 1;

    showToast(`Trip to "${newTrip.destination}" saved to Scrapbook! 🌸`);
    navigateTo('itinerary');
  });
}

// Generate realistic day schedules for newly planned trips
function generateMockDays(city, count, hotel) {
  const days = [];
  const sampleActivities = [
    { m: 'Old Town Heritage Walk', ma: 'Historic Temple & Gardens', a: 'Local Artisan Pottery & Tea', aa: 'Scenic River Boat Tour', e: 'Candlelight Dinner & Street Food', ee: 'Night Market & Photography' },
    { m: 'Morning Bakery & Coffee Stroll', ma: 'Panoramic City Lookout', a: 'Museum of Fine Arts & Craft', aa: 'Botanical Garden Tram', e: 'Rooftop Lounge Sunset Drinks', ee: 'Acoustic Music in the Alley' },
    { m: 'Sunrise Hike & Forest Trail', ma: 'Alpine Lake Picnic', a: 'Cozy Bookstore Cafe Reading', aa: 'Vintage Flea Market Shopping', e: 'Comfort Food Tasting Platter', ee: 'Scrapbooking Under Starry Sky' }
  ];

  for (let i = 1; i <= count; i++) {
    const set = sampleActivities[(i - 1) % sampleActivities.length];
    days.push({
      dayNumber: i,
      dateLabel: `Day ${i}`,
      city: city,
      hotel: `🏡 ${hotel}`,
      morning: {
        time: '9:00 AM - 12:00 PM',
        activities: [
          { title: set.m, desc: `Start Day ${i} feeling refreshed in ${city}.`, tag: 'Morning' },
          { title: set.ma, desc: 'Capture aesthetic photos for your travel journal.', tag: 'Sight' }
        ]
      },
      afternoon: {
        time: '1:30 PM - 5:00 PM',
        activities: [
          { title: set.a, desc: 'Immerse in local textures, tastes, and handmade gifts.', tag: 'Explore' },
          { title: set.aa, desc: 'Slow down and enjoy the local rhythm.', tag: 'Afternoon' }
        ]
      },
      evening: {
        time: '6:30 PM - 9:30 PM',
        activities: [
          { title: set.e, desc: 'Savor regional delicacies and cozy conversation.', tag: 'Dinner' },
          { title: set.ee, desc: 'Wind down with tea and journal reflections.', tag: 'Evening' }
        ]
      }
    });
  }
  return days;
}

// ================= 2. ITINERARY VIEW =================
function renderItinerary() {
  const currentTrip = state.trips.find(t => t.id === state.currentTripId) || state.trips[0];
  if (!currentTrip) return;

  // Header
  document.getElementById('itineraryTripTitle').textContent = `🌸 ${currentTrip.title}`;
  document.getElementById('itineraryTripMeta').textContent = 
    `Destination: ${currentTrip.destination} • ${currentTrip.durationDays} Days • Stay: ${currentTrip.accommodation} • Pace: ${currentTrip.pace}`;

  // Trip Selector Dropdown
  const selector = document.getElementById('itineraryTripSelect');
  selector.innerHTML = state.trips.map(trip => 
    `<option value="${trip.id}" ${trip.id === currentTrip.id ? 'selected' : ''}>${trip.title} (${trip.durationDays}d)</option>`
  ).join('');

  selector.onchange = (e) => {
    state.currentTripId = e.target.value;
    state.selectedDayNumber = 1;
    renderItinerary();
  };

  // Day Tabs
  const dayTabsContainer = document.getElementById('dayTabsContainer');
  dayTabsContainer.innerHTML = currentTrip.days.map(d => `
    <button class="day-tab-btn ${d.dayNumber === state.selectedDayNumber ? 'active' : ''}" onclick="selectItineraryDay(${d.dayNumber})">
      <span class="tab-day">Day ${d.dayNumber}</span>
      <span class="tab-sub">${d.city.split(' ')[0]}</span>
    </button>
  `).join('');

  // Active Day Details
  const activeDay = currentTrip.days.find(d => d.dayNumber === state.selectedDayNumber) || currentTrip.days[0];
  const dayDetailContainer = document.getElementById('dayDetailContainer');

  dayDetailContainer.innerHTML = `
    <!-- Top Hotel & City Bar -->
    <div class="day-meta-card">
      <div class="meta-item">
        <div class="meta-icon-box">📍</div>
        <div class="meta-text">
          <strong>Base Location</strong>
          <span>${activeDay.city}</span>
        </div>
      </div>
      <div class="meta-item">
        <div class="meta-icon-box">🏨</div>
        <div class="meta-text">
          <strong>Resting Nest</strong>
          <span>${activeDay.hotel}</span>
        </div>
      </div>
    </div>

    <!-- Morning, Afternoon, Evening Cards -->
    <div class="time-slots-container">
      <!-- Morning -->
      <div class="slot-card">
        <div class="washi-tape washi-yellow top-center-tape"></div>
        <div class="slot-header">
          <span class="slot-badge slot-morning">☀️ Morning</span>
          <span class="slot-time">${activeDay.morning.time}</span>
        </div>
        <ul class="slot-activities-list">
          ${activeDay.morning.activities.map(act => `
            <li class="activity-item">
              <div class="activity-title">✨ ${act.title}</div>
              <p class="activity-desc">${act.desc}</p>
              <span class="activity-tag">${act.tag}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Afternoon -->
      <div class="slot-card">
        <div class="washi-tape washi-pink top-center-tape"></div>
        <div class="slot-header">
          <span class="slot-badge slot-afternoon">🌤️ Afternoon</span>
          <span class="slot-time">${activeDay.afternoon.time}</span>
        </div>
        <ul class="slot-activities-list">
          ${activeDay.afternoon.activities.map(act => `
            <li class="activity-item">
              <div class="activity-title">🍵 ${act.title}</div>
              <p class="activity-desc">${act.desc}</p>
              <span class="activity-tag">${act.tag}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Evening -->
      <div class="slot-card">
        <div class="washi-tape washi-teal top-center-tape"></div>
        <div class="slot-header">
          <span class="slot-badge slot-evening">🌙 Evening</span>
          <span class="slot-time">${activeDay.evening.time}</span>
        </div>
        <ul class="slot-activities-list">
          ${activeDay.evening.activities.map(act => `
            <li class="activity-item">
              <div class="activity-title">🏮 ${act.title}</div>
              <p class="activity-desc">${act.desc}</p>
              <span class="activity-tag">${act.tag}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

function selectItineraryDay(dayNum) {
  state.selectedDayNumber = dayNum;
  renderItinerary();
}

// ================= 3. PACKING LIST VIEW =================
function initPackingList() {
  const form = document.getElementById('addPackingForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newPackItemText');
    const cat = document.getElementById('newPackItemCategory').value;
    const text = input.value.trim();

    if (text) {
      state.packingItems.push({
        id: Date.now(),
        category: cat,
        text: text,
        done: false
      });
      input.value = '';
      renderPackingList();
      showToast('Added to your packing bag! 🎒');
    }
  });
}

function renderPackingList() {
  const container = document.getElementById('packingCategoriesGrid');
  const categories = [
    { id: 'essentials', title: '📑 Documents & Essentials', tape: 'washi-pink' },
    { id: 'clothing', title: '👗 Clothes & Footwear', tape: 'washi-yellow' },
    { id: 'electronics', title: '🔌 Tech & Gadgets', tape: 'washi-mint' },
    { id: 'toiletries', title: '🧴 Toiletries & Care', tape: 'washi-teal' },
    { id: 'fun', title: '🎨 Scrapbook & Extras', tape: 'washi-lavender' }
  ];

  // Update progress bar
  const totalItems = state.packingItems.length;
  const packedItems = state.packingItems.filter(i => i.done).length;
  const percent = totalItems ? Math.round((packedItems / totalItems) * 100) : 0;

  document.getElementById('packingCountText').textContent = `${packedItems} of ${totalItems} items packed`;
  document.getElementById('packingPercent').textContent = `${percent}%`;
  document.getElementById('packingBarFill').style.width = `${percent}%`;

  // Render categories
  container.innerHTML = categories.map(cat => {
    const items = state.packingItems.filter(i => i.category === cat.id);
    const catDone = items.filter(i => i.done).length;

    return `
      <div class="packing-category-box">
        <div class="washi-tape ${cat.tape} top-center-tape"></div>
        <div class="category-header-strip">
          <h4>${cat.title}</h4>
          <span class="category-count">${catDone}/${items.length}</span>
        </div>
        <ul class="checklist-items">
          ${items.length === 0 ? '<p style="font-size:0.88rem;color:var(--text-muted);font-style:italic;">No items here yet~</p>' : ''}
          ${items.map(item => `
            <li class="check-item ${item.done ? 'done' : ''}" onclick="togglePackingItem(${item.id})">
              <div class="check-label">
                <span class="custom-checkbox">${item.done ? '✓' : ''}</span>
                <span class="check-text">${item.text}</span>
              </div>
              <button class="delete-item-btn" onclick="deletePackingItem(event, ${item.id})" title="Delete item">&times;</button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

function togglePackingItem(itemId) {
  const item = state.packingItems.find(i => i.id === itemId);
  if (item) {
    item.done = !item.done;
    renderPackingList();
  }
}

function deletePackingItem(event, itemId) {
  event.stopPropagation();
  state.packingItems = state.packingItems.filter(i => i.id !== itemId);
  renderPackingList();
  showToast('Item removed 🗑️');
}

// ================= 4. BUDGET VIEW =================
function initBudget() {
  const form = document.getElementById('addExpenseForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('expenseTitle').value.trim();
    const cat = document.getElementById('expenseCategory').value;
    const amount = parseFloat(document.getElementById('expenseCost').value);

    if (title && amount > 0) {
      // Add expense
      state.budget.expenses.unshift({
        id: Date.now(),
        title: title,
        category: cat,
        amount: amount,
        date: 'Today'
      });

      // Update category spent
      if (state.budget.categories[cat]) {
        state.budget.categories[cat].spent += amount;
      }

      form.reset();
      renderBudget();
      showToast(`Logged $${amount} for ${title}! 🪙`);
    }
  });
}

function renderBudget() {
  const totalSpent = Object.values(state.budget.categories).reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = state.budget.total - totalSpent;

  document.getElementById('budgetTotalDisplay').textContent = `$${state.budget.total.toLocaleString()}`;
  document.getElementById('budgetSpentDisplay').textContent = `$${totalSpent.toLocaleString()}`;
  document.getElementById('budgetRemainingDisplay').textContent = `$${remaining.toLocaleString()}`;

  const remainingSub = document.getElementById('budgetRemainingSub');
  if (remaining >= 0) {
    remainingSub.textContent = 'Safe & ready to splurge! 🍰';
    remainingSub.style.color = '#3A9DA8';
  } else {
    remainingSub.textContent = 'A little over budget! Watch out! 🙈';
    remainingSub.style.color = '#FF7B95';
  }

  // Category breakdown meters
  const catList = document.getElementById('categoryBarsList');
  catList.innerHTML = Object.entries(state.budget.categories).map(([key, cat]) => {
    const percent = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));
    return `
      <div class="cat-bar-item">
        <div class="cat-bar-header">
          <span>${cat.name}</span>
          <span>$${cat.spent} / $${cat.allocated} (${percent}%)</span>
        </div>
        <div class="cat-track">
          <div class="cat-fill ${cat.colorClass}" style="width: ${percent}%;"></div>
        </div>
      </div>
    `;
  }).join('');

  // Recent expense receipts
  const expenseList = document.getElementById('recentExpenseList');
  expenseList.innerHTML = state.budget.expenses.slice(0, 7).map(exp => `
    <li class="recent-expense-item">
      <div>
        <span class="recent-expense-title">${exp.title}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">${exp.category} • ${exp.date}</span>
      </div>
      <span class="recent-expense-amount">$${exp.amount.toFixed(2)}</span>
    </li>
  `).join('');
}

// ================= 5. MY TRIPS VIEW =================
function renderMyTrips() {
  const container = document.getElementById('myTripsGrid');
  document.getElementById('tripsCountBadge').textContent = `${state.trips.length} Trips Saved`;

  container.innerHTML = state.trips.map(trip => `
    <div class="trip-polaroid-card">
      <div class="washi-tape washi-yellow center-tape"></div>
      <img src="${trip.coverImage}" alt="${trip.title}">
      <div class="trip-card-body">
        <span class="trip-status-tag badge-pink">${trip.status}</span>
        <h3 class="trip-card-title">${trip.title}</h3>
        <p class="trip-card-dates">📅 ${trip.departureDate} &rarr; ${trip.returnDate} (${trip.durationDays} Days)</p>
        <div class="trip-card-badges">
          <span class="badge badge-mint">${trip.travelStyle}</span>
          <span class="badge badge-yellow">${trip.travellerCount} ${trip.travellerType}</span>
          <span class="badge badge-teal">${trip.currency}${trip.budgetAmount}</span>
        </div>
        <div class="trip-card-footer">
          <button class="btn btn-sm btn-pink" onclick="openTripItinerary('${trip.id}')">📖 Open Itinerary</button>
          <button class="btn btn-sm btn-outline" onclick="deleteTrip('${trip.id}')" title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openTripItinerary(tripId) {
  state.currentTripId = tripId;
  state.selectedDayNumber = 1;
  navigateTo('itinerary');
}

function deleteTrip(tripId) {
  if (state.trips.length <= 1) {
    alert('Keep at least one trip in your scrapbook journal!');
    return;
  }
  if (confirm('Are you sure you want to remove this trip from your journal?')) {
    state.trips = state.trips.filter(t => t.id !== tripId);
    if (state.currentTripId === tripId) {
      state.currentTripId = state.trips[0].id;
    }
    renderMyTrips();
    showToast('Trip archived from journal 🧸');
  }
}

// ================= 6. DESTINATIONS VIEW =================
function initDestinations() {
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      renderDestinations(filter);
    });
  });
}

function renderDestinations(filter = 'all') {
  const container = document.getElementById('destinationsGrid');
  const filtered = filter === 'all' 
    ? state.destinations 
    : state.destinations.filter(d => d.type === filter);

  container.innerHTML = filtered.map(d => `
    <div class="dest-card">
      <div class="dest-img-wrap">
        <img src="${d.image}" alt="${d.title}">
        <span class="dest-tag-float">${d.badge}</span>
      </div>
      <div class="dest-body">
        <h3>${d.title}</h3>
        <div class="dest-country">${d.country}</div>
        <p class="dest-desc">${d.desc}</p>
        <div class="dest-card-bottom">
          <span class="dest-vibe">✨ ${d.vibe}</span>
          <button class="btn btn-sm btn-pink" onclick="quickPlanDestination('${d.title}')">Plan Here &rarr;</button>
        </div>
      </div>
    </div>
  `).join('');
}

function quickPlanDestination(destName) {
  navigateTo('plan');
  const destInput = document.getElementById('tripDestination');
  if (destInput) {
    destInput.value = destName;
    destInput.dispatchEvent(new Event('input'));
  }
  showToast(`Loaded ${destName} into your planner! ✏️`);
}

// ================= APP INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPlanTripForm();
  initPackingList();
  initBudget();
  initDestinations();

  // Render initial view components
  renderItinerary();
  renderPackingList();
  renderBudget();
  renderMyTrips();
  renderDestinations();
});
