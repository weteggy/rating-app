// RateIt - Social Rating App
// ========================================

// Mock Data
const mockUsers = [
  { id: 1, name: 'Alex Chen', username: 'alexc', avatar: 'AC', color: 'yellow', bio: 'Food explorer 🍜', followers: 1243, following: 892 },
  { id: 2, name: 'Maya Patel', username: 'mayap', avatar: 'MP', color: 'blue', bio: 'Movie buff 🎬', followers: 3421, following: 234 },
  { id: 3, name: 'Jordan Smith', username: 'jordans', avatar: 'JS', color: 'red', bio: 'Travel addict ✈️', followers: 8932, following: 445 },
  { id: 4, name: 'Sam Rivera', username: 'samr', avatar: 'SR', color: 'purple', bio: 'Coffee snob ☕', followers: 2156, following: 678 },
  { id: 5, name: 'Taylor Kim', username: 'taylork', avatar: 'TK', color: 'orange', bio: 'Tech reviewer 📱', followers: 15234, following: 123 }
];

const currentUser = { id: 0, name: 'You', username: 'yourname', avatar: '👤', bio: 'Rate enthusiast ⭐', followers: 542, following: 321 };

const ratingLabels = ['', 'Not great', 'Okay', 'Good', 'Great!', 'Amazing!'];

