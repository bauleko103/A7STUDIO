import { Box } from "@mui/system";
import React from "react";
import SlideMenu from "./slide/SlideMenu";

import { FooterW } from "../Layouts/FooterW";
export default function HomeSlide() {
    return (
        <>
            <Box>
                <SlideMenu />
                <FooterW />
            </Box>
        </>
    )
};
