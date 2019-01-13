export const collectKeyDates = data => {
  const singleList = data
    .map(d => d.transactions.map(t => t.date))
    .reduce((singleList, arr) => [...singleList, ...arr], []);

  const datesMap = singleList.reduce((dates, date) => {
    dates[date.getTime()] = true;
    return dates;
  }, {});

  const dates = Object.keys(datesMap);

  dates.sort();

  return dates.map(d => new Date(parseInt(d, 10)));
};

export const fillAccountDates = (data, keyDates) => {
  const transactions = [...data.transactions];
  transactions.sort((a, b) => a.date - b.date);

  let _current = transactions[0].balance - transactions[0].amount;

  const byDate = transactions.reduce((byDate, tr) => {
    byDate[tr.date] = tr.balance;
    return byDate;
  }, {});

  const values = keyDates.reduce((values, date) => {
    // update _current if there is a transaction for this date
    if (byDate[date]) {
      _current = byDate[date];
    }

    values[date] = _current;
    return values;
  }, {});

  return { name: data.name, values };
};

export const interpolateData = data => {
  const keyDates = collectKeyDates(data);

  // fill in balance data for missing dates in account
  const filled = data.map(d => fillAccountDates(d, keyDates));

  const values = keyDates.map(date => {
    // create map to look up account value by name from filled data set
    const valuesByDate = filled.reduce(
      (values, account) => {
        values[account.name] = account.values[date];
        return values;
      },
      // add date key to aggregator
      { date }
    );

    return valuesByDate;
  });

  return values;
};
