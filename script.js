/* =============================================
  CampusConnect — script.js
   ============================================= */

/* ---------- Persistent State (localStorage) ---------- */
let joinedClubs      = JSON.parse(localStorage.getItem("cc_clubs"))   || [];
let registeredEvents = JSON.parse(localStorage.getItem("cc_events"))  || [];

/* ---------- Club Database ---------- */
const clubs = {
  Startup: {
    name: "Startup Club", category: "Entrepreneurship", badge: "badge-social",
    image: "https://i.pinimg.com/736x/6f/58/23/6f5823b69237ab77035cceccde359a00.jpg",
    description: "The Startup Club encourages innovation and entrepreneurship. Students collaborate on business ideas, attend mentoring sessions and participate in startup competitions.",
    activities: ["Startup bootcamps","Pitch competitions","Entrepreneur talks","Business model workshops"],
    mentor: "Prof. Rahul Sharma",
    achievements: [
      { title:"Startup Incubation Winners", text:"Three teams secured incubation funding for their startups." },
      { title:"National Pitch Competition",  text:"Members reached the finals of a national startup pitch competition." }
    ]
  },
  Hackathon: {
    name: "Hackathon Club", category: "Technical", badge: "badge-technical",
    image: "https://i.pinimg.com/736x/07/24/08/0724084c00c27f93d3b705282edf2179.jpg",
    description: "Hackathon Club organizes coding competitions and collaborative programming challenges for builders who love shipping fast.",
    activities: ["24-hour hackathons","Coding competitions","Open-source collaboration","Technical workshops"],
    mentor: "Prof. Anita Verma",
    achievements: [
      { title:"Hackathon Champions",       text:"Students won first place in an inter-university hackathon." },
      { title:"Open Source Contributions", text:"Club members actively contribute to global open-source projects." }
    ]
  },
  DSA: {
    name: "DSA Club", category: "Technical", badge: "badge-technical",
    image: "https://i.pinimg.com/736x/92/d8/01/92d801751fdc7ec2988ca52eaca636a6.jpg",
    description: "The DSA Club focuses on algorithmic problem solving, competitive programming and technical interview preparation.",
    activities: ["Competitive coding practice","Algorithm workshops","Programming contests","Interview preparation sessions"],
    mentor: "Prof. Karan Gupta",
    achievements: [
      { title:"Code Competition Winners", text:"Members ranked in the top 50 of national coding contests." },
      { title:"Placement Success",        text:"Several students secured top tech placements through strong DSA skills." }
    ]
  },
  AI: {
    name: "AI & ML Club", category: "Technical", badge: "badge-technical",
    image: "https://i.pinimg.com/736x/7d/7c/71/7d7c71fd196d34478dad77e5077f4a79.jpg",
    description: "Students explore artificial intelligence technologies, build machine learning models and participate in research projects.",
    activities: ["AI workshops","Machine learning projects","Research collaboration","Industry seminars"],
    mentor: "Prof. Neha Singh",
    achievements: [
      { title:"AI Research Paper",   text:"Club members published a student research paper on machine learning." },
      { title:"AI Model Showcase",   text:"Students developed innovative AI models presented at tech expos." }
    ]
  },
  Cyber: {
    name: "Cyber Security Club", category: "Technical", badge: "badge-technical",
    image: "https://i.pinimg.com/736x/2b/37/0b/2b370b5ba4231b95642b94a1667b9075.jpg",
    description: "Cyber Security Club focuses on ethical hacking, security awareness and cyber defense strategies.",
    activities: ["Ethical hacking sessions","Security challenges","Capture the flag competitions","Cyber awareness programs"],
    mentor: "Prof. Aditya Rao",
    achievements: [
      { title:"Capture The Flag Winners", text:"Members won several cybersecurity CTF competitions." },
      { title:"Security Workshop",        text:"The club hosted ethical hacking workshops for over 200 students." }
    ]
  },
  Robotics: {
    name: "Robotics Club", category: "Technical", badge: "badge-technical",
    image: "https://i.pinimg.com/1200x/60/a7/6d/60a76d676ebda38f911b5305b3381252.jpg",
    description: "Robotics Club builds autonomous robots and automation systems, and competes in engineering showcases.",
    activities: ["Robot design competitions","Arduino workshops","Automation projects","Engineering showcases"],
    mentor: "Prof. Vikram Mehta",
    achievements: [
      { title:"Robotics Competition", text:"The team built an autonomous robot that won a university robotics contest." },
      { title:"Engineering Expo",     text:"Students showcased multiple robotics prototypes at tech exhibitions." }
    ]
  },
  Cultural: {
    name: "Cultural Club", category: "Cultural", badge: "badge-cultural",
    image: "https://i.pinimg.com/1200x/37/a7/7b/37a77bb7891461868bc5d8973f2e00ec.jpg",
    description: "Cultural Club promotes performing arts including music, dance and theatre, celebrating campus creativity.",
    activities: ["Dance competitions","Music performances","Theatre productions","Cultural festivals"],
    mentor: "Prof. Ritu Malhotra",
    achievements: [
      { title:"Inter-University Dance Winners", text:"The dance team secured first place in a cultural festival." },
      { title:"Theatre Showcase",               text:"Students performed award-winning theatre productions." }
    ]
  },
  Sports: {
    name: "Sports Club", category: "Sports", badge: "badge-sports",
    image: "https://i.pinimg.com/736x/4e/7a/b4/4e7ab4bebbd3163982019a6b90a39e76.jpg",
    description: "Sports Club promotes athletic participation, organises tournaments and builds team spirit across all sports.",
    activities: ["Football tournaments","Cricket leagues","Athletics competitions","Sports festivals"],
    mentor: "Prof. Arjun Kapoor",
    achievements: [
      { title:"Football Champions",    text:"The club football team won the inter-university championship." },
      { title:"Athletics Medalists",   text:"Members won multiple medals in regional sports competitions." }
    ]
  }
};

