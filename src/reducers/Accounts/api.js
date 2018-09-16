export const addAccount = account => {
  const { name, number } = account;

  return fetch("/api/accounts", {
    method: "POST",
    body: JSON.stringify({ name, number }),
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

export const deleteAccount = id => {
  return fetch(`/api/accounts/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => ({
      error
    }));
};

export const loadAccount = id => {
  console.log("id", id);
  return fetch(`/api/accounts/${id}`, {
    method: "GET",
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

export const loadAccounts = () => {
  return fetch("/api/accounts")
    .then(response => {
      return response.json();
    })
    .catch(error => ({
      error
    }));
};
