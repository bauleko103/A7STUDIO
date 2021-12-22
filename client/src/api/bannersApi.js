import axiosClient from "./axiosClient";

const bannersApi = {

    // [GET] /banners
    allBanner: () => {
        const url = `/banners`;
        return axiosClient.get(url);
    },

};

export default bannersApi;