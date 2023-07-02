export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { weatherApiKey } = useRuntimeConfig();
  const cookieKey = getCookie(event, 'key');
  const currentKey: string = cookieKey ? cookieKey : weatherApiKey;
  let uri;

  if (query.hasOwnProperty('city')) {
    uri = `https://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${currentKey}`;
  } else {
    uri = `https://api.openweathermap.org/data/2.5/weather?lat=${query.latitude}&lon=${query.longitude}&appid=${currentKey}`;
  }

  const data = await $fetch(uri);

  return data;
})