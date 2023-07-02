export function kelvinToFahrenheit(par: number): number {
  return ((par - 273.15) * 9) / 5 + 32;
}

export function kelvinToСelsius(par: number): number {
  return par - 273.15;
}

export function hectopascalToMillimetersMercury(par: number): number {
  return par * 0.75006;
}
