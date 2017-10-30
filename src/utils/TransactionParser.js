import { TagPatterns } from '../testTagConfig';

function getTagsTree(tag) {
  return tag.split('::').map((t, idx, arr) => arr.slice(0, idx + 1).join('::'));
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
    '#' +
    s
      .split('')
      .reduce(function(a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)
      .toString()
  );
}

function parseAmount(s) {
  s = s.replace('"', '');
  s = s.replace(',', '');
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

  const parts = line.split(',');
  const transactionDate = parseTransactionDate(parts[0]);
  const valueDate = parseTransactionDate(parts[1]);
  const reference = parts[2];
  const description = parts[3];

  const amounts = line.split(',"');
  let debit = parseAmount(amounts[amounts.length - 3]);
  let credit = parseAmount(amounts[amounts.length - 2]);
  const balance = parseAmount(amounts[amounts.length - 1]);

  const tags = autoTagTransaction(description);
  const id_line = JSON.stringify({
    transactionDate,
    valueDate,
    reference,
    debit,
    credit,
    balance
  });
  const id = hashCode(id_line);

  if (debit < 0 && credit === 0) {
    credit = -1 * debit;
    debit = 0.0;
  }
  return {
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
}

function parseTransactionDate(s) {
  const a = s.split('-');
  return new Date(`${a[1]}/${a[0]}/${a[2]}`);
}

function validateTransaction(t) {
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
}

export { parseCSVLine, mergeTags };
