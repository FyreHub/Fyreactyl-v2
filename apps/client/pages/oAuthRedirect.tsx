import React from 'react';
import Head from 'next/head';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Router from 'next/router';
import LoadingBar from '../components/LoadingBar';
import * as classes from '../lib/styles/styles';
import auth from '../lib/api/authApi';

class OAuthRedirect extends React.Component<
Record<string, never>,
{
  shouldRedirect: boolean;
}
> {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (document.cookie) {
        const cookie = document.cookie.split('=');
        if (cookie[0] === 'nest-cookie') {
          auth.authenticate(cookie[1], () => {
            this.setState({ shouldRedirect: true });
          });
        }
      }
    }, 5000);
  }

  render() {
    if (this.state.shouldRedirect) Router.push('/');
    return (
      <div>
        <Head>
          <title> OAuth Redirect</title>
          <meta name="description" content="This is the OAuth Redirect page" />
        </Head>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={classes.container}
        >
          <Grid item xs={10} sm={8} md={4}>
            <Card variant="outlined" style={classes.card}>
              <CardContent>
                <Typography color="secondary" align="center" variant="h5">
                  Logged in Successfully!
                </Typography>
                <Typography align="center" variant="h6">
                  Please check your email to activate your account
                </Typography>
                <Typography align="center" variant="h6">
                  Redirecting to Homepage...
                </Typography>
                <br />
                <br />
                <LoadingBar />
                <br />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default OAuthRedirect;
