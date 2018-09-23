export const createTransaction = (accountId, transaction) => {
  console.log("TEST TRA:", JSON.stringify(transaction, null, 8));
  console.log("     acc:", accountId);

  return Promise.resolve({ ...transaction, id: `${Math.random()}` });

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
    .catch(error => ({
      error
    }));
};
