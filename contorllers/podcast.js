const { formatDate, formatDuration } = require("../utils");

const podcasts = {};

const getPodcastsList = (req, res) => {
  res.render("podcasts", {
    podcasts: Object.values(podcasts),
  });
};

const getEpisodesList = (req, res) => {
  res.render("episodes", {
    podcast: podcasts[req.params.podcastId],
  });
};

const getEpisode = (req, res) => {
  console.log(req.params.podcastId, req.params.episodeId);
  res.render("player", {
    imgUrl:
      "https://www.omnycontent.com/d/programs/2ee97a4e-8795-4260-9648-accf00a38c6a/ac2da21e-2193-4683-bcb5-accf011076ad/image.jpg?t=1613578325&size=Large",
    audioUrl:
      "https://traffic.omny.fm/d/clips/2ee97a4e-8795-4260-9648-accf00a38c6a/ac2da21e-2193-4683-bcb5-accf011076ad/816dbf13-f1f0-4a78-8ca7-b194014f7e89/audio.mp3?utm_source=Podcast&in_playlist=409bad89-c4c2-46cb-b69b-accf01152781",
  });
};

const fetchPodcasts = (podcastName) => {
  return fetch("https://api.taddy.org", {
    method: "POST",
    headers: {
      "X-USER-ID": "1494",
      "X-API-KEY":
        "6c0fa9fc34519f7d23d9b534fd31e4cb7902fc6ef501dd0291ce2825d4d4b3523ac76ef2b3902368dd55b8088250a5e43e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
          getPodcastSeries(name:"${podcastName}"){
          uuid
          name
          description
          imageUrl
          episodes{
            uuid
            name
            description
            datePublished
            audioUrl
            duration
          }
        }
            }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const podcast = res.data.getPodcastSeries;
      podcasts[res.data.getPodcastSeries.uuid] = podcast;
      podcast.episodes = podcast.episodes.map((episode) => {
        return {
          ...episode,
          datePublished: formatDate(episode.datePublished),
          duration: formatDuration(episode.duration),
        };
      });
    });
};

module.exports = {
  getPodcastsList,
  getEpisodesList,
  getEpisode,
  fetchPodcasts,
};
