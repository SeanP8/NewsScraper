const express = require("express");
const app = express();
const router = express.Router();
const headlineController = require("../controllers/headlineController");
const notesController = require("../controllers/notesController");
const axios = require("axios");
let cheerio = require("cheerio");
const db = require("../models");
// const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", headlineController.homepage);
router.get("/notes", notesController.createNotes);
router.post("/submit", notesController.submitNotes);
router.get("/scrape", headlineController.scrape, headlineController.homepage);
// router.post("/notes/:headline_id?", notesController.getNote);
// router.get("/notes/:headline_id?", notesController.getNote);
router.delete("/headlines/:id", headlineController.deleteHeadlines);

module.exports = router;
