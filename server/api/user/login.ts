import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { prisma } from '~/prisma/prisma-client';


export default defineEventHandler(async (event) => {
  /**
  * @route POST /api/user/login
  * @desс Логин
  * @access Public
  */

  if (event.node.req.method !== 'POST') {
    return {
      status: 405,
      message: `Method ${event.node.req.method} not allowed`
    }
  }

  try {
    const body = await readBody(event);

    if (!body || !body.email || !body.password) {
      return {
        status: 400,
        message: 'Please fill in the required fields'
      }
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      }
    });

    const isPasswordCorrect = user && (await bcrypt.compare(body.password, user.password));
    const { jwtSecret } = useRuntimeConfig();

    if (user && isPasswordCorrect && jwtSecret) {
      const favoritesCities = await prisma.favoritesCities.findMany({
        where: {
          userId: user.id
        },
        select: {
          id: true,
          name: true
        }
      })

      return {
        status: 200,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            openWeatherKey: user.openWeatherKey,
          },
          cities: favoritesCities,
          token: jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1d' })
        }
      }
    } else {
      return {
        status: 400,
        message: 'Login or password entered incorrectly'
      }
    }
  } catch {
    return {
      status: 500,
      message: 'Something went wrong'
    }
  }
})