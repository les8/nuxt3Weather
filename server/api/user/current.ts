export default defineEventHandler(async (event) => {
  /**
  * @route GET /api/user/current
  * @desc Текущий пользователь
  * @access Private
  */

  if (event.node.req.method !== 'GET') {
    return {
      status: 405,
      message: `Method ${event.node.req.method} not allowed`
    }
  }  

  if (event.context.auth) {
    return {
      status: 200,
      data: event.context.auth
    }
  } else {
    return {
      status: 500,
      message: 'Не удалось получить данные пользователя'
    }
  }



})