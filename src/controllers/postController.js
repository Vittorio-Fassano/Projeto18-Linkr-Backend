import postRepository from '../repositories/postRepository.js';
import { handleHashtags } from './hashtagsController.js';
import { MESSAGES } from '../constants.js';
import urlMetadata from 'url-metadata';

export async function newPost(req, res) {
  const { url, text } = req.body;
  const user = res.locals.user;

  try {
    const urlRegistered =
      (await postRepository.insertUrl(url)).rows[0] ||
      (await postRepository.getUrlId(url)).rows[0];
    const [post] = (
      await postRepository.createPost(user.id, urlRegistered.id, text || '')
    ).rows;
    handleHashtags(text || '', post.id);
    res.status(201).send({ message: 'Link published successfully!' });
  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: 'There was an error publishing your link!' });
  }
}

export async function fetchMetadata(req, res) {
  const { data } = res.locals;
  try {
    const promises = [];
    data.map((d) => promises.push(urlMetadata(d.url)));
    const metadatas = await Promise.all(promises);
    const treatedData = data.map((d, i) => {
      const { title, image, description } = metadatas[i];
      return { ...d, title, image, description };
    });
    res.status(200).send(treatedData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

export async function deletePost(req, res) {
  const user = res.locals.user; 
  const { id } = req.params;
  const userId = user.id;
  console.log(userId, id)
  try {
      await postRepository.deletePost(userId, id);
      res.sendStatus(200);
  } catch (error) {
    console.log(error)
      res.sendStatus(500);
  }
}