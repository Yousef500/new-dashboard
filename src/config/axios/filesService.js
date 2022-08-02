import axios from "axios";
import { store } from "redux/store";

const files = axios.create({
    baseURL: "http://iscope.asyadcapital.com:2101/api/ManageFiles",
});

files.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const authToken = state.currentUser.userInfo.Token;
        config.headers.Authorization = `bearer ${authToken}`;
        config.headers["Accept-Language"] = "ar";
        config.headers["Content-Type"] = "multipart/form-data";

        return config;
    },
    (err) => Promise.reject(err)
);

const filesService = {
    upload: (data) => files.post("/UploadMediaFilesForm", data),
};

export default filesService;
