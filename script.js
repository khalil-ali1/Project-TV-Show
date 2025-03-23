//You can edit ALL of the code here

const allEpisodes = getAllEpisodes()

const container = document.createElement("section")
container.id = "container";
document.body.appendChild(container)


function showEpisode(episode){
  const card = document.createElement("section")
  card.id = "card";
  card.innerHTML = `
  <h3>${episode.name} - S${String(episode.season).padStart(2,'0')}E${String(episode.number).padStart(2,'0') }</h3>
  <img src=${episode.image.medium} alt:image for the episode>
  <p>${episode.summary} </p>`
  container.appendChild(card);
}
for (let i = 0; i < allEpisodes.length; i++ ){
  let episode = allEpisodes[i]
  showEpisode(episode)
}
const footer = document.createElement("footer");
footer.innerHTML =`<p>All data has (originally) come from <a href="https://tvmaze.com/">TVMaze.com</a></p>`
document.body.appendChild(footer)
// window.onload = setup;
