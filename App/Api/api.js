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

<<<<<<< HEAD
    const postRegion =  body => {
        api.setHeader('Authorization', `Bearer ${user[0].ACCESS_TOKEN}`)
        return api.post('/mobile-sync', body);
    }

=======
    //insepksi
    const postInspeksiHeader = body => {
        api.setHeader('Authorization', `Bearer ${user[0].ACCESS_TOKEN}`);
        api.post('/inspection-header', body);
    };
    const postInspeksiDetail = body => {
        api.setHeader('Authorization', `Bearer ${user[0].ACCESS_TOKEN}`);
        api.post('/inspection-detail', body);
    }


>>>>>>> 9940a5e84025b9dc0ca0fbb8a836fd5fc5da8346
    //GET
    const getCategory = () => {
        api.setHeader('Authorization', `Bearer ${user[0].ACCESS_TOKEN}`)
        return api.get('/category')
    }
    const getContact = () => {
        api.setHeader('Authorization', `Bearer ${user[0].ACCESS_TOKEN}`)
        return api.get('/contacts')
    }



    const getRegion = () => {
        api.setHeader('Authorization', `Bearer ${user[0].ACCESS_TOKEN}`)
        return api.get('/mobile-sync/hectare-statement/region')
    }


    return {
        api,
        login,
        getCategory,
        getContact,
        getRegion,
<<<<<<< HEAD
        postRegion
=======
        postInspeksiHeader,
        postInspeksiDetail
>>>>>>> 9940a5e84025b9dc0ca0fbb8a836fd5fc5da8346
    };
};

export default { create };