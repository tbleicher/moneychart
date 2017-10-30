import { encryptToLocalStorage, decryptFromLocalStorage } from './LocalStorage';

const PASSWORD = 'password';

describe('saveToLocalStorage', () => {
  it('saves stuff', () => {
    encryptToLocalStorage('foo', PASSWORD);
    const result = decryptFromLocalStorage(PASSWORD);
    expect(result).toBeDefined();
  });
});

describe('loadFromLocalStorage', () => {
  it('loads an object from storage', () => {
    const obj = { foo: 123, bar: 'baz' };
    encryptToLocalStorage(obj, PASSWORD);
    const result = decryptFromLocalStorage(PASSWORD);
    expect(result).toEqual(obj);
  });
});
