class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleQuery({ relativeLink, method, body }) {
    const options = {
      method,
      headers: this._headers,
    };

    if (body) options.body = body;

    return fetch(`${this._baseUrl}${relativeLink}`, options)
      .then((response) => {
        if (response.ok) return response.json();

        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }

  getData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'GET',
    });
  }

  patchData(relativeLink, dataBody) {
    return this._handleQuery({
      relativeLink,
      method: 'PATCH',
      body: JSON.stringify(dataBody),
    });
  }

  postData(relativeLink, dataBody) {
    return this._handleQuery({
      relativeLink,
      method: 'POST',
      body: JSON.stringify(dataBody),
    });
  }

  deleteData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'DELETE',
    });
  }

  putData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'PUT',
    });
  }

  getInitialCards(relativeLink) {
    return this.getData(relativeLink);
  }
}

const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
    headers: {
      authorization: '389cc047-0fd3-4299-98ad-2eb5ed0f0d06',
      'content-type': 'application/json',
    },
  }
);

export default api;
