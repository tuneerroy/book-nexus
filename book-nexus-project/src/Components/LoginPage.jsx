import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';


const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = () => submitCredentials('login');
  const handleRegister = () => submitCredentials('register');

  const submitCredentials = path => {
    setError('')
    if (!email || !password) return;
    fetch(`/api/auth/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password
      })
    })
      .then(res => {
        switch (res.status) {
          case 200:
            window.location.href = '/home'
          case 400:
            return res.json()
          default:
            return { message: 'Something went wrong. Please try again.'}
        }
      })
      .then(data => setError(data.message))
      .catch(err => {
        console.error(err);
      })
  }

  const handleGoogleLogin = () => window.location.href = '/api/auth/google'
  const handleFacebookLogin = () => window.location.href = '/api/auth/facebook'
  
  return (
    <>
      <Typography variant="h3" component="h1" style={{ marginBottom: '1rem', fontWeight: 600 }}>
        Book Nexus
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Container maxWidth="xs">
        <div style={{marginTop: 20}}>
          <form>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              onClick={handleRegister}
            >
              Register
            </Button>
            <Typography variant="caption">
              Or sign in with
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="info"
                  startIcon={<FacebookIcon />}
                  onClick={handleFacebookLogin}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default LoginPage;