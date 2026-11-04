import CryptoJS from "crypto-js";

/**
 * Payload Security Utility
 * 
 * Provides AES-256-CBC encryption and decryption compatible with
 * PHP Laravel's openssl_encrypt / openssl_decrypt.
 */

const DEFAULT_KEY = "ZCMC_UMIS_SECURE_PAYLOAD_KEY_32B";
const SECRET_KEY =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_PAYLOAD_KEY
    ? import.meta.env.VITE_API_PAYLOAD_KEY
    : DEFAULT_KEY;

/**
 * Decrypt an API response payload.
 *
 * @param {any} data - The response body received from Axios
 * @returns {any} - Decrypted data object, or original data if not encrypted
 */
export function decryptApiResponse(data) {
  if (!data || typeof data !== "object") {
    return data;
  }

  const hasEncryptedFlag = data.encrypted === true;
  const hasPayloadString = typeof data.payload === "string" && data.payload.length > 0;

  if (!hasEncryptedFlag && !hasPayloadString) {
    return data;
  }

  try {
    const keyParsed = CryptoJS.enc.Utf8.parse(SECRET_KEY.padEnd(32, "0").substring(0, 32));

    // Case 1: Separate IV provided
    if (data.iv && typeof data.iv === "string") {
      const ivParsed = CryptoJS.enc.Base64.parse(data.iv);
      const decrypted = CryptoJS.AES.decrypt(data.payload, keyParsed, {
        iv: ivParsed,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
      if (decryptedStr) {
        return JSON.parse(decryptedStr);
      }
    }

    // Case 2: Combined IV + Ciphertext (IV is first 16 bytes / 4 words)
    const rawData = CryptoJS.enc.Base64.parse(data.payload);
    if (rawData.sigBytes > 16) {
      const iv = CryptoJS.lib.WordArray.create(rawData.words.slice(0, 4), 16);
      const ciphertext = CryptoJS.lib.WordArray.create(
        rawData.words.slice(4),
        rawData.sigBytes - 16
      );

      const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });
      const decrypted = CryptoJS.AES.decrypt(cipherParams, keyParsed, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
      if (decryptedStr) {
        return JSON.parse(decryptedStr);
      }
    }

    // Case 3: Fixed IV fallback (first 16 chars of key)
    const fallbackIv = CryptoJS.enc.Utf8.parse(SECRET_KEY.substring(0, 16));
    const decrypted = CryptoJS.AES.decrypt(data.payload, keyParsed, {
      iv: fallbackIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    if (decryptedStr) {
      return JSON.parse(decryptedStr);
    }
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.warn("Payload decryption failed, falling back to original data:", error);
    }
  }

  return data;
}

/**
 * Encrypt a request payload to be sent to the API.
 *
 * @param {any} data - The data object to encrypt
 * @returns {{ encrypted: true, payload: string }}
 */
export function encryptApiPayload(data) {
  try {
    const keyParsed = CryptoJS.enc.Utf8.parse(SECRET_KEY.padEnd(32, "0").substring(0, 32));
    const jsonString = typeof data === "string" ? data : JSON.stringify(data);

    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(jsonString, keyParsed, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const combined = iv.clone().concat(encrypted.ciphertext);
    const payload = CryptoJS.enc.Base64.stringify(combined);

    return {
      encrypted: true,
      payload: payload,
    };
  } catch (error) {
    console.error("Payload encryption failed:", error);
    return data;
  }
}
