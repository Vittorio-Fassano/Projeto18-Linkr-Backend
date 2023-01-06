import likesRepository from "../repositories/likesRepository.js";

export async function likePost(req, res) {
  const { user } = res.locals;
  const { id } = req.params;
  const userId = 1;
  // const userId = user.id;
  try {
    await likesRepository.likePost(userId, id); //userId, postId
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(422);
  }
}

export async function dislikePost(req, res) {
  const { user } = res.locals; //userId, postId
  const { id } = req.params;
  // const userId = user.id;
  const userId = 1;
  try {
    await likesRepository.dislikePost(userId, id); //userId, id
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(422);
  }
}

export async function countLikes(req, res) {
  const { id } = req.params;
  try {
    const infos = await likesRepository.countLikes(1); //id
    if (infos.rows.length === 0) {
      return res.status(200).send("0");
    } else {
      return res.status(200).send(`${infos.rows[0].count}`);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(422);
  }
}
