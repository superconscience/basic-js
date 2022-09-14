const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  __ERROR_INVALID_ARGUMENTS__ = 'Incorrect arguments!'
  constructor(direct = true) {
    this._direct = direct;
  }
  encrypt(...args) {
    return this._do(
      (message, key) => {
        let encryptedMessage = '';
        for (let i = 0, k = 0; i < message.length; i++) {
          const char = message[i];
          if (!ALPHABET.includes(char)) {
            encryptedMessage += char;
            continue;
          }
          encryptedMessage += VIGENERE_TABLE[char][key[k]];
          k++;
        }
        return encryptedMessage;
      },
      ...args
    );
  }
  decrypt(...args) {
    return this._do(
      (message, key) => {
        let encryptedMessage = '';
        for (let i = 0, k = 0; i < message.length; i++) {
          const char = message[i];
          if (!ALPHABET.includes(char)) {
            encryptedMessage += char;
            continue;
          }
          encryptedMessage += Object.entries(VIGENERE_TABLE[key[k]])
            .find(([columnKey, columnValue]) => columnValue === char)[0];
          k++;
        }
        return encryptedMessage;
      },
      ...args
    );
  }
  _do(handleMessage, ...args) {
    if (args.length < 2 || args[0] === undefined || args[1] === undefined)
      throw new Error(this.__ERROR_INVALID_ARGUMENTS__);

    let [message, key] = this._prepare(...args);

    if (key === '')
      return message;

    let handledMessage = handleMessage(message, key);

    return this._direct
      ? handledMessage
      : handledMessage.split('').reverse().join('');
  }
  _prepare(message, key) {
    message = String(message);
    key = String(key);

    message = message.toUpperCase();
    key = key.toUpperCase()
      .repeat(Math.ceil(message.length / key.length))
      .slice(0, message.length);
    return [message, key];
  }
}

const ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const VIGENERE_TABLE = Object.fromEntries(
  ALPHABET.map((char, i) => [
    char,
    Object.fromEntries(
      [
        ...ALPHABET.slice(i),
        ...ALPHABET.slice(0, i)
      ].map((char, k) => [ALPHABET[k], char])
    )
  ])
);

module.exports = {
  VigenereCipheringMachine
};
