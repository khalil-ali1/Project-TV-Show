//You can edit ALL of the code here
const display = document.getElementById("display");

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

function setup(){
  for (let index = 0; index < allEpisodes.length; index++) {
    let episode = allEpisodes[index];
    showEpisode(episode);
  }
}



window.onload = setup;
