//You can edit ALL of the code here
const container = document.getElementById("container");
const searchEpisode = document.getElementById("search-box")
const numEpisodes = document.getElementById("total-episodes")
const episodeSelector = document.getElementById("episodeSelect");
const showSelector = document.getElementById("tvshowSelect");
const filterButtonSpace = document.getElementById("filter");
let allEpisodes = [];
let allShows = [];
let searchedFilms = [];
// const allEpisodes = getAllEpisodes()

async function fetchAllEpisodes(tvshow) {
  try {
    const response = await fetch(`${tvshow._links.self.href}/episodes`);
    if (!response.ok) {
      throw new Error(`Could not fetch resource: ${response.status}`);
    }
    allEpisodes = await response.json();
    setup(allEpisodes);
  }
  catch (error) {
    console.error("Error fetching episodes:", error);
    container.innerHTML = `<p class="error">Failed to load episodes. Please try again later.</p>`;
  }
}


async function fetchAllShows() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    if (!response.ok) {
      throw new Error(`Could not fetch TV shows: ${response.status}`);
    }
    allShows = await response.json();
    initialSetup(allShows);
    console.log(allShows)
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    document.getElementById("filmListOverlay").innerHTML = `<p class="error">Failed to load TV shows. Please try again later.</p>`;
  }
}

function initialSetup(arrOfTVShows) {
  arrOfTVShows.sort((a, b) => a.name.localeCompare(b.name));
  document.getElementById("filmListOverlay").innerHTML = "";
  filterButtonSpace.innerHTML = "";
  document.getElementById("tvshowSelect").innerHTML = `<option value="">Select an episode</option>`;
  showSelector.innerHTML = `<option value="">Select a TV show</option>`;
  for (let index = 0; index < arrOfTVShows.length; index++) {
    let tvShow = arrOfTVShows[index];
    const option = document.createElement("option");
    showTVShow(tvShow);
    option.value = tvShow.id;
    option.textContent = `${tvShow.name}`;
    showSelector.appendChild(option);
  }
}
function ratingShow(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return `${key}: ${obj[key]}`;
    }
  }
}
function showTVShow(tvshow) {
  const tvShowCard = document.createElement("section");
  tvShowCard.id = "film-card";
  tvShowCard.innerHTML = `
  <img src=${tvshow.image.medium} alt="image of the TV Show">
  <div id="article" >
  <h3 >${tvshow.name}</h3>
  <p>${tvshow.summary} </p>
  </div>
  <div id = "film-details">
  <p>genres:${tvshow.genres}<br>
  status: ${tvshow.status}<br>
  rating: ${ratingShow(tvshow.rating)} <br>
  runtime: ${tvshow.runtime}<br> </p>
  </div>
  `
  document.getElementById("filmListOverlay").appendChild(tvShowCard);
  // titleChoose();
  addClickListenerToCard(tvShowCard, tvshow);
}
// function titleChoose() {
//   document.getElementById("film-card").addEventListener("click", function () {
//     const showName = this.querySelector('h3').textContent; // Get the title from the clicked card
//     const chosenTVShow = allShows.find((tvShow) => tvShow.name === showName);
//     if (chosenTVShow) {
//       searchedFilms = [chosenTVShow];
//       initialSetup(searchedFilms);
//       fetchAllEpisodes(chosenTVShow); // Fetch episodes for the clicked show
//     }
//   });
// }
function addClickListenerToCard(card, tvshow) {
  card.addEventListener("click", function () {
    searchedFilms = [tvshow];
    initialSetup(searchedFilms);
    fetchAllEpisodes(tvshow);
  });
}

function headerClick(){
document.getElementById("header").addEventListener("click", function(){console.log("clicked")})
}



function showEpisode(episode) {
  const episodeCard = document.createElement("section")
  episodeCard.id = "card";
  episodeCard.innerHTML = `
  <h3>${episode.name} - S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0')}</h3>
  <img src=${episode.image.medium} alt="image for the episode">
  <p>${episode.summary} </p>`
  container.appendChild(episodeCard)
}

function setup(arrOfEpisodes) {
  container.innerHTML = "";
  filterButtonSpace.innerHTML = "";
  episodeSelector.innerHTML = `<option value="">Select an episode</option>`;
  for (let index = 0; index < arrOfEpisodes.length; index++) {
    let episode = arrOfEpisodes[index];
    const option = document.createElement("option");
    showEpisode(episode);
    option.value = episode.id;
    option.textContent = `S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0')} - ${episode.name}`;
    episodeSelector.appendChild(option)
  }
  numEpisodes.textContent = `Showing ${arrOfEpisodes.length} / ${allEpisodes.length} episodes`;
}

function handleSearchEpisode() {
  searchEpisode.addEventListener("input", handleSearchEpisode)
  const query = searchEpisode.value.toLowerCase();
  console.log(query)
  const searchedEpisodes = allEpisodes.filter((episode) => 
    episode.summary.toLowerCase().includes(query) || 
    episode.name.toLowerCase().includes(query));
  setup(searchedEpisodes);
  }

showSelector.addEventListener("change", function () {
  const chosenTVShow = allShows.find((tvShow) => tvShow.id == this.value);
  searchedFilms = [chosenTVShow];
  console.log(searchedFilms)
  initialSetup(searchedFilms)
  fetchAllEpisodes(chosenTVShow);
})

episodeSelector.addEventListener("change", function () {
  const chosenEpisode = allEpisodes.find((episode) => episode.id == this.value);
  if (chosenEpisode) {
    container.innerHTML = "";
    showEpisode(chosenEpisode);
    numEpisodes.textContent = `Showing 1 / ${allEpisodes.length} episodes`;
    const backToAll = document.createElement("button");
    filterButtonSpace.innerHTML = "";
    backToAll.textContent = "BACK";
    backToAll.addEventListener("click", () => {
      setup(allEpisodes);
      allEpisodes.forEach(showEpisode)
    });
    filterButtonSpace.appendChild(backToAll);

  }
  searchEpisode.value = "";
})


function showsContainerHandler() {
  fetchAllShows()
  filmSearchHandler()
  handleSearchEpisode()
  
  headerClick()
}
 
function filmSearchHandler() {
  document.getElementById("film-search").addEventListener("input", filmSearch)
  function filmSearch() {
    const query = document.getElementById("film-search").value.toLowerCase();
    console.log(query)
    searchedFilms = allShows.filter((film) =>
      film.summary.toLowerCase().includes(query)
      || film.name.toLowerCase().includes(query)
      || film.genres.some(genre => genre.toLowerCase().includes(query)))
    console.log(searchedFilms);
    initialSetup(searchedFilms)
  }
}

window.onload = showsContainerHandler;
