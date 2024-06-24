const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const podcastRouter = require("./routes/podcast.js");
const podcastsControllet = require("./contorllers/podcast.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/podcasts", podcastRouter);

// app.listen(8000);

podcastsControllet
  .fetchPodcasts("N12")
  .then(() => {
    return podcastsControllet.fetchPodcasts("בזמן שעבדתם");
  })
  .then(app.listen(PORT));
