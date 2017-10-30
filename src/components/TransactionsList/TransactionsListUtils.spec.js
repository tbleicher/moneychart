import { mergeTransaction, mergeTransactionLists } from './TransactionsListUtils';

function tr(obj) {
  const t = { id: 1, description: '', tags: [] };
  return Object.assign({}, t, obj);
}
describe('mergeTransaction', () => {
  it('returns the first argument if the second argument is undefined', () => {
    const first = 'first';
    expect(mergeTransaction(first)).toEqual(first);
  });

  it('returns one object from two transaction objects', () => {
    const first = tr({ a: 'a' });
    const second = tr({ b: 'b' });
    const result = mergeTransaction(first, second);
    expect(result).toEqual(tr({ a: 'a', b: 'b' }));
  });
  
  it('uses the longer description property of both objects', () => {
    const first = tr({ description: 'abcde fghij' });
    const second = tr({ description: 'abcde' });
    const result1 = mergeTransaction(first, second);
    expect(result1).toEqual(tr({ description: 'abcde fghij' }));
    const result2 = mergeTransaction(second, first);
    expect(result2).toEqual(tr({ description: 'abcde fghij' }));
  });

  it('merges tags properties into one array of unique values', () => {
    const first = tr({ tags: ['a', 'b'] });
    const second = tr({ tags: ['b', 'c'] });
    const result = mergeTransaction(first, second);
    expect(result.tags.length).toEqual(3);
    ['a', 'b', 'c'].forEach( x => expect(result.tags).toContain(x) );
  });

  it('gives precedence to properties of the first object', () => {
    const a = tr({ name: 'a' });
    const b = tr({ name: 'b' });
    const resultA = mergeTransaction(a, b);
    expect(resultA.name).toEqual('a');
    const resultB = mergeTransaction(b, a);
    expect(resultB.name).toEqual('b');
  });

});

describe('mergeTransactionLists', () => {
  it('combines two arrays by id of the elements in array', () => {
    const arr1 = [ tr({ id: 1 }), tr({ id: 2 })];
    const arr2 = [ tr({ id: 3 }), tr({ id: 4 })];
    const result = mergeTransactionLists(arr1, arr2);
    expect(result.length).toEqual(4);
  });
  
  it('merges two objects with the same id', () => {
    const arr1 = [ tr({ id: 1 }), tr({ id: 2 })];
    const arr2 = [ tr({ id: 2 }), tr({ id: 4 })];
    const result = mergeTransactionLists(arr1, arr2);
    expect(result.length).toEqual(3);
  });

});