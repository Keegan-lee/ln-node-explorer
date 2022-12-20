
const truncate = (n: number, fixed: number): number => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);

export default function numberWithCommas(x: number = 0, places: number = 2) {
  return truncate(x, places).toFixed(places).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}