import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/LoandingScreen';

const Loadable = Component => props => {
    return (
        <Suspense
            fallback={<LoadingScreen/>}
        >
            <Component {...props} />
        </Suspense>
    );
};

const Router = () => {
    return useRoutes([
        
        {path: '/news', element: <News /> },
        {path: '/projects', element: <Projects /> },
        {path: '/about', element: <About /> },
        {path: '/', element: <Home /> },
        {path: '/projects/:slug', element: <ProjectDetail/> },
        {path: '/news/:slug', element: <NewsDetail/> },
    ])

};

export default Router;

const Home = Loadable(lazy(() => import('../pages/Home')));
const News = Loadable(lazy(() => import('../pages/News')));
const Projects = Loadable(lazy(() => import('../pages/Projects')));
const About = Loadable(lazy(() => import('../pages/About')));
const ProjectDetail = Loadable(lazy(() => import('../components/details/ProjectDetail')))
const NewsDetail = Loadable(lazy(() => import('../components/details/NewsDetail')))
