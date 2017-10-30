export function mergeTransaction(t1, t2) {
  if (!t2) return t1;
  // use longer, more detailed description and corresponding id
  const description =
    t1.description.length > t2.description.length
      ? t1.description
      : t2.description;
  const tags = [...new Set(t1.tags.concat(t2.tags))];

  return Object.assign({}, t2, t1, { description, tags });
}

export function mergeTransactionLists(existing, arr) {
  const byId = existing.concat(arr).reduce((m, t) => {
    m.set(t.id, mergeTransaction(t, m.get(t.id)));
    return m;
  }, new Map());

  return Array.from(byId.values());
}
