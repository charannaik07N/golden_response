const NodeCache = require("node-cache");

const ttl = Number(process.env.CACHE_TTL_SECONDS || 300);
const cache = new NodeCache({ stdTTL: ttl, checkperiod: ttl * 0.2 });

module.exports = cache;
