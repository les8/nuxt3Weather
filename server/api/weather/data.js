export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { weatherApiKey } = useRuntimeConfig();
  let uri;

  if (query.hasOwnProperty('city')) {
    uri = `https://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${weatherApiKey}`;
  } else {
    uri = `https://api.openweathermap.org/data/2.5/weather?lat=${query.latitude}&lon=${query.longitude}&appid=${weatherApiKey}`;
  }

  const data = await $fetch(uri);

  return data;
})