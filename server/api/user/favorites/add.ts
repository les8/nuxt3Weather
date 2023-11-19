import { prisma } from '~/prisma/prisma-client';


export default defineEventHandler(async (event) => {
  /**
  * @route POST /api/user/favorites/add
  * @desс Добавление избранного города
  * @access Private
  */

  if (event.node.req.method !== 'POST') {
    return {
      status: 405,
      message: `Method ${event.node.req.method} not allowed`
    }
  }

  try {    
    const { name } = await readBody(event);    

    if (!name) {
      return {
        status: 400,
        message: 'Bad Request'
      }
    }    
    
    const selectedCity = await prisma.favoritesCities.findFirst({
      where: {
        name,
        userId: event.context.auth.id
      }
    });    

    if (selectedCity) {
      return {
        status: 400,
        message: `City '${name}' has already been added to favorites`
      }
    }

    const city = await prisma.favoritesCities.create({
      data: {
        name,
        userId: event.context.auth.id
      }
    });
    

    if (city) {
      return {
        status: 201,
        data: {
          id: city.id,
          name,
          userId: city.userId
        }
      }
    } else {
      return {
        status: 400,
        message: `City '${name}' could not be added to favorites`
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong'
    }
  }
})