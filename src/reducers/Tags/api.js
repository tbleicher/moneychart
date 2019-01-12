export const createTag = (accountId, tag) => {
  console.log("TEST TAG:", JSON.stringify(tag, null, 8));
  console.log("     acc:", accountId);
  const { label, color } = tag;

  return fetch(`/api/account/${accountId}/tags`, {
    method: "POST",
    body: JSON.stringify({ accountId, label, color }),
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

export const loadTags = accountId => {
  return fetch(`/api/account/${accountId}/tags`)
    .then(response => {
      return response.json();
    })
    .catch(error => ({
      error
    }));
};
