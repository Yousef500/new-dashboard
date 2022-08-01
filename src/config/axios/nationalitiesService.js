import axios from "axios";
import { store } from "redux/store";

const nats = axios.create({
    baseURL: "http://iscope.asyadcapital.com:2101/api",
});

nats.interceptors.request.use(
    (config) => {
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
            console.log("config.data", config.data);
            config.data = data;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

const nationalitiesService = {
    getAll: () => nats.get("/Nationalities/GetLookUpNationalities"),
};

export default nationalitiesService;
