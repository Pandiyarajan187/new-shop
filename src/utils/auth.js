export const isAuthenticated = () => {
    if(localStorage.getItem('token')){
        return {token: localStorage.getItem('token'), user: JSON.parse(localStorage.getItem('user'))}
    }
    return false;
}