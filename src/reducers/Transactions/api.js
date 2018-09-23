export const createTransaction = (accountId, transaction) => {
  console.log("TEST TRA:", JSON.stringify(transaction, null, 8));
  console.log("     acc:", accountId);

  // return Promise.resolve({ ...transaction, id: `${Math.random()}` });

  return fetch(`/api/account/${accountId}/transactions`, {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      console.log("transaction:", JSON.stringify(response, null, 2));
      return response.json();
    })
    .catch(error => ({
      error
    }));
};

export const loadTransactions = account_id => {
  return fetch(`/api/account/${account_id}/transactions`)
    .then(response => {
      const json = response.json();
      console.log(JSON.stringify(json, null, 2));
      return json;
    })
    .catch(error => ({
      error
    }));
};
