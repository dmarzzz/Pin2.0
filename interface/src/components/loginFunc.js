import React, {useState} from 'react';
import { Card, withStyles,makeStyles , Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import useAxios from 'axios-hooks';
import axios from 'axios';




const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(6),
    },
    card: {
      padding: theme.spacing(4),
      marginTop:"100px",
      marginLeft : "20%",
      marginRight : "20%",
      //background: '#ffffff',
    }
}));



function LoginFunc(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  function submitLogin(){
    console.log('Username : ' + username);
    console.log('Password : ' + password);

    axios.post('http://localhost:8080/loginCredentials?username=' + username + '&password='+password)
    .then(res => {
      console.log(res.data);
    })

  }


  return(

    <Card className = {classes.card} >
        <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <Face />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                    <TextField  label="Username"   type="username"  onChange={ e => setUsername(e.target.value) } fullWidth autoFocus required />
                </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <Fingerprint />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                    <TextField  label="Password"  type="password" color="primary" onChange={ e => setPassword(e.target.value) } fullWidth required />
                </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
                <Grid item>
                    <FormControlLabel control={
                        <Checkbox
                            color="secondary"
                        />
                    } label="Remember me" />
                </Grid>
                <Grid item>
                    <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
                <Button variant="outlined" color="primary" onClick={submitLogin} style={{ textTransform: "none" }}>Login</Button>
            </Grid>
        </div>
    </Card>
  )


}

export default LoginFunc;
