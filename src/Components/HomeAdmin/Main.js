import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, Button, makeStyles, Box, Tab, Tabs, Typography, Paper } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Book from './Book.js'

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

    const [search,setSearch] = useState('');
    const [searchHelper,setSearchHelper] = useState('');
    const [flagSearch,setFlagSearch] = useState(true);

    const [value, setValue] = useState(0);

    const [resultSearch,setResultSearch] = useState(false);

    /*const location = useLocation();
    useEffect(() => {
        if(location.state == null){
            console.log('No hay usuario loggeado')
        }else{
            const myparam = location.state.params;
            console.log(myparam);
        }
        
    }, [location]);*/

    const changeManager = (event) => {
        const currentValue=event.target.value;
        if(event.target.id==='search'){
            const re=/^[a-zA-z0-9@_.]{0,20}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setSearch(currentValue.trimStart());
                setFlagSearch(true);
            }
        }
    }

    function validateInputs(){
        var flag=true;
        if(search===''){
            setFlagSearch(false);
            setSearchHelper('Ingrese un search');
            flag=false;
        }else{
            
            setFlagSearch(true);
        }
    }


    const moveSalir = () =>{
        history.push({
            pathname:'/'
        })
    }

    const searchManager = () => {
        if(search === ''){
            setResultSearch(false);
        }else{
            setResultSearch(true);
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [categorySelected, setCategorySelected] = useState('')

    function selectCategory(category){
        setValue(1);
        console.log("esta es la cateogria seleccionada "+category)
    }

    return (
        <Grid>
            <Grid container direction='row' justifyContent='flex-end' alignItems="center" spacing={2} className={classes.containerTopBar}>
                <Grid item xs={4}>
                    <h1 className={classes.textName}>FreeBook</h1> 
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        id='search' 
                        margin='normal'
                        autoComplete='off' 
                        placeholder='Buscar un libro' 
                        style={{width:'100%', margin:0, padding:0}}
                        InputProps={{
                            disableUnderline: true,
                            classes:{
                                root: flagSearch ? classes.textfield : classes.textfieldError,
                            },
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={searchManager}>
                                        <SearchIcon />
                                    </IconButton> 
                                </InputAdornment>
                            ),
                        }}
                        value={search}
                        onChange={changeManager}
                        /> 
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
                    <Grid container direction='row' justifyContent='flex-start' alignItems="flex-start" spacing={2}>

                        <Book/>  
                        
                        
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    
                </TabPanel>
                <TabPanel value={value} index={2}>

                </TabPanel>
            </Grid>

        </Grid> 
    );
}