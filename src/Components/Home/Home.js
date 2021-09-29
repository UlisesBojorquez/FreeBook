import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, Button, makeStyles, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Category from './Category.js';
import UploadBook from './UploadBook.js';
import PropTypes from 'prop-types';
import Axios from 'axios'
import ItemBoxBook from "./ItemBoxBook.js";

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
    },
    containerCategories:{
        padding: 20,
    },
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
    const [searchMode, setSearchMode] = useState(0) //0 all, 1 search for a input, 2 search from a category
    const [searchResponse, setSearchResponse] = useState([])

    const API_ENDPOINT_GET_BOOKS = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book'
    const API_ENDPOINT_GET_BOOKS_PER_CATEGORY = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book?category='


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
            const re=/^[a-zA-z0-9@_.]{0,50}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setSearch(currentValue.trimStart());
                setFlagSearch(true);
            }
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

    const searchManager = async () => {
        if(search === ''){
            setResultSearch(false);
            const result = await Axios({
                method: 'GET',
                url: API_ENDPOINT_GET_BOOKS
            })
            console.log('Result: ', result.data)
            setSearchResponse(result.data)
            setSearchMode(0)
        }else{
            setSearchMode(3)
        }
        
        setValue(1);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const categoryManager = async (category) =>{
        const result = await Axios({
            method: 'GET',
            url: API_ENDPOINT_GET_BOOKS_PER_CATEGORY+category
        })
        console.log('Result: ', result.data)
        setSearchResponse(result.data)
    }
    
    function selectCategory(category){
        categoryManager(category)
        setSearchMode(1)
        setValue(1);
        console.log("esta es la cateogria seleccionada "+category)
    }

    function selectSearchMode(){
        switch (searchMode) {
            case 0:
                return searchResponse.map((book) =>(
                    <ItemBoxBook title={book.title} isbn={book.isbn} year={book.year} editorial={book.editorial} link={book.url} categories={book.categories} authors={book.authors} categories={book.categories} image={book.coverurl}/>
                ))
            case 1:
                return searchResponse.map((book) =>(
                    <ItemBoxBook title={book.title} isbn={book.isbn} year={book.year} editorial={book.editorial} link={book.url} categories={book.categories} authors={book.authors} categories={book.categories} image={book.coverurl}/>
                ))
            case 3:
                return <p>No se encuentran resultados</p>
        }
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
                    <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={4} className={classes.containerCategories}>
                        {
                            selectSearchMode()
                        }
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <UploadBook/>
                </TabPanel>
            </Grid>

        </Grid> 
    );
}
