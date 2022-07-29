import axios from "axios";
import { store } from "redux/store";

const dead = axios.create({
    baseURL: "http://iscope.asyadcapital.com:2101/api",
});

dead.interceptors.request.use(
    (config) => {
        if (config.url.includes("GetLogin")) return config;
        const state = store.getState();
        const authToken = state.currentUser.userInfo.Token;
        config.headers.Authorization = `bearer ${authToken}`;
        config.headers["Accept-Language"] = "ar";
        if (config.url.includes("Search")) {
            const { page, pageSize, filterBy } = state.dead;
            const data = {
                ...config.data,
                filterBy,
                page,
                pageSize,
            };
            console.log("config", config);
            config.data = data;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

const deadService = {
    searchDead: (data) => dead.post("/HonorTheDead/Search", data),
};

export default deadService;
