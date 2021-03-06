import {
  Button, Toolbar, Grid,
  Avatar,
} from '@mui/material';
import Link from 'next/link';
import MenuWithAvatar from './MenuWithAvatar';
import { styledToolbar } from '../../lib/styles/styles';
import { config } from '../../lib/config';

const optionsMenu = [
  {
    text: 'My Account',
    href: '/dashboard/profile',
  },
  {
    text: 'Log out',
    href: '/logout',
  },
  {
    text: 'Dashboard',
    href: '/dashboard',
  },
];

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styledToolbar}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item sm={11} xs={9} style={{ textAlign: 'left' }}>
            <Link href="/">
              <Avatar alt="Fyre Software" src={`${config.server_url}/images/logo.png`} />
            </Link>
          </Grid>
          <Grid item sm={1} xs={3} style={{ textAlign: 'right' }}>
            {user ? (
              <div style={{ whiteSpace: 'nowrap' }}>
                <MenuWithAvatar
                  options={optionsMenu}
                  src={user.avatarUrl}
                  alt={user.displayName}
                  isAdmin={user.isAdmin}
                />
              </div>
            ) : (
              <div>
                <Button variant="contained" color="primary" href="/signup">
                  Sign up
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

export default Header;
