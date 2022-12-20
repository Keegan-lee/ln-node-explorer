import { SYMBOLS, UNITS } from './constants';
import numberWithCommas from './numberWithCommas';
import { btcToSATS, satsToBTC } from './btcConverstions';

interface IBTCValue {
  amount: number;
  units: UNITS;
}

export const btcValueToString = (type: UNITS, value: IBTCValue, forceBTC = false) => {

  let amountToDisplay: number = 0;

  if (type === UNITS.Bitcoin && value.units === UNITS.Satoshi) {
    amountToDisplay = satsToBTC(value.amount);
  } else if ((type === UNITS.Satoshi && value.units === UNITS.Bitcoin) && !forceBTC) {
    amountToDisplay = btcToSATS(value.amount);
  } else {
    amountToDisplay = value.amount;
  }

  if (forceBTC || type === UNITS.Bitcoin) {
    return amountToDisplay.toFixed(8) + ` ${SYMBOLS.BITCOIN}`;
  } else {
    return numberWithCommas(amountToDisplay, 0) + ` ${SYMBOLS.SATOSHI}`;
  }
}