import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import newsApi from "../../api/newsApi";
import LoadingScreen from "../LoandingScreen";

const StyleBox = styled(Box)({
    padding: '0 2vh',
    maxWidth: '120vh',
    margin: '1vh auto',
    backgroundColor: 'white',
    height: '50vh',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    flexDirection: 'colurmn',
    position: 'relative',
    zIndex: '100'
});

const StyleBoxContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    maxWidth: '120vh',
    margin: '0 auto',
    paddingTop: '2vh',
    [theme.breakpoints.down('md')]: {
        paddingTop: '10px',
    }
}));

export default function NewsDetail() {

    const [news, setNews] = useState(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await newsApi.getNews(pathname.split('/').pop());
                const { news, prevNews, nextNews } = response
                setNews({
                    current: news,
                    prevNews,
                    nextNews
                });

            } catch (error) {
                console.log('Failed to get news: ', error);
            }
        }

        getNews();
    }, [pathname]);

    function handleClick(newsCurrent) {
        if (newsCurrent == null) {
            return `/news`
        }
        else {
            return `/news/${newsCurrent.slug}`
        }
    }

    return (
        <>
            {news && (
                <>
                    <StyleBox >
                        <img className="img-news-detail"
                            src={`${process.env.REACT_APP_IMAGE_URL}/${news.current.image}`}
                            alt={news.current.name}
                        />
                        <StyleBoxContent>
                            <Box sx={{ width: '100%' }}>
                                <Typography className="section-title" sx={{ fontSize: '18px', fontWeight: '900' }} >
                                    {news.current.title}
                                </Typography>
                                <Typography variant="p" sx={{ fontSize: '12px', color: '#6D6D6D' }}>
                                    <div className="scrollbar scrollbar-detail" id="style-4">
                                        <div className="force-overflow"
                                            dangerouslySetInnerHTML={{ __html: `${news.current.description}` }}
                                        >
                                        </div>
                                    </div>
                                </Typography>
                            </Box>

                        </StyleBoxContent>
                        <Box sx={{ paddingTop: { xs: '0', lg: '20px' } }} >
                            <div className='pagination'>
                                {news.prevNews && (
                                    <a
                                        className="button-transfer-page"
                                        href={handleClick(news.prevNews)}
                                    >
                                        P R E V
                                        <br />
                                        <div className="button-transfer-page-title">
                                            {news.prevNews.title}
                                        </div>
                                    </a>
                                )}
                                {!news.prevNews && (
                                    <button className="button-transfer-page" disabled={true}></button>
                                )}

                                {news.nextNews && (
                                    <a
                                        className="button-transfer-page button-next"
                                        href={handleClick(news.nextNews)}
                                    >
                                        N E X T
                                        <br />
                                        <div className="button-transfer-page-title">
                                            {news.nextNews.title}
                                        </div>
                                    </a>
                                )}
                                {!news.nextNews && (
                                    <button className="button-transfer-page button-next" disabled={true}></button>
                                )}
                            </div>
                        </Box>
                    </StyleBox>
                </>
            )}
            {!news && (<LoadingScreen />)}
        </>

    )
}