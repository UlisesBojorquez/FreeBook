import React, {useState, useEffect} from "react";
import { Grid, Button, makeStyles, Box, Tab, Tabs, Typography, Paper } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book.js'
import BookAD from './BookAD.js'
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

    const [status0, setStatus0] = useState([])
    const [status1, setStatus1] = useState([])
    const [status2, setStatus2] = useState([])
    
    const API_ENDPOINT_GET_BOOKS0 = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book?status=0'
    const API_ENDPOINT_GET_BOOKS1 = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book'
    const API_ENDPOINT_GET_BOOKS2 = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book?status=2'


    useEffect(() => {
        getBooks(0)
        getBooks(1)
        getBooks(2)
        
    }, []);


    const moveSalir = () =>{
        history.push({
            pathname:'/'
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getBooks = async (value) =>{
        switch (value) {
            case 0:
                const result = await Axios({
                    method: 'GET',
                    url: API_ENDPOINT_GET_BOOKS0
                })
                //console.log('Result: ', result.data)
                setStatus0(result.data)
            case 1:
                const result2 = await Axios({
                    method: 'GET',
                    url: API_ENDPOINT_GET_BOOKS1
                })
                //console.log('Result: ', result2.data)
                setStatus1(result2.data)
            case 2:
                const result3 = await Axios({
                    method: 'GET',
                    url: API_ENDPOINT_GET_BOOKS2
                })
                //console.log('Result: ', result3.data)
                setStatus2(result3.data)
        }
    }

    function selectSearchMode0() {
        
        return status0.map((book) =>(
            <Book title={book.title} isbn={book.isbn} year={book.year} editorial={book.editorial} link={book.url} categories={book.categories} authors={book.authors} categories={book.categories} id={book.id}/>         
        ))   
    }
    function selectSearchMode1() {
        
        return status1.map((book) =>(
            <BookAD title={book.title} isbn={book.isbn} year={book.year} editorial={book.editorial} link={book.url} categories={book.categories} authors={book.authors} categories={book.categories} id={book.id}/>                 
        ))   
    }
    function selectSearchMode2() {
        
        return status2.map((book) =>(
            <BookAD title={book.title} isbn={book.isbn} year={book.year} editorial={book.editorial} link={book.url} categories={book.categories} authors={book.authors} categories={book.categories} id={book.id}/>                  
        ))
    }



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
                    <Grid container direction='row' justifyContent='flex-start' alignItems="flex-start" spacing={2}>
                        {
                            selectSearchMode0()
                        } 
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems="flex-start" spacing={2}>
                        {
                            selectSearchMode1()
                        } 
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems="flex-start" spacing={2}>
                        {
                            selectSearchMode2()
                        } 
                    </Grid>
                </TabPanel>
            </Grid>

        </Grid> 
    );
}