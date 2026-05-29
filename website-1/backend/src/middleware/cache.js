const cache = require("../utils/cacheStore");

const cacheMiddleware = (keyBuilder) => (req, res, next) => {
  const key = keyBuilder(req);
  const cached = cache.get(key);
  if (cached) {
    return res.json(cached);
  }

  res.locals.cacheKey = key;
  return next();
};

const cacheResponse = (res, data) => {
  const key = res.locals?.cacheKey;
  if (key) {
    cache.set(key, data);
  }
};

module.exports = { cacheMiddleware, cacheResponse };
