import { extent } from "d3";
import { nest } from "d3-collection";

// extend range of transaction times by 12 hours left and right
export const getXDomain = data => {
  if (!data.length) return [new Date(), new Date()];

  const ex = extent(data.map(d => d.date));
  const start = new Date(ex[0].getTime() - 1000 * 60 * 60 * 12);
  const end = new Date(ex[1].getTime() + 1000 * 60 * 60 * 12);

  return [start, end];
};

export const getYDomain = data => {
  const _ext = extent(
    data.map(d => d.balance - d.amount).concat(data.map(d => d.balance))
  );

  return [_ext[0], _ext[1] * 2];
};

export const nestData = (data, tagColors) => {
  const nested = nest()
    .key(function(d) {
      const date = d.date || d.date;
      return date.toISOString();
    })
    .entries(data);

  nested.forEach(pair => {
    let n = pair.values.length;
    let credits = pair.values.filter(t => t.amount > 0);

    if (credits.length === 0) {
      n = 1;
    }

    pair.values.forEach((v, i) => {
      if (n === 1) {
        v.perDay = [0, 1];
      } else {
        v.perDay = [i, n];
      }

      v.color = v.tags.length
        ? tagColors.get(v.tags[v.tags.length - 1])
        : "#cbcbcb";
    });
  });

  return nested;
};
