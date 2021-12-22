import axiosClient from "./axiosClient";

const projectApi = {
    // [GET] /projects/page/number
    listProject: (page, number) => {
        const url = `/projects/${page}/${number}`;
        return axiosClient.get(url);
    },

    // [GET] /projects
    allProject: () => {
        const url = `/projects/`;
        return axiosClient.get(url);
    },

    // [GET] /projects/:slugProject
    getProject: (slugProject) => {
        const url = `/projects/${slugProject}`;
        return axiosClient.get(url);
    },
};

export default projectApi;