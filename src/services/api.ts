import axios from "../utils/axiosCustomize"

export const postRegisterUser = (fullName: string, email: string, password: string, phone: string) => {
    // add URLSearchParams to fix bug not attach payload when sending api endpoint
    const params = new URLSearchParams({ fullName, email, password, phone });
    return axios.post('api/v1/user/register', params)
}