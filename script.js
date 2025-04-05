//You can edit ALL of the code here
const container = document.getElementById("container");
const searchEpisode = document.getElementById("search-box")
const numEpisodes = document.getElementById("total-episodes")
const episodeSelector = document.getElementById("episodeSelect");
const filter = document.getElementById("filter");
let allEpisodes = [];
// const allEpisodes = getAllEpisodes()

async function fetchAllEpisodes(){
  try{
    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
    if (!response.ok) {
      throw new Error(`Could not fetch resource: ${response.status}`);
    }
    allEpisodes= await response.json();
    setup(allEpisodes);
  }
  catch (error) {
    console.error("Error fetching episodes:", error);
    container.innerHTML = `<p class="error">Failed to load episodes. Please try again later.</p>`;
  }
  }

function showEpisode(episode){

  const episodeCard = document.createElement("section")
  episodeCard.id = "card";
  episodeCard.innerHTML = `
  <h3>${episode.name} - S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0') }</h3>
  <img src=${episode.image.medium} alt="image for the episode">
  <p>${episode.summary} </p>`
  container.appendChild(episodeCard)
}

function setup(arrOfEpisodes){
  container.innerHTML = "";
  filter.innerHTML = "";
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

function handleSearchEpisode(){
  const query = searchEpisode.value.toLowerCase();
  const searchedEpisodes = allEpisodes.filter((episode) => episode.summary.toLowerCase().includes(query) || episode.name.toLowerCase().includes(query));
  setup(searchedEpisodes);
}

episodeSelector.addEventListener("change", function () {
  const chosenEpisode = allEpisodes.find((episode) => episode.id == this.value);
  if (chosenEpisode) {
    container.innerHTML = "";
    showEpisode (chosenEpisode);
    numEpisodes.textContent = `Showing 1 / ${allEpisodes.length} episodes`;
    const backToAll = document.createElement("button");
    filter.innerHTML = "";
    backToAll.textContent = "BACK";
    backToAll.addEventListener("click", () => {
    setup(allEpisodes);
    allEpisodes.forEach(showEpisode)});
    filter.appendChild(backToAll);
    
  }
  searchEpisode.value = "";
})

searchEpisode.addEventListener("input", handleSearchEpisode)
window.onload = fetchAllEpisodes;
