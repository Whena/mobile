import apisauce from 'apisauce';

const create = (type = '') => {
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

    //insepksi
    // const postInspeksiHeader = body => api.post('/inspection-header', body);
    // const postInspeksiDetail = body => api.post('/inspection-detail', body);



    return {
        api,
        login,
        // postInspeksiHeader,
        // postInspeksiDetail

    };
};

export default { create };