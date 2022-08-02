import axios from "axios";
import { store } from "redux/store";

const dead = axios.create({
    baseURL: "http://iscope.asyadcapital.com:2101/api",
});

dead.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const authToken = state.currentUser.userInfo.Token;
        config.headers.Authorization = `bearer ${authToken}`;
        config.headers["Accept-Language"] = "ar";
        if (config.url.includes("Search")) {
            const { page, pageSize, filterBy, filters } = state.dead;
            const data = {
                ...config.data,
                ...filters,
                sortBy: filters.sortBy ? filters.sortBy.value : null,
                orderby: filters.orderby?.length ? Number(filters.orderby) : 1,
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

const deadService = {
    searchDead: (data) => dead.post("/HonorTheDead/Search", data),
    editDead: (data) => dead.post("/HonorTheDead/Edit", data),
    addDead: (data) => dead.post("/HonorTheDead/Add", data),
};

export default deadService;
