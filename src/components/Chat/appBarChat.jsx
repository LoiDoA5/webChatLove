import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));





export default function ButtonAppBarChat() {
  const classes = useStyles();
  const history = useHistory();

  const login = () => {
     
    history.push("/list-room"); 

  }
  

  return (
 
    <div  className={classes.root} >
       
      <AppBar position="static"  style={{background:'#FF1493'}}>
        <Toolbar>
        
          <Typography variant="h6" className={classes.title}>
         
          </Typography>
          <Button color="inherit"  onClick= {login}
          
                    
                    >   TRỞ LẠI </Button>
        </Toolbar>
      </AppBar>
 
    </div>
  );
}