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
    const body = await readBody(event);    

    if (!body || !body.name) {
      return {
        status: 400,
        message: 'Please fill in the required fields'
      }
    }    
    
    const selectedCity = await prisma.favoritesCities.findFirst({
      where: {
        name: body.name,
        userId: event.context.auth.user.id
      }
    });    

    if (selectedCity) {
      return {
        status: 400,
        message: `City '${body.name}' has already been added to favorites`
      }
    }

    const city = await prisma.favoritesCities.create({
      data: {
        name: body.name,
        userId: event.context.auth.user.id
      }
    });
    

    if (city) {
      return {
        status: 201,
        data: {
          id: city.id,
          name: body.name
        }
      }
    } else {
      return {
        status: 400,
        message: `City '${body.name}' could not be added to favorites`
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong'
    }
  }
})