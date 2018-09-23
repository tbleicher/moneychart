export const createTag = (account_id, tag) => {
  console.log("TEST TAG:", JSON.stringify(tag, null, 8));
  console.log("     acc:", account_id);
  const { label, color } = tag;

  return;
  return fetch(`/api/account/${account_id}/tags`, {
    method: "POST",
    body: JSON.stringify({ label, color }),
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
