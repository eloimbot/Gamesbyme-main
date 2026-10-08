// The Shelf — game registry
//
// Add a game by adding one object to this array. Each game lives in its own
// folder under /games/<slug>/ with its own index.html (and any css/js it needs).
//
// color options: "clay" | "moss" | "teal"  (cycles automatically if omitted)

const GAMES = [
  {
    title: "flight simulator",
    slug: "flightsim",
    description: "fly a plane in an infinite world",
    color: "teal",
    image: "images/IMG_2490.jpeg",
    category: "GAMESBYME"
  },
  {
    title: "Cyberscapes",
    slug: "Cyberscapes",
    description: "you are a in a glass tunnel overlooking duskwater.",
    color: "purple",
    image: "images/IMG_2491.jpeg",
    category: "GAMESBYME"
  },
  {
    title: "isotown",
    slug: "citybuilder",
    description: "build a city and watch it rise",
    color: "teal",
    image: "images/IMG_2492.jpeg",
    category: "GAMESBYME"
  },
  {
    title: "rosswood coffee shop",
    slug: "rosswoodcoffee",
    description: "run a coffee shop for 10 days and become a millionare (or not)",
    color: "purple",
    image: "images/IMG_2496.jpeg",
    category: "GAMESBYME"
  },
   { 
    title: "gta vice city",
    slug: "gtavicecity",
    description: "play gta vice city unblocked on unblocktorium",
    color: "purple",
    image: "images/GTA-VICE-CITY.png",
    embedUrl: "https://unblockedclassroomgames.gitlab.io/games/gta-vice-city/gta-vice-city.html",
    category: "Shooter"
  },
   {
    title: "DOOM",
    slug: "Doom",
    description: "play this retro shooter and shoot the monsters",
    color: "purple",
    image: "images/doom.png",
    category: "Shooter"
  },
   {
    title: "Angry birds",
    slug: "angrybirds",
    description: "use the slingshot to slingshot the birds to destroy the evil pigs tower",
    color: "moss",
    image: "images/IMG_2592.jpeg",
    category: "other"
  },
   {
    title: "crossy road",
    slug: "crossyroad",
    description: "why did the chicken cross the road? to get to the other side!",
    color: "purple",
    image: "images/IMG_2591.jpeg",
    category: "Platformer"
  },
  { 
    title: "Run 3",
    slug: "run3",
    description: "jump through a long tunnel",
    color: "moss",
    image: "images/IMG_2502.jpeg",
    category: "Platformer"
  },
   { 
    title: "smash karts",
    slug: "smashkarts",
    description: "race karts in this multiplayer game",
    color: "teal",
    image: "images/IMG_2574.jpeg",
    category: "Driving"
  },
    { 
    title: "ragdoll archers",
    slug: "ragdoll_archers",
    description: "shoot the other tower and dont get hit",
    color: "moss",
    image: "games/ragdoll_archers/logo.jpeg",
    category: "other"
  },
   { 
    title: "ragdoll hit",
    slug: "ragdoll_hit",
    description: "fight bosses and get op gear",
    color: "moss",
    image: "games/ragdoll_hit/3c892779be9dabb3589586c83ad3eeed.png",
    category: "other"
  },
   { 
    title: "Bitlife",
    slug: "bitlife",
    description: "a life simulator where you can do anything",
    color: "purple",
    image: "images/logo.png",
    category: "other"
  },
   { 
    title: "plants VS zombies",
    slug: "plantsvszombies",
    description: "play plants vs zombies unblocked on unblocktorium",
    color: "moss",
    image: "images/IMG_2588.jpeg",
    category: "other"
  },
  { 
    title: "Rooftop snipers",
    slug: "rooftopsnipers",
    description: "shoot the other player in this fast paced 2 player game",
    color: "teal",
    image: "images/IMG_2589.jpeg",
    category: "Shooter"
  },
  { 
    title: "five nights at freddys 1",
    slug: "fnaf1",
    description: "survive 5 nights at freddys",
    color: "clay",
    image: "images/IMG_2498.jpeg",
    category: "Horror"
  },
  { 
    title: "Cookie Clicker",
    slug: "cookieclicker",
    description: "click the cookie to make more cookies",
    color: "clay",
    image: "images/IMG_2538.jpeg",
    category: "Idle"
  },
    { 
    title: "snow rider 3d",
    slug: "Snowrider3d",
    description: "ride the sled and do not crash it",
    color: "teal",
    image: "images/IMG_2573.jpeg",
    category: "driving"
  },
  { 
    title: "awesome tanks",
    slug: "awesometanks1",
    description: "in this game upgrade your tank and shoot the other tanks",
    color: "clay",
    image: "images/IMG_2566.jpeg",
    category: "Shooter"
  },
   { 
    title: "awesome tanks 2",
    slug: "awesometanks2",
    description: "in this game upgrade your tank with more upgrades and shoot the other tanks again",
    color: "clay",
    image: "images/IMG_2567.jpeg",
    category: "Shooter"
  },
  { 
    title: "Moto x3m",
    slug: "motox3m",
    description: "ride a motobike across the levels.",
    color: "clay",
    image: "images/IMG_2524.jpeg",
    category: "Driving"
  },
  { 
    title: "Escape Roads 2",
    slug: "escaperoads",
    description: "drive a car in a city and avoid obstructions whilst being in an epic police chase",
    color: "moss",
    image: "images/loading.png",
    category: "Driving"
  },
  { 
    title: "geometry dash lite",
    slug: "geometrydashlite",
    description: "rithem based platformer",
    color: "purple",
    image: "images/IMG_2500.jpeg",
    category: "Platformer"
  },
  { 
    title: "slope",
    slug: "slope",
    description: "play as a ball and dont fall",
    color: "teal",
    image: "images/IMG_2536.jpeg",
    category: "Platformer"
  },
  { 
    title: "retro bowl",
    slug: "retrobowl",
    description: "play this retro style football game",
    color: "clay",
    image: "images/IMG_2522.jpeg",
    category: "other"
  },

  
  { 
    title: "Drive mad",
    slug: "drivemad",
    description: "drive a car on crazy obsticles",
    color: "moss",
    image: "images/IMG_2503.jpeg",
    category: "Driving"
  },  
  { 
    title: "tiny fishing",
    slug: "tinyfishing",
    description: "reel in the biggest catch",
    color: "purple",
    image: "images/IMG_2512.jpeg",
    category: "Idle"
  }, 
  { 
    title: "papas burgeria",
    slug: "papasbugeria",
    description: "manage a restrant that sells bugers in this classic game",
    color: "clay",
    image: "images/IMG_2576.jpeg",
    category: "Idle"
  }, 
   { 
    title: "ovo",
    slug: "ovo",
    description: "jump across difficult levels",
    color: "teal",
    image: "images/IMG_2575.jpeg",
    category: "Platformer"
  }, 
    { 
    title: "boxing random",
    slug: "boxingrandom",
    description: "fight the other player with random events occuring",
    color: "clay",
    image: "images/IMG_2579.jpeg",
    category: "other"
  }, 
    { 
    title: "volleyball random",
    slug: "Volleyballrandom",
    description: "play volleyball against somone with random events",
    color: "purple",
    image: "images/IMG_2580.jpeg",
    category: "other"
  }, 
  { 
    title: "challenge rush",
    slug: "challengerush",
    description: "a game about jumping (not mine)",
    color: "teal",
    image: "images/IMG_2497.jpeg",
    embedUrl: "https://challengerush.com/",
    category: "Platformer"
  },
  { 
    title: "1v1lol",
    slug: "1v1lol",
    description: "play 1v1lol",
    color: "clay",
    image: "images/1v1lol.png",
    category: "other"
  },
  { 
    title: "2048",
    slug: "2048",
    description: "play 2048",
    color: "clay",
    image: "images/2048.png",
    category: "other"
  },
  { 
    title: "ARC",
    slug: "ARC",
    description: "play ARC",
    color: "clay",
    image: "images/ARC.png",
    category: "other"
  },
  { 
    title: "bob the robber 2",
    slug: "bob-the-robber-2",
    description: "play bob the robber 2",
    color: "clay",
    image: "images/bob-the-robber-2.png",
    category: "other"
  },
  { 
    title: "granny",
    slug: "granny",
    description: "play granny",
    color: "clay",
    image: "images/granny.png",
    category: "other"
  },
  { 
    title: "motox3m2",
    slug: "motox3m2",
    description: "play motox3m2",
    color: "clay",
    image: "images/motox3m2.jpg",
    category: "other"
  },
  { 
    title: "poly track",
    slug: "poly-track",
    description: "play poly track",
    color: "clay",
    image: "images/poly-track.jpg",
    category: "other"
  },
  { 
    title: "repo",
    slug: "repo",
    description: "play repo",
    color: "clay",
    image: "images/repo.png",
    category: "other"
  },
  { 
    title: "survival race",
    slug: "survival-race",
    description: "play survival race",
    color: "clay",
    image: "images/survival-race.png",
    category: "other"
  },
  { 
    title: "time shooter 3 swat",
    slug: "time-shooter-3-swat",
    description: "play time shooter 3 swat",
    color: "clay",
    image: "images/time-shooter-3-swat.jpg",
    category: "other"
  },
  { 
    title: "vex3",
    slug: "vex3",
    description: "play vex3",
    color: "clay",
    image: "images/vex3.jpg",
    category: "other"
  },
  { 
    title: "vex4",
    slug: "vex4",
    description: "play vex4",
    color: "clay",
    image: "images/vex4.jpg",
    category: "other"
  },
  { 
    title: "vex5",
    slug: "vex5",
    description: "play vex5",
    color: "clay",
    image: "images/vex5.jpg",
    category: "other"
  },
  { 
    title: "vex6",
    slug: "vex6",
    description: "play vex6",
    color: "clay",
    image: "images/vex6.jpeg",
    category: "other"
  },
  { 
    title: "vex7",
    slug: "vex7",
    description: "play vex7",
    color: "clay",
    image: "images/vex7.jpeg",
    category: "other"
  },
  { 
    title: "gust",
    slug: "gust",
    description: "es un proxy",
    color: "clay",
    image: "",
    category: "other"
  },
  { 
    title: "minecraft",
    slug: "minecraft",
    description: "es un launcher de eaglercraft",
    color: "clay",
    image: "images/mc.png",
    category: "other"
  }
];

// FORCE SHELF TO LOAD ON INITIAL PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderShelf === "function") {
    renderShelf("all");
  } else if (typeof displayGames === "function") {
    displayGames();
  }
});
