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
    const { email, password } = await readBody(event);

    if (!email || !password) {
      return {
        status: 400,
        message: 'Please fill in the required fields'
      }
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    const { jwtSecret } = useRuntimeConfig();

    if (user && isPasswordCorrect && jwtSecret) {
      return {
        status: 200,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          token: jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '30d' })
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