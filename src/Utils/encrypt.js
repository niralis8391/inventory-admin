import CryptoJS from 'crypto-js';

export default function encryptData(payload) {
    const key = CryptoJS.enc.Utf8.parse("12345678901234567890123456789013"); // 32-byte key
    const iv = CryptoJS.enc.Utf8.parse("0000000000000000"); // 16-byte IV

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString(); // Base64 string
}
