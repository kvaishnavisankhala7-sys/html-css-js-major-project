let joinedClubs = JSON.parse(localStorage.getItem("clubs")) || [];
let registeredEvents = JSON.parse(localStorage.getItem("events")) || [];


/* CLUB DATABASE */

const clubs = {

Startup:{
name:"Startup Club",
category:"Entrepreneurship",
image:"https://i.pinimg.com/736x/6f/58/23/6f5823b69237ab77035cceccde359a00.jpg",
description:"The Startup Club encourages innovation and entrepreneurship. Students collaborate on business ideas, attend mentoring sessions and participate in startup competitions.",
activities:[
"Startup bootcamps",
"Pitch competitions",
"Entrepreneur talks",
"Business model workshops"
],
mentor:"Prof. Rahul Sharma",

achievements:[
{title:"Startup Incubation Winners",text:"Three teams from the club secured incubation funding for their startups."},
{title:"National Pitch Competition",text:"Members reached the finals of a national startup pitch competition."}
]

},

Hackathon:{
name:"Hackathon Club",
category:"Technical",
image:"https://i.pinimg.com/736x/07/24/08/0724084c00c27f93d3b705282edf2179.jpg",
description:"Hackathon Club organizes coding competitions and collaborative programming challenges.",
activities:[
"24-hour hackathons",
"Coding competitions",
"Open-source collaboration",
"Technical workshops"
],
mentor:"Prof. Anita Verma",

achievements:[
{title:"Hackathon Champions",text:"Students won first place in an inter-university hackathon."},
{title:"Open Source Contributions",text:"Club members actively contribute to global open-source projects."}
]

},

DSA:{
name:"DSA Club",
category:"Programming",
image:"https://i.pinimg.com/736x/92/d8/01/92d801751fdc7ec2988ca52eaca636a6.jpg",
description:"The DSA Club focuses on algorithmic problem solving and competitive programming.",
activities:[
"Competitive coding practice",
"Algorithm workshops",
"Programming contests",
"Interview preparation sessions"
],
mentor:"Prof. Karan Gupta",

achievements:[
{title:"Code Competition Winners",text:"Members ranked in the top 50 of national coding contests."},
{title:"Placement Success",text:"Several students secured top tech placements through strong DSA skills."}
]

},

AI:{
name:"AI & Machine Learning Club",
category:"Technical",
image:"https://i.pinimg.com/736x/7d/7c/71/7d7c71fd196d34478dad77e5077f4a79.jpg",
description:"Students explore artificial intelligence technologies and machine learning models.",
activities:[
"AI workshops",
"Machine learning projects",
"Research collaboration",
"Industry seminars"
],
mentor:"Prof. Neha Singh",

achievements:[
{title:"AI Research Paper",text:"Club members published a student research paper on machine learning."},
{title:"AI Model Showcase",text:"Students developed innovative AI models presented at tech expos."}
]

},

Cyber:{
name:"Cyber Security Club",
category:"Security",
image:"https://i.pinimg.com/736x/2b/37/0b/2b370b5ba4231b95642b94a1667b9075.jpg",
description:"Cyber Security Club focuses on ethical hacking, security awareness and cyber defense.",
activities:[
"Ethical hacking sessions",
"Security challenges",
"Capture the flag competitions",
"Cyber awareness programs"
],
mentor:"Prof. Aditya Rao",

achievements:[
{title:"Capture The Flag Winners",text:"Members won several cybersecurity CTF competitions."},
{title:"Security Workshop",text:"The club hosted ethical hacking workshops for over 200 students."}
]

},

Robotics:{
name:"Robotics Club",
category:"Engineering",
image:"https://i.pinimg.com/1200x/60/a7/6d/60a76d676ebda38f911b5305b3381252.jpg",
description:"Robotics Club builds autonomous robots and automation systems.",
activities:[
"Robot design competitions",
"Arduino workshops",
"Automation projects",
"Engineering showcases"
],
mentor:"Prof. Vikram Mehta",

achievements:[
{title:"Robotics Competition",text:"The team built an autonomous robot that won a university robotics contest."},
{title:"Engineering Expo",text:"Students showcased multiple robotics prototypes at tech exhibitions."}
]

},

Cultural:{
name:"Cultural Club",
category:"Arts",
image:"https://i.pinimg.com/1200x/37/a7/7b/37a77bb7891461868bc5d8973f2e00ec.jpg",
description:"Cultural Club promotes performing arts including music, dance and theatre.",
activities:[
"Dance competitions",
"Music performances",
"Theatre productions",
"Cultural festivals"
],
mentor:"Prof. Ritu Malhotra",

achievements:[
{title:"Inter-University Dance Winners",text:"The dance team secured first place in a cultural festival."},
{title:"Theatre Showcase",text:"Students performed award-winning theatre productions."}
]

},

Sports:{
name:"Sports Club",
category:"Sports",
image:"https://i.pinimg.com/736x/4e/7a/b4/4e7ab4bebbd3163982019a6b90a39e76.jpg",
description:"Sports Club promotes athletic participation and organizes tournaments.",
activities:[
"Football tournaments",
"Cricket leagues",
"Athletics competitions",
"Sports festivals"
],
mentor:"Prof. Arjun Kapoor",

achievements:[
{title:"Football Champions",text:"The club football team won the inter-university championship."},
{title:"Athletics Medalists",text:"Members won multiple medals in regional sports competitions."}
]

}

};


/* JOIN CLUB */

function joinClub(name){

if(joinedClubs.includes(name)){
alert("You already joined this club.");
return;
}

joinedClubs.push(name);

localStorage.setItem("clubs",JSON.stringify(joinedClubs));

alert("Successfully joined "+name);

updateDashboard();
}


/* EVENT REGISTRATION */

function registerEvent(name){

registeredEvents.push(name);

localStorage.setItem("events",JSON.stringify(registeredEvents));

alert("Registered for "+name);

updateDashboard();
}


/* DASHBOARD UPDATE */

function updateDashboard(){

let clubCount=document.getElementById("clubCount");
let eventCount=document.getElementById("attendanceCount");

if(clubCount){
clubCount.innerText=joinedClubs.length;
}

if(eventCount){
eventCount.innerText=registeredEvents.length;
}

}


/* LOAD CLUB DETAILS PAGE */

function loadClubDetails(){

const params=new URLSearchParams(window.location.search);
const clubName=params.get("club");

if(!clubName || !clubs[clubName]) return;

const club=clubs[clubName];

document.getElementById("clubName").innerText=club.name;
document.getElementById("clubCategory").innerText=club.category;
document.getElementById("clubMentor").innerText=club.mentor;
document.getElementById("clubDescription").innerText=club.description;
document.getElementById("clubImage").src=club.image;

const activitiesList=document.getElementById("clubActivities");

club.activities.forEach(activity=>{
let li=document.createElement("li");
li.innerText=activity;
activitiesList.appendChild(li);
});


/* ACHIEVEMENTS */

const achievementsBox=document.getElementById("clubAchievements");

club.achievements.forEach(item=>{
let block=document.createElement("div");
block.className="event-block";

block.innerHTML=`
<h3>${item.title}</h3>
<p>${item.text}</p>
`;

achievementsBox.appendChild(block);
});


const joinBtn=document.getElementById("joinBtn");

joinBtn.onclick=()=>joinClub(clubName);

}


window.onload=function(){

updateDashboard();

loadClubDetails();

}