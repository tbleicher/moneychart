import shortid from "shortid";
import { TagPatterns } from "../testTagConfig";

function getTagsTree(tag) {
  return tag.split("::").map((t, idx, arr) => arr.slice(0, idx + 1).join("::"));
}

function mergeTags(tags, newTag) {
  const newTags = getTagsTree(newTag);
  return [...new Set(tags.concat(newTags))].sort();
}

function autoTagTransaction(desc) {
  let tags = [];
  TagPatterns.forEach((patterns, tag, map) => {
    patterns.forEach(pattern => {
      if (desc.toUpperCase().indexOf(pattern.toUpperCase()) >= 0) {
        tags = mergeTags(tags, tag);
      }
    });
  });
  return tags;
}

// from http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
function hashCode(s) {
  return (
    "#" +
    s
      .split("")
      .reduce(function(a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)
      .toString()
  );
}

function parseAmount(s) {
  s = s.replace('"', "");
  s = s.replace(",", "");
  return parseFloat(s);
}

function parseCSVLine(line) {
  if (!line) {
    return null;
  }
  try {
    const t = parseCSVLineSync(line);
    return validateTransaction(t);
  } catch (e) {
    console.warn(e);
    return null;
  }
}

function parseCSVLineSync(line) {
  // first three fields: transaction date, value date, reference:
  // 18-12-2015,18-12-2015,NNNXXXXNNNNNXXXX

  const parts = line.split(",");
  const transactionDate = parseTransactionDate(parts[0]);
  const valueDate = parseTransactionDate(parts[1]);
  const reference = parts[2];
  const description = parts[3];

  const amounts = line.split(',"');
  let debit = parseAmount(amounts[amounts.length - 3]);
  let credit = parseAmount(amounts[amounts.length - 2]);
  const balance = parseAmount(amounts[amounts.length - 1]);

  return formatTransaction({
    transactionDate,
    valueDate,
    reference,
    debit,
    credit,
    balance,
    description
  });
}

const formatTransaction = t => {
  const { transactionDate, valueDate, reference, balance, description } = t;
  const tags = autoTagTransaction(description);
  const id = hashCode(
    JSON.stringify({
      transactionDate,
      valueDate,
      reference,
      debit: t.debit,
      credit: t.credit,
      balance
    })
  );

  let { debit, credit } = t;
  if (debit < 0 && credit === 0) {
    credit = -1 * debit;
    debit = 0.0;
  }

  const transaction = {
    transactionDate,
    valueDate,
    reference,
    id,
    description,
    debit,
    credit,
    balance,
    tags
  };

  return transaction;
};

const linesToHSBCTransaction = lines => {
  if (!lines || !lines.length) {
    return null;
  }

  const date = parseHSBCDate(lines[0].split("\t")[0]);
  const description = lines.slice(1, lines.length - 1).join(" ");
  const values = lines[lines.length - 1].split("\t");
  const amount = parseFloat(values[0].replace("Amount", "").replace(",", ""));
  const balance = parseFloat(values[1].replace("Balance", "").replace(",", ""));

  const reference = `HSBC_${shortid.generate()}`;

  const t = {
    transactionDate: date,
    valueDate: date,
    reference,
    debit: amount < 0 ? -1 * amount : 0,
    credit: amount > 0 ? amount : 0,
    balance,
    description
  };

  return formatTransaction(t);
};

const parseHSBC = text => {
  return text
    .split(/\nDate/)
    .map(g => g.split("\n"))
    .map(linesToHSBCTransaction)
    .filter(t => t);
};

const parseHSBCDate = s => {
  return new Date(s.replace(/Date/, ""));
};

const parseTransactionDate = s => {
  const a = s.split("-");
  return new Date(`${a[1]}/${a[0]}/${a[2]}`);
};

const validateTransaction = t => {
  if (!t) {
    return null;
  }
  if (isNaN(t.debit)) {
    return null;
  }
  if (isNaN(t.credit)) {
    return null;
  }
  if (isNaN(t.balance)) {
    return null;
  }
  return t;
};

export { parseCSVLine, parseHSBC, mergeTags };
