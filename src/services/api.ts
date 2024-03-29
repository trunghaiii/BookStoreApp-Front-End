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
    // console.log(imageFile);

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

export const postCreateBook = (
    name: string, author: string,
    genre: string, price: string,
    quantity: string, sold: string,
    imageFiles: any

) => {

    const data = new FormData();
    data.append('name', name);
    data.append('author', author);
    data.append('price', price);
    data.append('genre', genre);
    data.append('quantity', quantity);
    data.append('sold', sold);
    data.append('imageUrlArray', imageFiles);

    return axios.post('api/v1/book', data);
}

export const postUploadBookImage = (
    imageFile: any

) => {

    const data = new FormData();
    data.append('bookImageFile', imageFile);

    return axios.post('api/v1/book/upload-image', data);
}

export const putUpdateBook = (id: string, bookName: string, price: string, quantity: string, sold: string) => {
    // add URLSearchParams to fix bug not attach payload when sending api endpoint
    const params = new URLSearchParams({ id, bookName, price, quantity, sold });
    return axios.put('api/v1/book', params)
}

export const deleteBook = (bookId: string) => {
    return axios.delete(`api/v1/book?id=${bookId}`)
}

export const getBookDetail = (bookId: any) => {
    return axios.get(`api/v1/book/detail?bookId=${bookId}`)
}

export const getHomeBookPagination = (query) => {
    return axios.get(`api/v1/book/home?${query}`)
}

export const getComment = (bookId: string) => {
    return axios.get(`api/v1/book/comment?bookId=${bookId}`)
}

export const postComment = (bookId: string, userId: string, content: string, rate: any) => {
    return axios.post(`api/v1/book/comment?bookId=${bookId}&userId=${userId}&content=${content}&rate=${rate}`)
}

export const deleteComment = (commentId: string, bookId: string) => {
    return axios.delete(`api/v1/book/comment?commentId=${commentId}&bookId=${bookId}`)
}

export const postOrder = (data: any) => {
    return axios.post(`api/v1/order`, data)
}

export const getOrderHistory = (current: any, pageSize: any) => {
    return axios.get(`api/v1/order/history?current=${current}&pageSize=${pageSize}`)
}

export const putUpdateUserInfo = (
    name: string, phone: string,
    imageFile: any

) => {

    const data = new FormData();
    data.append('userName', name);
    data.append('phone', phone);
    data.append('userImage', imageFile);

    return axios.put('api/v1/user/info', data);
}

export const putUpdatePassword = (oldPass: string, newPass: string) => {
    // add URLSearchParams to fix bug not attach payload when sending api endpoint
    const params = new URLSearchParams({
        password: newPass,
        oldPassword: oldPass
    });
    return axios.put('api/v1/user/password', params)
}

export const getDashboard = () => {

    return axios.get('api/v1/dashboard')
}

export const getOrderPagination = (current: number | string, pageSize: number | string) => {
    return axios.get(`api/v1/order?current=${current}&pageSize=${pageSize}`)
}

export const postMarkDeliveredPending = (id: string, isFinished: boolean) => {
    return axios.post(`api/v1/order/delivered?id=${id}&isFinished=${isFinished}`)
}