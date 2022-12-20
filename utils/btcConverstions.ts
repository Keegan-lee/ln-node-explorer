
const CONVERSION_FACTOR = 100000000;

export const satsToBTC = (sats: number) => {
  return sats / CONVERSION_FACTOR;
}

export const btcToSATS = (btc: number) => {
  return btc * CONVERSION_FACTOR;
}