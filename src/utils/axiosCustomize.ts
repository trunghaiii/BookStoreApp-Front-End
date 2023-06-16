import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    withCredentials: true,
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` }

const handleRefreshToken = async () => {
    let response = await instance.get("api/v1/auth/refresh")
    if (response && response.data) {
        return response.data.access_token
    }

    return null

}
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

let NO_RETRY_HEADER = false

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.config
        && error.response
        && +error.response.status === 401
        && !NO_RETRY_HEADER) {
        NO_RETRY_HEADER = true
        let newAccessToken = await handleRefreshToken()

        if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken)
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`
            return instance.request(error.config);
        }
    }

    return error && error.response && error.response.data ?
        error.response.data : Promise.reject(error);
});

export default instance