export const createTag = account_id => {
  return fetch(`/api/account/${account_id}/tags`, {
    method: "POST",
    body: JSON.stringify({
      color: "#890abc",
      label: "bills::water"
    }),
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

export const loadTags = account_id => {
  return fetch(`/api/account/${account_id}/tags`)
    .then(response => {
      return response.json();
    })
    .catch(error => ({
      error
    }));
};
