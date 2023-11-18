import jwt from 'jsonwebtoken';
import { prisma } from '~/prisma/prisma-client';

export default defineEventHandler(async (event) => {
  if (event.node.req.url !== '/api/user/current') return

  try {
    if (event.node.req.headers.authorization) {
      const { jwtSecret } = useRuntimeConfig();
      const token = event.node.req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwtSecret);

      if (typeof decoded === 'object') {
        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });

        event.context.auth = user;
      }
    } else throw new Error();
  } catch (error) {
    return {
      status: 401,
      message: 'Not authorized'
    }
  }
})