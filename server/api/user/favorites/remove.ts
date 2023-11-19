import { prisma } from '~/prisma/prisma-client';

export default defineEventHandler(async (event) => {
  /**
  * @route DELETE /api/user/favorites/remove
  * @desс Удаление города из избранного избранного
  * @access Private
  */

  if (event.node.req.method !== 'DELETE') {
    return {
      status: 405,
      message: `Method ${event.node.req.method} not allowed`
    }
  }

  try {    
    const body = await readBody(event);

    if (!body || !body.id) {
      return {
        status: 400,
        message: 'Please fill in the required fields'
      }
    }
    
    const selectedCity = await prisma.favoritesCities.findFirst({
      where: {
        id: body.id,
      }
    });    

    if (!selectedCity) {
      return {
        status: 400,
        message: `City with id '${body.id}' is not in the favorites list`
      }
    } else {
      await prisma.favoritesCities.delete({
        where: {
          id: body.id,
        }
      });

      return {
        status: 204
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong'
    }
  }
})