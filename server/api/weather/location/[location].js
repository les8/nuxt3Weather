export default defineEventHandler(async (event) => {
  const { location } = event.context.params;

  const { weatherApiKey } = useRuntimeConfig();

  const uri = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}`;
  const data = await $fetch(uri);

  return data;
})