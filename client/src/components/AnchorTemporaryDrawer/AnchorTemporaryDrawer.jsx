import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import './AnchorTemporaryDrawer.css'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';



export default function AnchorTemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const menuLists = [  
        {
            name: "Menu",
            path: "#explore-menu",
            icon: <WidgetsIcon />
        }, {
            name: "My orders",
            path: "/myorders",
            icon: <WidgetsIcon />
        },
        {
            name: "Mobile App",
            path: "#app-download",
            icon: <MobileFriendlyIcon />
        },
        {
            name: "Contact us",
            path: "#footer",
            icon: <ConnectWithoutContactIcon />
        },
    ]
    const homeList = [{
        name: "Home",
        path: "/",
        icon: <HomeIcon />
    }]
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {homeList.map((text, idx) => (
                    <ListItem key={idx} disablePadding>
                        <ListItemButton>
                            <div onClick={()=> navigate(text.path)} className='drawer-path' >
                                <ListItemIcon>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </div>
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>
            <Divider />
            <List>
                {menuLists.map((text, idx) => (
                    <ListItem key={idx} disablePadding>
                        <ListItemButton>
                            <Link className='drawer-path' to={text.path}>
                                <ListItemIcon>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>

        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}><RestaurantMenuIcon className='hamburger-toggle' onClick={toggleDrawer(anchor, true)} />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
