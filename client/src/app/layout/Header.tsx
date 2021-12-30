import { AppBar, createTheme, Switch, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

interface Props{
    darkMode: boolean;
    handleThemeChange: () => void;
}
export default function Header({darkMode, handleThemeChange}: Props) {

    return (
        <AppBar position='static' sx={{mb:4}}>
            <Toolbar>
                <Typography variant='h6'>
                    RE-STORE
                </Typography>
                <Switch color="default" checked={darkMode} onChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    )
}