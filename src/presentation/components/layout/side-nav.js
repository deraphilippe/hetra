import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography
} from '@mui/material';
import { items } from './config';
import { SideNavItem } from './side-nav-item';


const SideNav = (props) => {
  const { open, onClose } = props;
  const navigate = useNavigate()
  const location = useLocation();
  const [lgUp, setLgUp] = useState(window.matchMedia('(min-width: 1280px)').matches);

  useEffect(() => {
    const handleResize = () => {
      setLgUp(window.matchMedia('(min-width: 1280px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const content = (
  
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'flex-start',
              mt: 2,
              p: '12px'
            }}
          >
            <Link to="/" style={{ display: 'flex', height: 50, width: 50, marginRight: 10 }}>
              <img src="/images/logo.png" />
            </Link>
            <div>
              <Typography color="inherit" variant="h6">
                Geohetra
              </Typography>
            </div>
          </Box>
        </Box>
        <Divider />
        <Box
          component="nav"
          sx={{
            listStyle: "none",
            px: 3
          }}
        >
          {items.map((item) => {
            const active = item.path ? (location.pathname === item.path) : false;
            return (
              <SideNavItem
                active={active}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Voulez-vous voir les constructions sur une carte ?
          </Typography>
          <Button
            component="a"
            fullWidth
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
            color='success'
            onClick={() => {
              navigate("/admin/map")
            }}
          >
            Carte
          </Button>
        </Box>
      </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#2B5028',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#457740',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default SideNav;
