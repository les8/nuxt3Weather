import jwt from 'jsonwebtoken';
import { prisma } from '~/prisma/prisma-client';

export default defineEventHandler(async (event) => {
  if (event.node.req.url === '/api/user/current' ||
    event.node.req.url === '/api/user/favorites/add' ||
    event.node.req.url === '/api/user/favorites/remove' ||
    event.node.req.url === '/api/user/remove') {
    try {
      if (event.node.req.headers.authorization) {
        const { jwtSecret } = useRuntimeConfig();
        const token = event.node.req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === 'object') {
          await Promise.all([
            prisma.user.findUnique({
              where: {
                id: decoded.id,
              },
              select: {
                id: true,
                email: true,
                name: true
              }
            }),
            prisma.favoritesCities.findMany({
              where: {
                userId: decoded.id,
              },
            }),
            prisma.settings.findUnique({
              where: {
                userId: decoded.id,
              },
              select: {
                temperature: true,
                wind: true,
                pressure: true,
                visibility: true
              }
            })
          ]).then(result => {            
            event.context.auth = {}
            event.context.auth.user = result[0];
            event.context.auth.cities = result[1];
            event.context.auth.settings = result[2];
          })
        }
      } else throw new Error();
    } catch (error) {
      return {
        status: 401,
        message: 'Not authorized'
      }
    }
  }
})
