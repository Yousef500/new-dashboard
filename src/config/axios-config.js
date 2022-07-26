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
        config.headers["Accept-Language"] = "ar";
        if (config.url.includes("Search")) {
            const { page, pageSize, filterBy } = state.users;
            const data = {
                ...config.data,
                filterBy,
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
    getAllUsers: (data) => ax.post("/Users/Search", data),
    resetPass: (data) => ax.post("/Users/ResetUserPassword", data),
    create: (data) => ax.post("/Users/Add", data),
    edit: (data) => ax.post("/Users/Edit", data),
    getJobs: () => ax.get("/UserJobs/GetLookUpUserJobs"),
    getAllUsersRoles: () => ax.get("/Roles/GetLookUpSecurityRoles"),
    getUsersByJobId: (id) => ax.get(`/Users/GetLookUpUsersByJobId?securityUserJobId=${id}`),
    addUser: (data) => ax.post("/Users/Add", data),
    changeStatus: ({ userId, status }) =>
        ax.post(`/Users/ChangeActivityStatus?userId=${userId}&isActive=${status}`),
    resetPassword: (data) => ax.post("/Users/ResetUserPassword", data),
};
