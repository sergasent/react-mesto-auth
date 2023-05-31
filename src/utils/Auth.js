const baseUrl = 'https://auth.nomoreparties.co';

function handleQuery({
  method, link, data, extraHeaders,
}) {
  const headers = {
    ...extraHeaders,
    'Content-Type': 'application/json',
  };

  return fetch(`${baseUrl}${link}`, {
    method,
    headers,
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export function getContent(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return handleQuery({
    method: 'GET',
    link: '/users/me',
    extraHeaders: headers,
  });
}

export function authorize(data) {
  return handleQuery({
    method: 'POST',
    link: '/signin',
    data,
  })
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
      }
      return res;
    });
}

export function register(data) {
  return handleQuery({
    method: 'POST',
    link: '/signup',
    data,
  });
}
