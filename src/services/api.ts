import axios from "../utils/axiosCustomize"

export const postRegisterUser = (fullName: string, email: string, password: string, phone: string) => {
    // add URLSearchParams to fix bug not attach payload when sending api endpoint
    const params = new URLSearchParams({ fullName, email, password, phone });
    return axios.post('api/v1/user/register', params)
}

export const postLogin = (email: string, password: string) => {
    // add URLSearchParams to fix bug not attach payload when sending api endpoint
    const params = new URLSearchParams({ email, password });
    return axios.post('api/v1/auth/login', params)
}

export const getFetchAccount = () => {
    return axios.get('api/v1/auth/account')
}

export const postLogOut = () => {
    return axios.post('api/v1/auth/logout')
}

export const getUserPagination = (query) => {
    return axios.get(`api/v1/user?${query}`)
}

export const postCreateUser = (name: string, password: string, email: string, phone: string, imageFile: any) => {
    console.log(imageFile);

    const data = new FormData();
    data.append('fullName', name);
    data.append('password', password);
    data.append('email', email);
    data.append('phone', phone);
    data.append('userImage', imageFile);

    return axios.post('api/v1/user', data);
}

export const putUpdateUser = (_id: string, fullName: string, email: string, phone: string, role: string) => {
    // add URLSearchParams to fix bug not attach payload when sending api endpoint
    const params = new URLSearchParams({ _id, fullName, email, phone, role });
    return axios.put('api/v1/user', params)
}

export const deleteUser = (userId: string) => {
    return axios.delete(`api/v1/user?_id=${userId}`)
}

export const getBookPagination = (query) => {
    return axios.get(`api/v1/book?${query}`)
}