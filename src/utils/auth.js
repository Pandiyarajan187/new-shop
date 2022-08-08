export const isAuthenticated = () => {
    if(localStorage.getItem('token')){
        return JSON.parse(localStorage.getItem('token'))
    }
    return false;
}