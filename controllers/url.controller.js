const shortid = require('shortid');
const Url = require('../models/url.model')

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    console.log(req.body);
    if(!body.url){
        return res.status(400).json({"error": 'url is required'})
    };
    const shortId = shortid();
    await Url.create({
        shortId : shortId,
        redirectURL :body.url,
        visitHistory : []
    });
    return res.json({id :shortId}); 
}

async function handleGetShortId(req,res){
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({
        shortId : shortId
    },{$push:{
        visitHistory :{
            timestamp :Date.now(),
        },
    }});
    res.redirect(entry.redirectURL)
}

async function handleAnalyticsShortId(req,res){
    const shortId = req.params.shortId;
    const entry = await Url.findOne({shortId});
    return res.status(500).json({
        totalClicks : entry.visitHistory.length,
        analytics : entry.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetShortId,
    handleAnalyticsShortId
}




