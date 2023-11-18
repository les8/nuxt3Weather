import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { prisma } from '~/prisma/prisma-client';


export default defineEventHandler(async (event) => {
  /**
  * @route POST /api/user/register
  * @desc Регистрация
  * @access Public
  */

  if (event.node.req.method !== 'POST') {
    return {
      status: 405,
      message: `Method ${event.node.req.method} not allowed`
    }
  }

  try {
    const { email, password, name } = await readBody(event);

    if (!email || !password || !name) {
      return {
        status: 400,
        message: 'Please fill in the required fields'
      }
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (registeredUser) {
      return {
        status: 400,
        message: 'A user with such an email already exists'
      }
    }    

    const salt = await bcrypt.genSalt(10);
    const hashedPassord = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassord
      }
    });

    const { jwtSecret } = useRuntimeConfig();    

    if (user && jwtSecret) {
      return {
        status: 201,
        data: {
          id: user.id,
          email: user.email,
          name,
          openWeatherKey: user.openWeatherKey,
          token: jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '30d' })
        }
      }
    } else {
      return {
        status: 400,
        message: 'Failed to create user'
      }
    }
  } catch {
    return {
      status: 500,
      message: 'Something went wrong'
    }
  }
})