/* ---------- Save helpers ---------- */
function saveState() {
  localStorage.setItem("cc_clubs",  JSON.stringify(joinedClubs));
  localStorage.setItem("cc_events", JSON.stringify(registeredEvents));
}

/* ---------- Toast notification ---------- */
function showToast(msg, type) {
  type = type || "success";
  var old = document.getElementById("cc-toast");
  if (old) old.remove();
  var toast = document.createElement("div");
  toast.id = "cc-toast";
  toast.className = "cc-toast cc-toast-" + type;
  toast.innerHTML = (type === "success" ? "✅ " : "ℹ️ ") + msg;
  document.body.appendChild(toast);
  setTimeout(function(){ toast.classList.add("show"); }, 10);
  setTimeout(function(){
    toast.classList.remove("show");
    setTimeout(function(){ toast.remove(); }, 400);
  }, 3000);
}

/* ---------- JOIN CLUB ---------- */
function joinClub(key) {
  if (joinedClubs.includes(key)) {
    showToast("You have already joined " + clubs[key].name + "!", "info");
    return;
  }
  joinedClubs.push(key);
  saveState();
  showToast("You joined " + clubs[key].name + "! Check your Dashboard.", "success");
  updateDashboard();
  // Update all join buttons for this club
  document.querySelectorAll(".join-btn[data-club='" + key + "']").forEach(function(btn){
    btn.textContent = "✓ Joined";
    btn.classList.add("btn-joined");
    btn.disabled = true;
  });
  // Also update details page join button if present
  var joinBtn = document.getElementById("joinBtn");
  if (joinBtn && joinBtn.getAttribute("data-club") === key) {
    joinBtn.textContent = "✓ Joined!";
    joinBtn.classList.add("btn-joined");
    joinBtn.disabled = true;
  }
}

/* ---------- LEAVE CLUB ---------- */
function leaveClub(key) {
  joinedClubs = joinedClubs.filter(function(c){ return c !== key; });
  saveState();
  showToast("You left " + clubs[key].name + ".", "info");
  updateDashboard();
  renderDashboardClubs();
}

