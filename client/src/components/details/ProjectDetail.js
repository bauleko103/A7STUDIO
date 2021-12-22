import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SlideProject from "./slide/SlideProject";
import { Grid, Typography } from "@mui/material";
import projectApi from "../../api/projectApi";
import moment from 'moment';
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


export default function ProjectDetail() {
    const [project, setProject] = useState(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await projectApi.getProject(pathname.split('/').pop());
                const { project, prevProject, nextProject } = response
                setProject({
                    current: project,
                    prevProject,
                    nextProject
                });

            } catch (error) {
                console.log('Failed to get project: ', error);
            }
        }

        getProject();
    }, [pathname]);

    console.log(project);

    function handleClick(projectCurrent) {
        if (projectCurrent == null) {
            return `/projects`
        }
        else {
            return `/projects/${projectCurrent.slug}`
        }
    }

    return (
        <>
            {project && (
                <>
                    <StyleBox>
                        <SlideProject images={project.current.images} />
                        <Typography className="section-title" sx={{ fontSize: '18px', height: 'auto', paddingTop: { xs: '10px', md: '2vh' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >
                            {project.current.name}
                        </Typography>
                        <Grid container
                            direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
                            sx={{
                                maxWidth: '120vh',
                                
                            }}>
                            <Grid item xs={9.065}>


                                <div className="scrollbar scrollbar-detail" id="style-4">
                                    <div className="force-overflow">
                                        <Typography variant="p" sx={{ fontSize: '12px', color: '#6D6D6D' }}>
                                            <div dangerouslySetInnerHTML={{ __html: `${project.current.description}` }}></div>

                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={2.935} sx={{ paddingLeft: '15px', marginTop: '-5px'}}>
                                <Typography variant="p" sx={{ color: '#000000', fontSize: '14px' }}>
                                    TIME:
                                    <Typography variant="p" sx={{ color: '#6D6D6D', marginLeft: '10px', fontSize: '14px' }}>
                                        {moment(project.current.createAt).format('DD/MM/YYYY')}
                                    </Typography>
                                </Typography>
                                <br />
                                <Typography variant="p" sx={{ color: '#000000', fontSize: '14px' }} >
                                    ARCHITECT:
                                    <Typography variant="p" sx={{ color: '#6D6D6D', marginLeft: '10px' }}>
                                        {project.current.architect.name}
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ paddingTop: { xs: '0', lg: '20px' } }} >
                            <div className='pagination'>
                                {project.prevProject && (
                                    <div>
                                        <a
                                            className="button-transfer-page"
                                            href={handleClick(project.prevProject)}
                                        >
                                            P R E V
                                            <br />
                                            <div className="button-transfer-page-title">
                                                {project.prevProject.name}
                                            </div>

                                        </a>

                                    </div>

                                )}
                                {!project.prevProject && (
                                    <button className="button-transfer-page" disabled={true}></button>
                                )}

                                {project.nextProject && (
                                    <a
                                        className="button-transfer-page button-next"
                                        href={handleClick(project.nextProject)}
                                    >
                                        N E X T
                                        <br />
                                        <div className="button-transfer-page-title">
                                            {project.nextProject.name}
                                        </div>
                                    </a>
                                )}
                                {!project.nextProject && (
                                    <button className="button-transfer-page button-next" disabled={true}></button>
                                )}
                            </div>
                        </Box>

                    </StyleBox>


                </>
            )}
            {!project && (<LoadingScreen />)}
        </>
    )
}