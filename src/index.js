import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  const str = request.body;
  if (!str) {
    return reply.status(403).send('unresolved');
  } else if (str.match(/fuck/gi)) {
    return reply.status(403).send('unresolved');
  } else {
    return reply.send(str.toUpperCase());
  }
});

fastify.post('/lowercase', (request, reply) => {
  const str = request.body;
  if (!str) {
    return reply.status(403).send('unresolved');
  } else if (str.match(/fuck/gi)) {
    return reply.status(403).send('unresolved');
  } else {
    return reply.send(str.toLowerCase());
  }
});

fastify.get('/user/:id', (request, reply) => {
  const { id } = request.params;
  users[id] ? reply.send(users[id]) : reply.status(400).send('User not exist');
});

fastify.get('/users', (request, reply) => {
  const { filter, value } = request.query;
  const arr = [...Object.entries(users).map(([, value]) => value)];
  const newArr = arr.filter((item) => String(item[filter]) === String(value));
  filter && value ? reply.send(newArr) : reply.send(arr);
});


export default fastify;
