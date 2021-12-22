import axiosClient from "./axiosClient";

const menusApi = {

    // [GET] /menus
    allMenu: () => {
        const url = `/menus`;
        return axiosClient.get(url);
    },

};

export default menusApi;
