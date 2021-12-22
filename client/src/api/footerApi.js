import axiosClient from "./axiosClient";

const footerApi = {

    // [GET] /footer
    allFooter: () => {
        const url = `/footer`;
        return axiosClient.get(url);
    },

};

export default footerApi;
