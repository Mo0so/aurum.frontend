import axios from 'axios'

export const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const axiosClient = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true,
})
