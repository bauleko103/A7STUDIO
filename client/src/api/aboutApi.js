import axiosClient from "./axiosClient";

const aboutApi = {

    // [GET] /about
    allAbout: () => {
        const url = `/about`;
        return axiosClient.get(url);
    },

};

export default aboutApi;