const express = require("express");
const {
  getPodcastsList,
  getEpisodesList,
  getEpisode,
} = require("../contorllers/podcast");

const router = express.Router();

router.get("/", getPodcastsList);

router.get("/:podcastId", getEpisodesList);

router.get("/:podcastId/:episodeId", getEpisode);

module.exports = router;
