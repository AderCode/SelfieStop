export default class APIs {
    static ip = {
        lt: 'https://smjetissah.localtunnel.me/'
    } 
    static heroku = {
        url: 'https://powerful-savannah-66747.herokuapp.com/'
    }
    static routes = {
        stops: '/stops',
        login: 'api/auth/login',
        logout: 'api/auth/logout',
        tokAuth: 'api/users/me',
        register: 'api/register'
    }

    static current = {
        url: `${APIs.heroku.url}api/`
    }

}