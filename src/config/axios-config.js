import axios from "axios";
import { store } from "redux/store";

const ax = axios.create({
    baseURL: "http://iscope.asyadcapital.com:2101/api",
});

ax.interceptors.request.use(
    (config) => {
        if (config.url.includes("GetLogin")) return config;
        const state = store.getState();
        const authToken = state.currentUser.userInfo.Token;
        config.headers.Authorization = `bearer ${authToken}`;
        if (config.url.includes("Search")) {
            const { page, pageSize } = state.users;
            const data = {
                ...config.data,
                page,
                pageSize,
            };
            console.log("config.data", data);
            config.data = data;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

export const usersAx = {
    login: ({ username, password }) =>
        ax.get(`/Users/GetLogin?username=${username}&password=${password}`),
    getAll: (data) => ax.post("/Users/Search", data),
    resetPass: (data) => ax.post("/Users/ResetUserPassword", data),
    create: (data) => ax.post("/Users/Add", data),
    edit: (data) => ax.post("/Users/Edit", data),
};
