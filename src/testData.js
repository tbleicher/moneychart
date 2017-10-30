import { parseCSVLine } from './utils/TransactionParser';
import TagConfig from './testTagConfig';

import moment from 'moment';
import shortid from 'shortid';

// transactionDate, valueDate, reference, debit, credit, balance
function formatTransaction(t) {
  const [m, descr, debit_f, credit_f, balance_f] = t;
  const d = m.format('DD-MM-YYYY');
  const id = shortid.generate();
  const debit = debit_f.toFixed(2, 10);
  const credit = credit_f.toFixed(2, 10);
  const balance = balance_f.toFixed(2, 10);

  return `${d},${d},${id},${descr},"${debit}","${credit}","${balance}"`;
}

function getBillTransactions(dates) {
  const rent = dates
    .filter(d => d.date() === 3)
    .map(m => [m, `Dunmanifestin Apt 12b ${m.format('MMM YYYY')}`, 1100, 0, 0]);

  const power = dates
    .filter(d => d.date() === 12)
    .map(m => [
      m, `SunPower Account #01231234 ${m.format('MMM YYYY')}`,
      getFlexAmount(125, 20), 0, 0]);

  const water = dates
    .filter(d => d.date() === 12)
    .map(m => [
      m, `Water Works! Account #12340123 ${m.format('MMM YYYY')}`,
      getFlexAmount(85, 20), 0, 0]);

  const internet = dates
    .filter(d => d.date() === 8)
    .map(m => [
      m, `Interwebs LLC Acc#12340 Flat40 ${m.format('MMM YYYY')}`,
      49.95, 0, 0]);

  return rent.concat(power, water, internet);
}

function getFlexAmount(base, spread) {
  return base - spread / 2 + Math.random() * spread;
}

function getGroceryTransaction(m, base = 150, variation = 100) {
  return [
    m, `Green Grocer Super Markets Cashier ${Math.floor(
      26 * Math.random()
    )} ${m.format('HH:mm')}`,
    getFlexAmount(base, variation), 0, 0];
}

function getPosTransactions(dates) {
  return dates
    .filter(m => m.dayOfYear() % 8 === 0)
    .map(m => [m, `POS ${m.format('DD-MM-YY HH:mm')}`, 
      getFlexAmount(75, 120), 0, 0]); 
}

function getAtmTransactions(dates) {
  return dates
    .filter(m => m.dayOfYear() % 9 === 0)
    .map(m => [
      m, `ATM Main Street Branch ${m.format('DD-MM-YY HH:mm')}`,
      [150, 200, 250][Math.floor(Math.random() * 3)], 0, 0]);
}

function getSalaryTransaction(m, salary = 3450) {
  return [m, `Marley & Marley - Salary ${m.format('DD-MM-YY HH:mm')}`,
    0, salary, 0];
}

function getSalaryTransactions(dates) {
  return dates
    .filter(m => m.format('D') === '1')
    .map(m => moment(m).add(3600 * 1000 * 14.75))
    .map(m => getSalaryTransaction(m));
}

export function groceries_sat(dates) {
  return dates
    .filter(m => m.format('d') === '6')
    .map(m => moment(m).add(3600 * 1000 * (9 + 9 * Math.random())))
    .map(m => getGroceryTransaction(m));
}

export function groceries_week(dates) {
  return dates
    .filter(m => m.format('d') !== '0')
    .filter(m => m.dayOfYear() % 9 === 0)
    .map(m => moment(m).add(3600 * 1000 * (17 + 3 * Math.random())))
    .map(m => getGroceryTransaction(m, 50, 25));
}

export function generateCSVLines(number) {
  const dates = new Array(number)
    .fill(1)
    .map((n, idx) =>
      moment()
        .startOf('day')
        .subtract(idx, 'days')
    )
    .sort()
    .reverse();

  const transactions = []
    .concat(
      groceries_sat(dates),
      groceries_week(dates),
      getSalaryTransactions(dates),
      getAtmTransactions(dates),
      getBillTransactions(dates),
      getPosTransactions(dates)
    )
    .sort((a, b) => a[0] - b[0]);

  const balanced = setBalance(transactions);
  return balanced.map(t => formatTransaction(t));
}

function setBalance(transactions, start_value = 200) {
  let balance = start_value;

  return transactions.map(t => {
    balance = balance - t[2] + t[3];
    t[4] = balance;
    return t;
  });
}


export function generateTransactions() {
  return generateCSVLines(125)
  .map(line => parseCSVLine(line))
  .filter(t => t !== null);
}

export const transactions = generateTransactions();
export const tags = Array.from(TagConfig.values());
