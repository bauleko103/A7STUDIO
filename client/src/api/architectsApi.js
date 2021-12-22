import axiosClient from "./axiosClient";

const architectsApi = {

    // [GET] /architects
    allArchitects: () => {
        const url = `/architects`;
        return axiosClient.get(url);
    },

};

export default architectsApi;