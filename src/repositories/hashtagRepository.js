import db from '../database/db.js';

async function getAllHashtags() {
  return db.query(`
    SELECT 
      id, hashtag
    FROM
      hashtags;`
  );
}

async function insertHashtags(hashtags) {
  return db.query(`
    INSERT INTO 
      hashtags(hashtag)
    VALUES ` + hashtags.map((x, i) => `($${i + 1})`).join(', ') + `
    RETURNING 
      id;`,
    hashtags
  );
}

async function registerPostHashtags(postId, hashtagsIds) {
  return db.query(`
    INSERT INTO 
      "postsHashtags"("postId", "hashtagId")
    VALUES ` + hashtagsIds.map((x, i) => `($1, $${i + 2})`).join(', ') + `;`,
    [postId, ...hashtagsIds]
  );
}

async function hashtagRegistered(hashtag) {
  return db.query(`
    SELECT 
      id
    FROM
      hashtags
    WHERE
      hashtag=$1`,
    [hashtag]
  );
}


async function getTopHashtags() {
  return db.query(`
    SELECT 
      h.id, h.hashtag
    FROM
      "postsHashtags" AS ph
    JOIN 
      "hashtags" AS h
    ON
      ph."hashtagId"=h.id
    GROUP BY
      ph."hashtagId", h.hashtag, h.id
    ORDER BY 
      COUNT(ph."postId")
    DESC
    LIMIT 
      10;`
  );
}

async function getHashtagPosts(hashtagId) {
  return db.query(`
    SELECT 
      posts.text, 
      posts.id,
      urls.url,
      urls.title,
      urls.image,
      urls.description, 
      users.username,
      users.picture,
      users.id AS "userId"
    FROM 
      posts
    JOIN 
      urls 
    ON 
      posts."urlId" = urls.id
    JOIN 
      users 
    ON 
      posts."userId" = users.id
    JOIN 
      "postsHashtags" 
    ON 
      "postsHashtags"."postId" = posts.id
    WHERE
      "postsHashtags"."hashtagId"=$1
    ORDER BY 
      posts."createdAt" 
    DESC 
    LIMIT 
      20`,
    [hashtagId]
  );
}


const hashtagRepository = {
  getAllHashtags,
  insertHashtags,
  registerPostHashtags,
  getTopHashtags,
  getHashtagPosts,
  hashtagRegistered
};

export default hashtagRepository;