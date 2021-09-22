import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, Button, makeStyles, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Category from './Category.js';
import ItemBoxBook from './ItemBoxBook.js';
import UploadBook from './UploadBook.js';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    containerForm:{
        backgroundColor: '#E4E4E4'
    },
    imgLogin: {
        width:'100%', 
        height: '100vh', 
        objectFit: 'cover' 
    },
    textfield:{
        border: 'solid 2px black',
        borderRadius: 4,
        backgroundColor:'#F7F7F7',
        height:50,
        padding:8,
        width:'100%'
    },
    textfieldError:{
        border: 'solid 2px red',
        borderRadius: 0,
        backgroundColor:'#F7F7F7',
        padding: 10,
        width:300
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
    link:{
        color:'red'
    },
    helper:{
        color:'red'
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

export default function Home(props) {
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

    const moveLogin = () =>{
        history.push({
            pathname:'/Login'
        })
    }

    const moveRegister = () =>{
        history.push({
            pathname:'/Register'
        })
    }

    const searchManager = () => {
        if(search === ''){
            setResultSearch(false);
        }else{
            setResultSearch(true);
        }
        setValue(1);
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
                   <Button className={classes.button} onClick={moveLogin}>Iniciar Sesión</Button> 
                </Grid>
                <Grid item xs={2}>
                   <Button className={classes.button} onClick={moveRegister}>Registro</Button> 
                </Grid>
            </Grid>
            <Grid style={{marginTop:8}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="Libros" {...a11yProps(1)} />
                    <Tab label="Subir" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Category category={selectCategory}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {
                        resultSearch ?
                        <ItemBoxBook title='hola' isbn='isbn' year='2001' editorial='editorial patitio' link='https://arxiv.org/pdf/1807.08957.pdf' categories='lista de categorias'/>
                        :
                        <p>No se encuentran resultados</p>
                    }
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <UploadBook/>
                </TabPanel>
            </Grid>

        </Grid> 
    );
}