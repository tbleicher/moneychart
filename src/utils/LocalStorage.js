import CryptoJS from 'crypto-js';

function testStorage() {
  const storage = {};
  return {
    getItem: (key) => storage[key],
    setItem: (key, value) => storage[key] = value
  };
}

const localStorage = window.localStorage || testStorage();

let STORAGE_KEY = 'state';
if (process.env.NODE_ENV === 'development') {
  STORAGE_KEY = 'state_dev';
} 

function decryptFromLocalStorage(password) {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    const decrypted = CryptoJS.AES
      .decrypt(encrypted, password)
      .toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch(err) {
    console.error(err);
    return {};
  }
}

function encryptToLocalStorage(obj, password) {
  const text = JSON.stringify(obj);
  const encrypted = CryptoJS.AES.encrypt(text, password);
  try {
    localStorage.setItem(STORAGE_KEY, encrypted.toString());
  } catch(err) {
    console.error(err);
  }
}

export { decryptFromLocalStorage, encryptToLocalStorage }
