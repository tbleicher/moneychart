import { csvParse } from "d3";
import shortid from "shortid";

const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

export const parseDate = string => {
  const [day, month, year] = string.split("-");

  const _year = parseInt(year, 10) + 2000;
  const _month = months.indexOf(month);
  const _day = parseInt(day, 10);

  return new Date(_year, _month, _day);
};

const customParser = string => {
  const data = csvParse(string, d => {
    // fields from cvs: Date,Amount,Balance,Comment
    const _amount = parseFloat(d.Amount.replace(/,/g, ""));
    const _date = parseDate(d.Date);

    return {
      date: _date, // new Date(+d.Date), // lowercase and convert "Year" to Date
      amount: _amount,
      balance: parseFloat(d.Balance.replace(/,/g, "")),
      description: d.Comment,

      // field names already in use
      transactionDate: _date,
      valueDate: _date,
      reference: `HSBC_${shortid.generate()}`,
      debit: _amount < 0 ? _amount : 0,
      credit: _amount > 0 ? _amount : 0
    };
  });

  return data.map((record, index, _data) => {
    if (index === data.length - 1) return { ...record, endOfDay: true };

    if (record.date.getDate() !== _data[index + 1].date.getDate())
      return { ...record, endOfDay: true };

    return record;
  });
};

export default customParser;
