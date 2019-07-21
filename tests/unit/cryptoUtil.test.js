const cryptoUtil = require('../../utils/cryptoUtil');

describe('Encryption & Decryption', () => {
    it('should return the same text after decryption of the encrypted value', () => {
        const plaintext = 'my message text';
        /**
         * Ideally the password would be read from a file and will be in a Buffer
         */
        const key = cryptoUtil.getKeyFromPassword(Buffer.from('mysecretpassword'), cryptoUtil.getSalt());
        const ciphertext = cryptoUtil.encrypt(plaintext, key);

        const decryptOutput = cryptoUtil.decrypt(ciphertext, key);

        expect(decryptOutput.toString('utf8')).toBe(plaintext);
    });
});