/* ---------- EVENT REGISTRATION ---------- */
function registerEvent(name) {
  if (registeredEvents.includes(name)) {
    showToast("Already registered for " + name + "!", "info");
    return;
  }
  registeredEvents.push(name);
  saveState();
  showToast("Registered for " + name + "! See you there.", "success");
  updateDashboard();
  document.querySelectorAll(".register-btn[data-event='" + name + "']").forEach(function(btn){
    btn.textContent = "✓ Registered";
    btn.classList.add("btn-joined");
    btn.disabled = true;
  });
}

/* ---------- CANCEL EVENT ---------- */
function cancelEvent(name) {
  registeredEvents = registeredEvents.filter(function(e){ return e !== name; });
  saveState();
  showToast("Registration cancelled for " + name + ".", "info");
  updateDashboard();
  renderDashboardEvents();
}

/* ---------- ATTENDANCE ---------- */
var attendance = JSON.parse(localStorage.getItem("cc_attendance")) || {};

function markAttendance(clubKey) {
  if (!attendance[clubKey]) attendance[clubKey] = 0;
  attendance[clubKey]++;
  localStorage.setItem("cc_attendance", JSON.stringify(attendance));
  showToast("Attendance marked for " + clubs[clubKey].name + "! Total: " + attendance[clubKey], "success");
  renderAttendanceTable();
}

function renderAttendanceTable() {
  var tbody = document.getElementById("attendanceTableBody");
  if (!tbody) return;
  if (joinedClubs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:20px;color:#94a3b8;">Join clubs to track attendance.</td></tr>';
    return;
  }
  tbody.innerHTML = joinedClubs.map(function(key){
    var c = clubs[key];
    if (!c) return "";
    var count = attendance[key] || 0;
    return '<tr>' +
      '<td>' + c.name + '</td>' +
      '<td><span class="badge ' + c.badge + '">' + c.category + '</span></td>' +
      '<td><span class="attendance-count">' + count + '</span>' +
      '<button class="btn btn-sm mark-btn" onclick="markAttendance(\'' + key + '\')">+ Mark</button></td>' +
      '</tr>';
  }).join("");
}

/* ---------- DASHBOARD ---------- */
function updateDashboard() {
  var clubCountEl  = document.getElementById("clubCount");
  var eventCountEl = document.getElementById("attendanceCount");
  var recentClubEl = document.getElementById("recentClub");
  var recentEvtEl  = document.getElementById("recentEvent");
  if (clubCountEl)  clubCountEl.textContent  = joinedClubs.length;
  if (eventCountEl) eventCountEl.textContent = registeredEvents.length;
  if (recentClubEl) {
    recentClubEl.textContent = joinedClubs.length > 0
      ? (clubs[joinedClubs[joinedClubs.length-1]] || {}).name || "—"
      : "No clubs joined yet.";
  }
  if (recentEvtEl) {
    recentEvtEl.textContent = registeredEvents.length > 0
      ? registeredEvents[registeredEvents.length-1]
      : "No events registered yet.";
  }
}

function renderDashboardClubs() {
  var container = document.getElementById("joinedClubsList");
  if (!container) return;
  if (joinedClubs.length === 0) {
    container.innerHTML = '<p class="empty-msg">You haven\'t joined any clubs yet. <a href="clubs.html">Browse clubs →</a></p>';
    return;
  }
  container.innerHTML = joinedClubs.map(function(key){
    var c = clubs[key];
    if (!c) return "";
    return '<div class="joined-club-card">' +
      '<img src="' + c.image + '" alt="' + c.name + '">' +
      '<div class="jc-info">' +
        '<span class="badge ' + c.badge + '">' + c.category + '</span>' +
        '<h4>' + c.name + '</h4>' +
        '<p>Mentor: ' + c.mentor + '</p>' +
      '</div>' +
      '<div class="jc-actions">' +
        '<a href="club-details.html?club=' + key + '"><button class="btn btn-sm">Details</button></a>' +
        '<button class="btn btn-sm btn-danger" onclick="leaveClub(\'' + key + '\')">Leave</button>' +
      '</div>' +
    '</div>';
  }).join("");
}

