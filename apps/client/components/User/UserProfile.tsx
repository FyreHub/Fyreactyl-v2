import React from 'react';
import { green, red } from '@mui/material/colors';
import { Edit, DeleteSharp, ArrowBack } from '@mui/icons-material';

import {
  Grid,
  Avatar,
  Card,
  CardContent,
  Badge,
  Chip,
  CardHeader,
  IconButton,
  Typography,
  Divider,
  Tooltip,
  Fab,
} from '@mui/material';
import * as classes from '../../lib/styles/styles';

import UploadImageForm from '../Forms/UploadImageForm';
import EditProfileForm from '../Forms/EditProfileForm';
import DeleteForm from '../Forms/DeleteForm';
import ConfirmEmailForm from '../Forms/ConfirmEmailForm';

function UserProfile(props) {
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      style={classes.container}
    >
      {props.backToUserList && (
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Tooltip title="Back to User List" aria-label="add">
            <Fab color="primary">
              <IconButton onClick={props.backToUserList}>
                <ArrowBack />
              </IconButton>
            </Fab>
          </Tooltip>
        </Grid>
      )}
      <Grid item xs={10} sm={8} md={4}>
        <Card>
          <div>
            <CardHeader
              style={{
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: '16px',
              }}
              color="primary"
              title="User Profile"
            />
            <Divider />
            <br />
            <div style={{ textAlign: 'center' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={(
                  <IconButton
                    style={{
                      width: '22',
                      height: '22',
                      backgroundColor: green[500],
                      color: '#fff',
                      border: '2px solid #FFF',
                    }}
                    onClick={props.toggleImageForm}
                  >
                    <Edit />
                  </IconButton>
                )}
              >
                <Avatar
                  style={{
                    borderRadius: '50%',
                    width: '150px',
                    height: '150px',
                  }}
                  src={
                    props.user.avatarUrl
                    || 'https://cdn4.iconfinder.com/data/icons/green-shopper/1068/user.png'
                  }
                  alt="User Profile Image"
                />
              </Badge>
            </div>
            <CardContent style={{ padding: '20px' }}>
              <Typography component="h5" variant="h5">
                {props.user.displayName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.user.email}
              </Typography>
              <br />
              <Divider />
              <p
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <span>
                  <Chip
                    style={{ marginTop: '5px', marginRight: '10px' }}
                    label={props.user.isAdmin ? 'Admin' : 'User'}
                    color="secondary"
                    variant="outlined"
                  />
                  <Chip
                    style={{ marginTop: '5px' }}
                    clickable
                    label={
                      props.user.emailActivated
                        ? 'Active Email'
                        : 'Activate Email Now'
                    }
                    color={props.user.emailActivated ? 'secondary' : 'primary'}
                    onClick={
                      !props.user.emailActivated && props.toggleConfirmEmailForm
                    }
                  />
                </span>
                <span>
                  <IconButton
                    style={{
                      display: 'inline-block',
                      color: green[500],
                    }}
                    onClick={props.toggleEditForm}
                  >
                    <Edit />
                  </IconButton>
                  {props.toggleDeleteForm && (
                    <IconButton
                      style={{
                        color: red[500],
                      }}
                      onClick={props.toggleDeleteForm}
                    >
                      <DeleteSharp />
                    </IconButton>
                  )}
                </span>
              </p>
              <p>
                <strong>First Name:</strong>
                {props.user.firstName}
              </p>
              <p>
                <strong>Last Name:</strong>
                {props.user.lastName}
              </p>
              <p>
                <strong>Joined at:</strong>
                {new Date(props.user.createdAt).toDateString()}
              </p>
              <EditProfileForm
                user={props.user}
                openEdit={props.openEditForm}
                handleClose={props.toggleEditForm}
                handleUpdate={props.handleUpdateProfile}
              />
              <UploadImageForm
                openImage={props.openImageForm}
                handleClose={props.toggleImageForm}
                uploadImage={props.handleUploadImage}
              />
              <DeleteForm
                openDelete={props.openDeleteForm}
                handleClose={props.toggleDeleteForm}
                handleDelete={props.handleDeleteProfile}
              />
              <ConfirmEmailForm
                openConfirm={props.openConfirmEmailForm}
                handleClose={props.toggleConfirmEmailForm}
                handleSendEmail={props.handleSendEmail}
              />
            </CardContent>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
