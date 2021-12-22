import axiosClient from "./axiosClient";

const newsApi = {
    // [GET] /news
    listNews: (page, number) => {
        const url = `/news/${page}/${number}`;
        return axiosClient.get(url);
    },
    // [GET] /news
    allNews: () => {
        const url = `/news/`;
        return axiosClient.get(url);
    },
    // [GET] /news/:slugNews
    getNews: (slugNews) => {
        const url = `/news/${slugNews}`;
        return axiosClient.get(url);
    },
};

export default newsApi;
