export interface IErrorReturn {
  success: boolean;
  message?: string;
}

const PUBKEY_REGEX = /[a-z0-9]{66}/;
export const isPubKey = (pubkey: string): IErrorReturn => {
  if (pubkey === null || pubkey === undefined || pubkey === '') return { success: false, message: 'Please a public key belonging to a bitcoin lightning node' };
  if (!PUBKEY_REGEX.test(pubkey)) return { success: false, message: 'Invalid Input: Please enter a valid bitcoin lightning node public key'};
  return { success: true };
}
