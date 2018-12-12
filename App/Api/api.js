import apisauce from 'apisauce';
import TaskServices from '../Database/TaskServices'

const user = TaskServices.getAllData('TR_LOGIN')

const create = () => {
    let api = apisauce.create({
        baseURL: 'http://149.129.242.205:3001/api',
        headers: {
            'Cache-Control': 'no-cache',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });

    // POST
    const login = body => api.post('/login', body);
    const logout = body => api.post('/logut', body);

    //GET
    const getCategory = () => {
        api.setHeader('Authorization', `Bearer ${user[0].ACCESS_TOKEN}`)
        return api.get('/category')
    }
    const getContact = () => {
        api.setHeader('Authorization', `Bearer ${user[0].ACCESS_TOKEN}`)
        return api.get('/contacts')
    }

    return {
        api,
        login,
        getCategory,
        getContact

    };
};

export default { create };