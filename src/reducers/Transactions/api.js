export const createTransaction = (accountId, transaction) => {
  // return Promise.resolve({ ...transaction, id: `${Math.random()}` });

  return fetch(`/api/account/${accountId}/transactions`, {
    method: "POST",
    body: JSON.stringify(transaction),
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

export const loadTransactions = account_id => {
  return fetch(`/api/account/${account_id}/transactions`)
    .then(response => {
      const json = response.json();

      return json;
    })
    .catch(error => ({
      error
    }));
};