const mockRatings = [
  { id: 1, userId: 1, experience: 'Ramen at Ichiran', category: 'food', rating: 5, caption: 'Best tonkotsu ramen I\'ve ever had! The broth was incredible.', likes: 234, comments: 45, time: '2h', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop', tags: ['ramen', 'japanese', 'mustvisit'] },
  { id: 2, userId: 3, experience: 'Sunset at Santorini', category: 'places', rating: 5, caption: 'No filter needed. Just pure magic ✨', likes: 892, comments: 123, time: '4h', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop', tags: ['travel', 'sunset', 'greece'] },
  { id: 3, userId: 2, experience: 'Dune: Part Two', category: 'movies', rating: 4, caption: 'Visually stunning! Hans Zimmer outdid himself.', likes: 567, comments: 89, time: '6h', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop', tags: ['movies', 'scifi', 'cinema'] },
  { id: 4, userId: 4, experience: 'Blue Bottle Coffee', category: 'food', rating: 4, caption: 'Perfect pour-over. Worth the wait.', likes: 123, comments: 34, time: '8h', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop', tags: ['coffee', 'specialty'] },
  { id: 5, userId: 5, experience: 'iPhone 16 Pro', category: 'products', rating: 4, caption: 'Great camera, amazing battery life.', likes: 1234, comments: 234, time: '12h', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop', tags: ['tech', 'apple', 'review'] }
];

const mockComments = {
  1: [
    { userId: 2, text: 'Need to try this place! 🍜', time: '1h' },
    { userId: 3, text: 'The best ramen in town!', time: '2h' },
    { userId: 4, text: 'Adding to my list', time: '2h' }
  ],
  2: [
    { userId: 1, text: 'Breathtaking view! 😍', time: '3h' },
    { userId: 4, text: 'Greece is on my bucket list', time: '4h' }
  ],
  3: [
    { userId: 1, text: 'Cant wait to watch this!', time: '5h' },
    { userId: 5, text: 'The IMAX experience was unreal', time: '6h' }
  ]
};

const mockNotifications = [
  { id: 1, type: 'like', userId: 2, action: 'liked your rating', target: 'Coffee at Starbucks', time: '2m' },
  { id: 2, type: 'follow', userId: 3, action: 'started following you', time: '15m' },
  { id: 3, type: 'comment', userId: 1, action: 'commented: "Need to try this!"', target: 'Pizza at Lucali', time: '1h' },
  { id: 4, type: 'like', userId: 5, action: 'liked your rating', target: 'Sunset at Venice Beach', time: '3h' },
  { id: 5, type: 'follow', userId: 4, action: 'started following you', time: '5h' }
];

const myRatings = [
  { id: 101, experience: 'Pizza at Lucali', category: 'food', rating: 5, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  { id: 102, experience: 'Coffee at Starbucks', category: 'food', rating: 3, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
  { id: 103, experience: 'Sunset at Venice Beach', category: 'places', rating: 5, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop' },
  { id: 104, experience: 'The Batman', category: 'movies', rating: 4, image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&h=200&fit=crop' },
  { id: 105, experience: 'AirPods Pro', category: 'products', rating: 5, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop' },
  { id: 106, experience: 'Tacos at La Taqueria', category: 'food', rating: 4, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200&h=200&fit=crop' }
];

const categoryEmojis = { food: '🍕', places: '📍', movies: '🎬', products: '📦', other: '✨' };

// State
let selectedRating = 0;
let likedRatings = new Set();
let currentOnboardingSlide = 0;
let currentCommentsRatingId = null;

// DOM Elements
const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item[data-view]');
const addRatingBtn = document.getElementById('addRatingBtn');
const ratingModal = document.getElementById('ratingModal');
const modalClose = document.getElementById('modalClose');
const shareRating = document.getElementById('shareRating');
const starRating = document.getElementById('starRating');
const experienceInput = document.getElementById('experienceInput');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchCancel = document.getElementById('searchCancel');
const searchInput = document.getElementById('searchInput');
const notificationsBtn = document.getElementById('notificationsBtn');
const notificationsPanel = document.getElementById('notificationsPanel');
const notificationsPanelClose = document.getElementById('notificationsPanelClose');
const commentsPanel = document.getElementById('commentsPanel');
const commentsPanelClose = document.getElementById('commentsPanelClose');
const commentInput = document.getElementById('commentInput');
const commentSend = document.getElementById('commentSend');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const settingsPanelClose = document.getElementById('settingsPanelClose');
const onboardingOverlay = document.getElementById('onboardingOverlay');
const onboardingBtn = document.getElementById('onboardingBtn');
const onboardingSkip = document.getElementById('onboardingSkip');
const darkModeToggle = document.getElementById('darkModeToggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkOnboarding();
  checkDarkMode();
  renderFeed();
  renderNotifications();
  renderProfile();
  setupEventListeners();
});

// Check Dark Mode
function checkDarkMode() {
  const isDark = localStorage.getItem('rateit_darkmode') === 'true';
  const toggle = document.getElementById('darkModeToggle');
  if (isDark) {
    document.body.classList.add('dark-mode');
    if (toggle) toggle.classList.add('active');
  }
}

// Check if onboarding should show
function checkOnboarding() {
  const hasOnboarded = localStorage.getItem('rateit_onboarded');
  if (hasOnboarded) {
    onboardingOverlay.classList.add('hidden');
  }
}

// Onboarding
function nextOnboardingSlide() {
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots = document.querySelectorAll('.dot');

  if (currentOnboardingSlide < 2) {
    currentOnboardingSlide++;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentOnboardingSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentOnboardingSlide));

    if (currentOnboardingSlide === 2) {
      onboardingBtn.textContent = 'Get Started';
    }
  } else {
    completeOnboarding();
  }
}

function completeOnboarding() {
  localStorage.setItem('rateit_onboarded', 'true');
  onboardingOverlay.classList.add('hidden');
}

// Navigation
function switchView(viewId) {
  views.forEach(v => v.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  document.querySelector(`[data-view="${viewId}"]`).classList.add('active');
}

// Render Feed
function renderFeed() {
  const feedContainer = document.getElementById('feedContainer');
  feedContainer.innerHTML = mockRatings.map(rating => {
    const user = mockUsers.find(u => u.id === rating.userId);
    const stars = '★'.repeat(rating.rating);
    const isLiked = likedRatings.has(rating.id);
    const tags = rating.tags || [];

    return `
      <article class="rating-card">
        <div class="card-header">
          <div class="card-avatar ${user.color}">${user.avatar}</div>
          <div class="card-user-info">
            <div class="card-username">${user.name}</div>
            <h3 class="card-title">${rating.experience}</h3>
          </div>
          <div class="card-rating-badge">
            <span class="stars">${stars}</span>
          </div>
        </div>
        ${rating.image ? `
        <div class="card-image">
          <img src="${rating.image}" alt="${rating.experience}" loading="lazy">
        </div>
        ` : ''}
        <div class="card-body">
          <p class="card-caption">${rating.caption}</p>
          <div class="card-tags">
            <span class="tag category">${categoryEmojis[rating.category] || '✨'} ${rating.category}</span>
            ${tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
          </div>
          <div class="card-actions">
            <button class="action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${rating.id}, this)">
              <svg viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>${isLiked ? rating.likes + 1 : rating.likes}</span>
            </button>
            <button class="action-btn" onclick="openComments(${rating.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>${rating.comments}</span>
            </button>
            <button class="action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
            <span class="card-timestamp">${rating.time} ago</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Toggle Like
function toggleLike(ratingId, btn) {
  if (likedRatings.has(ratingId)) {
    likedRatings.delete(ratingId);
    btn.classList.remove('liked');
  } else {
    likedRatings.add(ratingId);
    btn.classList.add('liked');
  }
  renderFeed();
}

// Comments
function openComments(ratingId) {
  currentCommentsRatingId = ratingId;
  renderComments(ratingId);
  commentsPanel.classList.add('active');
}

function renderComments(ratingId) {
  const commentsList = document.getElementById('commentsList');
  const comments = mockComments[ratingId] || [];

  if (comments.length === 0) {
    commentsList.innerHTML = `
      <div class="empty-comments">
        <div class="empty-icon">💬</div>
        <p>No comments yet</p>
        <p>Be the first to comment!</p>
      </div>
    `;
    return;
  }

  commentsList.innerHTML = comments.map(comment => {
    const user = mockUsers.find(u => u.id === comment.userId);
    return `
      <div class="comment-item">
        <div class="comment-avatar">${user.avatar}</div>
        <div class="comment-content">
          <div class="comment-username">${user.name}</div>
          <div class="comment-text">${comment.text}</div>
          <div class="comment-time">${comment.time} ago</div>
        </div>
      </div>
    `;
  }).join('');
}

function addComment() {
  const text = commentInput.value.trim();
  if (!text || !currentCommentsRatingId) return;

  if (!mockComments[currentCommentsRatingId]) {
    mockComments[currentCommentsRatingId] = [];
  }

  mockComments[currentCommentsRatingId].unshift({
    userId: 0,
    text: text,
    time: 'Just now'
  });

  // Add current user to mockUsers if not present
  if (!mockUsers.find(u => u.id === 0)) {
    mockUsers.push({ id: 0, name: 'You', avatar: '👤', color: 'yellow' });
  }

  commentInput.value = '';
  renderComments(currentCommentsRatingId);

  // Update comment count
  const rating = mockRatings.find(r => r.id === currentCommentsRatingId);
  if (rating) rating.comments++;
  renderFeed();
}

// Render Notifications
function renderNotifications() {
  const notificationsList = document.getElementById('notificationsList');
  notificationsList.innerHTML = mockNotifications.map(notif => {
    const user = mockUsers.find(u => u.id === notif.userId);
    return `
      <div class="notification-item">
        <div class="notification-avatar" style="background: var(--primary-yellow);">${user.avatar}</div>
        <div class="notification-content">
          <p class="notification-text"><strong>${user.name}</strong> ${notif.action}</p>
          <span class="notification-time">${notif.time} ago</span>
        </div>
        ${notif.type === 'follow' ? '<button class="notification-action">Follow</button>' : ''}
      </div>
    `;
  }).join('');
}

// Render Profile
function renderProfile() {
  document.getElementById('profileAvatar').textContent = '👤';
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileBio').textContent = currentUser.bio;
  document.getElementById('ratingsCount').textContent = myRatings.length;
  document.getElementById('followersCount').textContent = currentUser.followers;
  document.getElementById('followingCount').textContent = currentUser.following;

  // Calculate stats
  const avgRating = (myRatings.reduce((sum, r) => sum + r.rating, 0) / myRatings.length).toFixed(1);
  const fiveStarCount = myRatings.filter(r => r.rating === 5).length;
  const distribution = [1, 2, 3, 4, 5].map(n => myRatings.filter(r => r.rating === n).length);
  const maxDist = Math.max(...distribution, 1);
  const categories = {};
  myRatings.forEach(r => { categories[r.category] = (categories[r.category] || 0) + 1; });
  const top5 = [...myRatings].sort((a, b) => b.rating - a.rating).slice(0, 5);

  // Update stats
  document.getElementById('avgRating').textContent = avgRating;
  document.getElementById('avgRatingBar').style.width = `${(avgRating / 5) * 100}%`;
  document.getElementById('fiveStarCount').textContent = fiveStarCount;
  document.getElementById('thisMonthCount').textContent = myRatings.length;

  // Top 5
  const rankClasses = ['gold', 'silver', 'bronze', '', ''];
  document.getElementById('topExperiences').innerHTML = top5.map((item, i) => `
    <div class="top-experience-item">
      <div class="top-rank ${rankClasses[i]}">${i + 1}</div>
      <div class="top-experience-info">
        <div class="top-experience-name">${item.experience}</div>
        <div class="top-experience-category">${categoryEmojis[item.category] || '✨'} ${item.category}</div>
      </div>
      <div class="top-experience-stars">${'★'.repeat(item.rating)}</div>
    </div>
  `).join('');

  // Distribution
  const distClasses = ['one', 'two', 'three', 'four', 'five'];
  document.getElementById('ratingDistribution').innerHTML = [5, 4, 3, 2, 1].map(n => `
    <div class="distribution-row">
      <div class="distribution-label"><span class="star">★</span> ${n}</div>
      <div class="distribution-bar">
        <div class="distribution-fill ${distClasses[n - 1]}" style="width: ${(distribution[n - 1] / maxDist) * 100}%"></div>
      </div>
      <div class="distribution-count">${distribution[n - 1]}</div>
    </div>
  `).join('');

  // Categories
  document.getElementById('categoryBreakdown').innerHTML = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, count]) => `
      <div class="category-tag">
        <span class="emoji">${categoryEmojis[cat] || '✨'}</span>
        <span>${cat}</span>
        <span class="count">${count}</span>
      </div>
    `).join('');

  // Grid
  document.getElementById('profileRatingsGrid').innerHTML = myRatings.map(item => `
    <div class="profile-rating-item">
      <img src="${item.image}" alt="${item.experience}" loading="lazy">
      <div class="rating-badge"><span class="star">★</span> ${item.rating}</div>
    </div>
  `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation
  navItems.forEach(item => {
    item.addEventListener('click', () => switchView(item.dataset.view));
  });

  // Add Rating Modal
  addRatingBtn.addEventListener('click', () => ratingModal.classList.add('active'));
  modalClose.addEventListener('click', closeModal);
  ratingModal.addEventListener('click', (e) => {
    if (e.target === ratingModal) closeModal();
  });

  // Star Rating
  const stars = starRating.querySelectorAll('.star');
  stars.forEach((star, i) => {
    star.addEventListener('mouseenter', () => highlightStars(i + 1));
    star.addEventListener('mouseleave', () => highlightStars(selectedRating));
    star.addEventListener('click', () => selectRating(i + 1));
  });

  // Share
  shareRating.addEventListener('click', submitRating);
  experienceInput.addEventListener('input', updateShareButton);

  // Search
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
  });
  searchCancel.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
  });
  searchInput.addEventListener('input', handleSearch);

  // Notifications
  notificationsBtn.addEventListener('click', () => notificationsPanel.classList.add('active'));
  notificationsPanelClose.addEventListener('click', () => notificationsPanel.classList.remove('active'));

  // Comments
  commentsPanelClose.addEventListener('click', () => commentsPanel.classList.remove('active'));
  commentSend.addEventListener('click', addComment);
  commentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addComment();
  });

  // Settings
  settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.add('active');
    showSettingsView('settingsMainView');
  });
  settingsPanelClose.addEventListener('click', () => settingsPanel.classList.remove('active'));

  // Settings Sub-navigation
  const settingsItems = document.querySelectorAll('.settings-item[data-subpanel]');
  settingsItems.forEach(item => {
    item.addEventListener('click', () => {
      const subpanelId = item.dataset.subpanel;
      showSettingsView(subpanelId);
    });
  });

  const backButtons = document.querySelectorAll('.subpanel-back');
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => showSettingsView('settingsMainView'));
  });

  // Profile Editing
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const editNameInput = document.getElementById('editNameInput');
  const editBioInput = document.getElementById('editBioInput');

  // Fill inputs when opening edit panel
  document.querySelector('[data-subpanel="editProfilePanel"]').addEventListener('click', () => {
    editNameInput.value = currentUser.name;
    editBioInput.value = currentUser.bio;
  });

  saveProfileBtn.addEventListener('click', () => {
    const newName = editNameInput.value.trim();
    const newBio = editBioInput.value.trim();
    if (newName) {
      currentUser.name = newName;
      currentUser.bio = newBio;
      renderProfile();
      showSettingsView('settingsMainView');
      alert('Profile updated successfully!');
    }
  });

  darkModeToggle.addEventListener('click', () => {
    const isNowDark = document.body.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('active', isNowDark);
    localStorage.setItem('rateit_darkmode', isNowDark);
  });

  // Onboarding
  onboardingBtn.addEventListener('click', nextOnboardingSlide);
  onboardingSkip.addEventListener('click', completeOnboarding);
}

// Show specific settings view (main or sub-panel)
function showSettingsView(viewId) {
  const views = document.querySelectorAll('.settings-view');
  views.forEach(v => {
    v.classList.remove('active');
    if (v.id === viewId) v.classList.add('active');
  });
}

// Star Rating
function highlightStars(count) {
  const stars = starRating.querySelectorAll('.star');
  stars.forEach((star, i) => star.classList.toggle('hovered', i < count));
}

function selectRating(rating) {
  selectedRating = rating;
  const stars = starRating.querySelectorAll('.star');
  stars.forEach((star, i) => {
    star.classList.toggle('selected', i < rating);
    star.classList.remove('hovered');
  });
  updateShareButton();
}

function updateShareButton() {
  const canShare = selectedRating > 0 && experienceInput.value.trim().length > 0;
  shareRating.classList.toggle('active', canShare);
}

// Submit Rating
function submitRating() {
  if (selectedRating === 0 || !experienceInput.value.trim()) return;

  const category = document.getElementById('categorySelect').value;
  const newRating = {
    id: Date.now(),
    userId: 0,
    experience: experienceInput.value.trim(),
    category: category,
    rating: selectedRating,
    caption: document.getElementById('captionInput').value.trim() || 'No description added.',
    likes: 0,
    comments: 0,
    time: 'Just now',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
    tags: [category]
  };

  myRatings.unshift({ id: newRating.id, experience: newRating.experience, category: newRating.category, rating: newRating.rating, image: newRating.image });
  mockRatings.unshift(newRating);
  if (!mockUsers.find(u => u.id === 0)) {
    mockUsers.push({ id: 0, name: 'You', avatar: '👤', color: 'yellow' });
  }

  renderFeed();
  renderProfile();
  closeModal();
  switchView('homeView');
}

function closeModal() {
  ratingModal.classList.remove('active');
  selectedRating = 0;
  experienceInput.value = '';
  document.getElementById('captionInput').value = '';
  starRating.querySelectorAll('.star').forEach(s => s.classList.remove('selected', 'hovered'));
  updateShareButton();
}

// Search
function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const results = document.getElementById('searchResults');

  if (!query) {
    results.innerHTML = '<div class="search-placeholder"><p>Try searching for "coffee" or "pizza"</p></div>';
    return;
  }

  const matchedUsers = mockUsers.filter(u => u.name.toLowerCase().includes(query) || u.username.toLowerCase().includes(query));
  const matchedRatings = [...mockRatings, ...myRatings].filter(r => r.experience.toLowerCase().includes(query));

  let html = '';
  if (matchedUsers.length) {
    html += matchedUsers.map(u => `
      <div class="search-result-item">
        <div class="search-result-avatar">${u.avatar}</div>
        <div class="search-result-info">
          <div class="search-result-name">${u.name}</div>
          <div class="search-result-sub">@${u.username}</div>
        </div>
      </div>
    `).join('');
  }
  if (matchedRatings.length) {
    html += matchedRatings.slice(0, 5).map(r => `
      <div class="search-result-item">
        <div class="search-result-avatar" style="background:var(--primary-red);color:var(--text-inverse);">★</div>
        <div class="search-result-info">
          <div class="search-result-name">${r.experience}</div>
          <div class="search-result-sub">${'★'.repeat(r.rating)} • ${r.category || 'Rating'}</div>
        </div>
      </div>
    `).join('');
  }

  results.innerHTML = html || '<div class="search-placeholder"><p>No results found</p></div>';
}