function renderDashboardEvents() {
  var container = document.getElementById("registeredEventsList");
  if (!container) return;
  if (registeredEvents.length === 0) {
    container.innerHTML = '<p class="empty-msg">No events registered yet. <a href="events.html">Browse events →</a></p>';
    return;
  }
  container.innerHTML = registeredEvents.map(function(name){
    return '<div class="registered-event-tag">' +
      '<span>📅 ' + name + '</span>' +
      '<button class="badge-remove" onclick="cancelEvent(\'' + name + '\')">✕</button>' +
    '</div>';
  }).join("");
}

/* ---------- LOAD CLUB DETAILS ---------- */
function loadClubDetails() {
  var params  = new URLSearchParams(window.location.search);
  var clubKey = params.get("club");
  if (!clubKey || !clubs[clubKey]) return;
  var club = clubs[clubKey];

  document.title = club.name + " | CampusConnect";

  var nameEl = document.getElementById("clubName");
  var catEl  = document.getElementById("clubCategory");
  var mentEl = document.getElementById("clubMentor");
  var descEl = document.getElementById("clubDescription");
  var imgEl  = document.getElementById("clubImage");
  var badgeEl= document.getElementById("clubBadge");
  var ul     = document.getElementById("clubActivities");
  var achBox = document.getElementById("clubAchievements");
  var joinBtn= document.getElementById("joinBtn");

  if (nameEl) nameEl.textContent = club.name;
  if (catEl)  catEl.textContent  = club.category;
  if (mentEl) mentEl.textContent = club.mentor;
  if (descEl) descEl.textContent = club.description;
  if (imgEl)  { imgEl.src = club.image; imgEl.alt = club.name; }
  if (badgeEl){ badgeEl.textContent = club.category; badgeEl.className = "badge " + club.badge; }

  if (ul) {
    ul.innerHTML = club.activities.map(function(a){ return "<li>✔ " + a + "</li>"; }).join("");
  }

  if (achBox) {
    achBox.innerHTML = club.achievements.map(function(item){
      return '<div class="event-block"><h3>🏆 ' + item.title + '</h3><p>' + item.text + '</p></div>';
    }).join("");
  }

  if (joinBtn) {
    joinBtn.setAttribute("data-club", clubKey);
    if (joinedClubs.includes(clubKey)) {
      joinBtn.textContent = "✓ Already Joined";
      joinBtn.classList.add("btn-joined");
      joinBtn.disabled = true;
    } else {
      joinBtn.onclick = function(){ joinClub(clubKey); };
    }
  }
}

/* ---------- SYNC BUTTON STATES ---------- */
function syncClubButtons() {
  joinedClubs.forEach(function(key){
    document.querySelectorAll(".join-btn[data-club='" + key + "']").forEach(function(btn){
      btn.textContent = "✓ Joined";
      btn.classList.add("btn-joined");
      btn.disabled = true;
    });
  });
}

function syncEventButtons() {
  registeredEvents.forEach(function(name){
    document.querySelectorAll(".register-btn[data-event='" + name + "']").forEach(function(btn){
      btn.textContent = "✓ Registered";
      btn.classList.add("btn-joined");
      btn.disabled = true;
    });
  });
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  var toggle = document.getElementById("menuToggle");
  var navUl  = document.querySelector("nav ul");
  if (!toggle || !navUl) return;
  toggle.addEventListener("click", function(){
    navUl.classList.toggle("nav-open");
    toggle.classList.toggle("open");
  });
  navUl.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      navUl.classList.remove("nav-open");
      toggle.classList.remove("open");
    });
  });
}

/* ---------- INIT ---------- */
window.onload = function() {
  updateDashboard();
  loadClubDetails();
  syncClubButtons();
  syncEventButtons();
  renderDashboardClubs();
  renderDashboardEvents();
  renderAttendanceTable();
  initMobileMenu();
};
