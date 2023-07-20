import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AppBar, Grid, Box, Toolbar, Button, Typography, IconButton, Avatar } from '@mui/material';
import {
  LogoutOutlined,
  Work,
  // SchoolIcon
} from '@mui/icons-material';

import { getUserName, getUserRole, getFullName, getIsLoggedIn } from '../../services/userInfoService';
import './MenuBar.scss';
import { indigo } from '@mui/material/colors';
import Logo from '../../assets/HeaderLogo.png';

type Props = {
  intl: any;
  title: string;
  noBtn: boolean;
};

const MenuBar = ({ intl, title, noBtn }: Props) => {
  const isLoggedIn = false;
  const userRole = getUserRole();

  const MENU_ITEMS = {
    Student: [
      {
        id: 'dashboard',
        link: 'student/home'
      }
    ],
    Patient: [
      {
        id: 'dashboard',
        link: '/patient/home'
      }
    ],
    Counsellor: [
      {
        id: 'dashboard',
        link: '/counsellor/home'
      },
      {
        id: 'myAppointments',
        link: '/counsellor/appointments'
      }
    ],
    Doctor: [
      {
        id: 'dashboard',
        link: '/doctor/home'
      },
      {
        id: 'myAppointments',
        link: '/doctor/appointments'
      }
    ],
    Manager: [
      {
        id: 'dashboard',
        link: '/manager/home'
      },
      { id: 'manageUsers', link: '/manager/users' },
      { id: 'viewReports', link: '/manager/reports' }
    ]
  };

  const doLogout = () => {
    localStorage.clear();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="sticky">
        <Toolbar className="menu-bar-container">
          <Grid container alignItems="center">
            {isLoggedIn &&
              userRole &&
              (MENU_ITEMS as any)[userRole].map((nav: any) => (
                <Typography className="menu-bar-link" component={Link} to={nav.link}>
                  {intl.formatMessage({ id: `navigation.${nav.id}` })}
                </Typography>
              ))}
          </Grid>
          <img src={Logo} alt="Logo" height="70" style={{ margin: '10px' }} />
          {/* <Typography className="menu-bar-title">{title}</Typography> */}
          <Grid container>
            {isLoggedIn && (
              <Grid container className="userProfile-container end-container">
                <Avatar sx={{ bgcolor: indigo[100], width: '30px', height: '30px' }}>
                  {userRole === 'Student' && <Work color="primary" />}
                  {userRole === 'Employer' && <Work color="primary" />}
                </Avatar>
                <Typography>{getFullName()}</Typography>
                <IconButton color="secondary" component={Link} to={'/'} onClick={doLogout}>
                  <LogoutOutlined />
                </IconButton>
              </Grid>
            )}
            {!isLoggedIn && !noBtn && (
              <Grid container className="end-container">
                <Button variant="outlined" color="secondary" component={Link} to={'/login'}>
                  {intl.formatMessage({
                    id: 'authForm.button.submit'
                  })}
                </Button>
                <Button variant="outlined" color="secondary" component={Link} to={'/register'}>
                  {intl.formatMessage({
                    id: 'authForm.button.signup'
                  })}
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectIntl(MenuBar);
