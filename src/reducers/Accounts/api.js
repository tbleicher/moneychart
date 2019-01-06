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
  return fetch(`/api/account/${id}`, {
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
  return fetch(`/api/account/${id}`, {
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
  console.log("api.loadAccounts()");
  return fetch("/api/accounts")
    .then(response => {
      return response.json();
    })
    .catch(error => ({
      error
    }));
};
