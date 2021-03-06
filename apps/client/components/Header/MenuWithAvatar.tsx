import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {
  MenuItem, Menu, IconButton, Avatar,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import authApi from '../../lib/api/authApi';
import { notify } from '../Notifier';

export default class MenuWithAvatar extends React.Component<
{
  isAdmin: boolean;
  options: any;
  src: any;
  alt: any;
},
{
  anchorEl: any;
  shouldRedirect: boolean;
}
> {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      shouldRedirect: false,
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = async () => {
    const resp = await authApi.logout();
    if (resp.success) {
      this.setState({
        anchorEl: null,
        shouldRedirect: true,
      });
      notify({ message: resp.message });
    }
  };

  render() {
    if (this.state.shouldRedirect) Router.push('/');
    return (
      <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          {this.props.src ? (
            <Avatar src={this.props.src} alt={this.props.alt} />
          ) : (
            <Avatar>
              <Person />
            </Avatar>
          )}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.isAdmin && (
            <Link href="/admin/">
              <MenuItem>Admin Dashboard</MenuItem>
            </Link>
          )}
          {this.props.options.map((option, id) => {
            if (option.href === '/logout') {
              return (
                <MenuItem key={id} onClick={this.handleLogout}>
                  {option.text}
                </MenuItem>
              );
            }
            return (
              <Link href={option.href}>
                <MenuItem key={id}>{option.text}</MenuItem>
              </Link>
            );
          })}
        </Menu>
      </div>
    );
  }
}
