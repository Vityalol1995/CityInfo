export const getWeather = async (city: string) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    return await response.json()
  } catch (e) {
    console.log(e)
  }
}
