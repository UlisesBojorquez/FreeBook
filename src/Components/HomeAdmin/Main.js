import React, {useState, useEffect} from "react";
import { Grid, Button, makeStyles, Box, Tab, Tabs, Typography, Paper } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReceivedBooks from './ReceivedBooks.js'
import AcceptedBooks from './AcceptedBooks.js'
import DeniedBooks from './DeniedBooks.js'
import Axios from 'axios'


const useStyles = makeStyles((theme) => ({
    containerForm:{
        backgroundColor: '#E4E4E4'
    },
    textfield:{
        border: 'solid 2px black',
        borderRadius: 4,
        backgroundColor:'#F7F7F7',
        height:50,
        padding:8,
        width:'100%'
    },
    button:{
        backgroundColor:'black',
        width:'100%',
        height:50,
        color:'white',
        borderRadius:4,
        textAlign:'center',
        padding:8
    },
    buttonAccept:{
        backgroundColor:'green',
        width:'100%',
        height:'50%',
        color:'white',
        borderRadius:4,
        textAlign:'center',
        margin: '2px 0px 2px 0px'
    },
    buttonDecline:{
        backgroundColor:'red',
        width:'100%',
        height:'50%',
        color:'white',
        borderRadius:4,
        textAlign:'center',
        margin: '2px 0px 2px 0px'
    },
    containerTopBar:{
        padding: 20,
        backgroundColor:'#EAECEE'
    },
    textName:{
        textAlign: 'left',
        margin:0,
        color:'black',
        fontSize:'6vmin'
    },
    title:{
        margin:0,
        textAlign:'left'
    },
    text:{
        margin:0,
        textAlign:'left'
    },
    itemPaper:{
        padding:10
    }

}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Main(props) {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [value, setValue] = useState(0);

    useEffect(() => {
        
    }, []);


    const moveSalir = () =>{
        history.push({
            pathname:'/'
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Grid>
            <Grid container direction='row' justifyContent='flex-end' alignItems="center" spacing={2} className={classes.containerTopBar}>
                <Grid item xs={8}>
                    <h1 className={classes.textName}>FreeBook</h1> 
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={2}>
                   <Button className={classes.button} onClick={moveSalir}>Salir</Button> 
                </Grid>
            </Grid>
            <Grid style={{marginTop:8}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Llegada" {...a11yProps(0)} />
                    <Tab label="Aceptados" {...a11yProps(1)} />
                    <Tab label="Cancelados" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <ReceivedBooks/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AcceptedBooks/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DeniedBooks/>
                </TabPanel>
            </Grid>

        </Grid> 
    );
}