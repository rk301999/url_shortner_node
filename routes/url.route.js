const express = require("express");
const {handleGenerateNewShortUrl,handleGetShortId,handleAnalyticsShortId} = require('../controllers/url.controller')
const router = express.Router();

router.post("/",handleGenerateNewShortUrl)
router.get("/:shortId",handleGetShortId);
router.get("/analytics/:shortId",handleAnalyticsShortId);

module.exports = router;