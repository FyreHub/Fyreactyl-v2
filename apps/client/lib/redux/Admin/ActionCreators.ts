import * as ActionTypes from './ActionTypes';
import adminApi from '../../api/adminApi';

const loadUsersRequest = () => ({
  type: ActionTypes.LOAD_USERS_REQUEST,
});

const loadUsersSuccess = (resp) => ({
  type: ActionTypes.LOAD_USERS_SUCCESS,
  users: resp.response.users,
});

const loadUsersFailure = (err) => ({
  type: ActionTypes.LOAD_USERS_FAILURE,
  error: true,
  message: err.message || err.response.message,
});
const loadProfileRequest = () => ({
  type: ActionTypes.LOAD_PROFILE_REQUEST,
});

const loadProfileSuccess = (resp) => ({
  type: ActionTypes.LOAD_PROFILE_SUCCESS,
  user: resp.response.user,
});

const loadProfileFailure = (err) => ({
  type: ActionTypes.LOAD_PROFILE_FAILURE,
  error: true,
  message: err.message || err.response.message,
});

const updateProfileRequest = () => ({
  type: ActionTypes.UPDATE_PROFILE_REQUEST,
});

const updateProfileSuccess = (resp) => ({
  type: ActionTypes.UPDATE_PROFILE_SUCCESS,
  message: resp.message || resp.response.message,
});

const updateProfileFailure = (err) => ({
  type: ActionTypes.UPDATE_PROFILE_FAILURE,
  error: true,
  message: err.message || err.response.message,
});

const deleteProfileRequest = () => ({
  type: ActionTypes.DELETE_PROFILE_REQUEST,
});

const deleteProfileSuccess = (resp) => ({
  type: ActionTypes.DELETE_PROFILE_SUCCESS,
  message: resp.message || resp.response.message,
});

const deleteProfileFailure = (err) => ({
  type: ActionTypes.DELETE_PROFILE_FAILURE,
  error: true,
  message: err.message || err.response.message,
});
const uploadImageRequest = () => ({
  type: ActionTypes.UPLOAD_IMAGE_REQUEST,
});

const uploadImageSuccess = (resp) => ({
  type: ActionTypes.UPLOAD_IMAGE_SUCCESS,
  message: resp.message || resp.response.message,
});

const uploadImageFailure = (err) => ({
  type: ActionTypes.UPLOAD_IMAGE_FAILURE,
  error: true,
  message: err.message || err.response.message,
});

export const loadUsers = () => (dispatch) => {
  dispatch(loadUsersRequest());
  adminApi
    .fetchUsers()
    .then((resp) => {
      if (resp.success) dispatch(loadUsersSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(loadUsersFailure(err)));
};

export const loadProfile = (userId) => (dispatch) => {
  dispatch(loadProfileRequest());
  adminApi
    .fetchUser(userId)
    .then((resp) => {
      if (resp.success) dispatch(loadProfileSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(loadProfileFailure(err)));
};

export const updateProfile = (profile, userId) => (dispatch) => {
  dispatch(updateProfileRequest());
  adminApi
    .updateUser(profile, userId)
    .then((resp) => {
      if (resp.success) dispatch(updateProfileSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(updateProfileFailure(err)));
};

export const deleteProfile = (userId) => (dispatch) => {
  dispatch(deleteProfileRequest());
  adminApi
    .deleteUser(userId)
    .then((resp) => {
      if (resp.success) dispatch(deleteProfileSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(deleteProfileFailure(err)));
};

export const uploadImage = (file, userId) => (dispatch) => {
  dispatch(uploadImageRequest());
  adminApi
    .uploadProfileImage(file, userId)
    .then((resp) => {
      if (resp.success) dispatch(uploadImageSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(uploadImageFailure(err)));
};
