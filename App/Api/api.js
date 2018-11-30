import apisauce from 'apisauce';

const create = (type = '') => {
    let api;
    switch(type){
        case 'LOGIN':
            api = apisauce.create({
                // baseURL: Config.API_IDP_URI,
                baseURL: 'http://149.129.242.205:3001/api', //'http://172.18.7.212:3001/api',//
                headers: {
                    'Cache-Control': 'no-cache',
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                // auth: {
                // 	username: Config.API_IDP_USERNAME,
                // 	password: Config.API_IDP_PASSWORD
                // },
                // timeout: 10000
            });
            break;
        // case 'LOGOUT':
        //     api = apisauce.create({

        //     });
        default:
            break;
    }

    // POST
    const login = body => api.post('/login', body);
    const logout = body => api.post('/logut', body);

    return {
        api,
        login

    };
};

export default {create};