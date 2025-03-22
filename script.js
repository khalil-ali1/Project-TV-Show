//You can edit ALL of the code here

//const episodeName: ${getOneEpisode().name}
//const seasonNumber: ${getOneEpisode().season}
//const episodeNumber: ${getOneEpisode().number}
//const image:src=${getOneEpisode().image.medium} alt:image for the episode
//const episodeSummary : ${getOneEpisode().summary} 

// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const root<h3>${getOneEpisode().name} - S${getOneEpisode().number} </h3
Elem = document.getElementById("root");
const allEpisodes = getAllEpisodes()
console.log(allEpisodes)
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }
function showEpisode(episode){

  const paragraph = document.createElement("section")
  paragraph.id = "card";
  paragraph.innerHTML = `
  <h3>${episode.name} - S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0') }</h3>
  <img src=${episode.image.medium} alt:image for the episode>
  <p>${episode.summary} </p>`
  document.body.appendChild(paragraph)
}
for (let i = 0; i < allEpisodes.length; i++ ){
  let episode = allEpisodes[i]
  showEpisode(episode)
}
const footer = document.createElement("footer");
footer.innerText=`<p>All files</p>`
document.body.appendChild(footer)
// window.onload = setup;
