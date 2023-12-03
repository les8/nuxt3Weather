import { prisma } from '~/prisma/prisma-client';

export default defineEventHandler(async (event) => {
  /**
  * @route DELETE /api/user/remove
  * @desс Удаление аккаунта
  * @access Private
  */

  if (event.node.req.method !== 'DELETE') {
    return {
      status: 405,
      message: `Method ${event.node.req.method} not allowed`
    }
  }  

  try {
    Promise.all([
      prisma.settings.delete({
        where: {
          userId: event.context.auth.user.id,
        }
      }),
      prisma.favoritesCities.deleteMany({
        where: {
          userId: event.context.auth.user.id,
        }
      }),
      prisma.user.delete({
        where: {
          id: event.context.auth.user.id,
        }
      })
    ])

    return {
      status: 204
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong'
    }
  }
})