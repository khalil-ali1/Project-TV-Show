//You can edit ALL of the code here
const display = document.getElementById("display");
const searchEpisode = document.getElementById("search-box")
const numEpisodes = document.getElementById("total-episodes")

const allEpisodes = getAllEpisodes()

function showEpisode(episode){

  const episodeCard = document.createElement("section")
  episodeCard.id = "card";
  episodeCard.innerHTML = `
  <h3>${episode.name} - S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0') }</h3>
  <img src=${episode.image.medium} alt="image for the episode">
  <p>${episode.summary} </p>`
  display.appendChild(episodeCard)
}

function setup(arrOfEpisodes){
  display.innerHTML = "";
  for (let index = 0; index < arrOfEpisodes.length; index++) {
    let episode = arrOfEpisodes[index];
    showEpisode(episode);
  }
  numEpisodes.textContent = `Showing ${arrOfEpisodes.length} / ${allEpisodes.length} episodes`;
}

function handleSearchEpisode(){
  const query = searchEpisode.value.toLowerCase();
  const searchedEpisodes = allEpisodes.filter((episode) => episode.summary.toLowerCase().includes(query) || episode.name.toLowerCase().includes(query));
  setup(searchedEpisodes);
}


searchEpisode.addEventListener("input", handleSearchEpisode)
window.onload = () => setup(allEpisodes);
