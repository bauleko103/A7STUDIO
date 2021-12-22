import * as React from 'react';
import { styled } from "@mui/material/styles";
import Box from '@mui/material/Box';
import NewsCard from '../components/news/NewsCard';
import Pagination from '../components/Pagination/Pagination';
import newsApi from '../api/newsApi';
import { Grid } from '@mui/material';
import LoadingScreen from '../components/LoandingScreen';

const StyleBox = styled(Box)({
  padding: '0 2vh',
  maxWidth: '120vh',
  margin: '1vh auto',
  backgroundColor: 'white',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  flexDirection: 'colurmn',
  height: '80vh',
  zIndex: '100',
  position: 'relative'
});

export default function News() {
  const [newsList, setNewsList] = React.useState(null);
  const [filters, setFilters] = React.useState({
    number: 6,
    page: 1,
  });

  React.useEffect(() => {
    const fetchNewsList = async () => {
      try {
        const response = await newsApi.listNews(filters.page, filters.number);
        setNewsList(response);
      } catch (error) {
        console.log('Failed to fetch news list: ', error)
      }
    }

    fetchNewsList();
  }, [filters])

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      page: newPage,
    })
  }

  return (
    <>
      {newsList && (
        <React.Fragment >
          <StyleBox >
            <Box sx={{ height: { xs: 'auto', sm: '80vh' } }}>
              <Grid container spacing={1}>
                {newsList.news.map((news) => (
                  <Grid key={news._id} item xs={12} sm={4} sx={{ paddingTop: '0' }}>
                    <NewsCard news={news} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Pagination
              pagination={newsList.pagination}
              onPageChange={handlePageChange}
            />
          </StyleBox>

        </React.Fragment >
      )}
      {!newsList && (<LoadingScreen />)}
    </>


  );
}
