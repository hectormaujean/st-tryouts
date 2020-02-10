import apiConfig from './config';

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 503) {
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const login = (identifiant, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant, password })
    };

    return fetch(`${apiConfig.backendUrl}/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

export const logout = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_token: user.session_token })
    };

    return fetch(`${apiConfig.backendUrl}/logout`, requestOptions)
        .then(handleResponse)
        .then(() => {
            localStorage.removeItem('user');
        });
}
