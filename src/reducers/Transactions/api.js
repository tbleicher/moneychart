export const createTransaction = (accountId, transaction) => {
  // return Promise.resolve({ ...transaction, id: `${Math.random()}` });

  return fetch(`/api/account/${accountId}/transactions`, {
    method: "POST",
    body: JSON.stringify({ ...transaction, accountId }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(tr => ({ ...tr, date: new Date(tr.date), tags: tr.tags || [] }))
    .catch(error => ({
      error
    }));
};

export const loadTransactions = accountId => {
  console.log(`/api/account/${accountId}/transactions`);
  return fetch(`/api/account/${accountId}/transactions`)
    .then(response => {
      const json = response.json();

      return json;
    })
    .catch(error => ({
      error
    }));
};
