import postRepository from "../repositories/postRepository.js";
import { MESSAGES } from "../constants.js";

export async function fetchData(req, res, next) {
  try {
    const { rows } = await postRepository.fetchData();
    if (rows.length === 0)
      return res.status(204).send({ message: "There are no posts yet" });
    res.locals.data = rows;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

export async function fetchUserData(req,res,next){
  const {id} = req.params;
  try{
    const {rows} = await postRepository.fetchUserData(id);
    if (rows.length === 0) return res.status(204).send({message:"There are no posts yet"});
    res.locals.data = rows;
    next()
  } catch(err){
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

