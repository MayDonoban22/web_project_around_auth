
export default class Api {
    constructor(baseUrl, headers) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    getUsers() {
        return fetch(`${this.baseUrl}users/me`, {
            method: "GET",
            headers: this.headers,
        }).then((response) => {
            if (response.ok) return response.json();
            return Promise.reject("Error en la solicitud");
        });
    }
    getCards() {
        return fetch(`${this.baseUrl}cards`, {
            method: "GET",
            headers: this.headers,
        }).then((response) => {
            if (response.ok) return response.json();
            return Promise.reject("Error en la solicitud");
        });
    }
    editUser(name, about) {
        return fetch(`${this.baseUrl}users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then((response) => {
            if (response.ok) return response.json();
            return Promise.reject("Error en la solicitud");
        });
    }
    createCard(card) {
        return fetch(`${this.baseUrl}cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        }).then((response) => {
            if (response.ok) return response.json();
            return Promise.reject("Error en la solicitud");
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        const method = isLiked ? "DELETE" : "PUT";
        return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
            method: method,
            headers: this.headers,
            body: JSON.stringify(),
        })
            .then((response) => {
                if (response.ok) return response.json();
                return Promise.reject("Error en la solicitud");
            });
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        }).then((response) => {
            if (response.ok) return response.json();
            return Promise.reject("Error en la solicitud");
        });
    }
    editAvatar(data) {
        return fetch(`${this.baseUrl}users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then((response) => {
            if (response.ok) return response.json();
            return Promise.reject("Error en la solicitud");
        });
    }
}
export const api = new Api("https://around-api.es.tripleten-services.com/v1/", {
    authorization: "11107250-1ed5-4df7-8f20-016f79a12822",
    "Content-Type": "application/json",
});


