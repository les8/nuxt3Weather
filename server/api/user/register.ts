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
        message: 'Пожалуйста, заполните обязательные поля'
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
        message: 'Пользователь, с таким email уже существует'
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
          token: jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '30d' })
        }
      }
    } else {
      return {
        status: 400,
        message: 'Не удалось создать пользователя'
      }
    }
  } catch {
    return {
      status: 500,
      message: 'Что-то пошло не так'
    }
  }
})
