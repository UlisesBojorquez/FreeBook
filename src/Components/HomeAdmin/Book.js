import React, {useState, useEffect} from "react";
import { Grid, Button, makeStyles, Paper, Link } from "@material-ui/core";
import Axios from 'axios'

const useStyles = makeStyles((theme) => ({
    buttonAccept:{
        backgroundColor:'#5D6D7E',
        width:'100%',
        height:'50%',
        color:'#FFFFFF',
        borderRadius:4,
        textAlign:'center',
        margin: '2px 0px 2px 0px'
    },
    buttonDecline:{
        backgroundColor:'#AEB6BF',
        width:'100%',
        height:'50%',
        color:'#FFFFFF',
        borderRadius:4,
        textAlign:'center',
        margin: '2px 0px 2px 0px'
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

export default function Book(props) {
    const classes = useStyles();
    const [showItem, setShowItem] = useState(true)

    const [id] = useState(props.id)
    const [title] = useState(props.title)
    const [isbn] = useState(props.isbn)
    const [year] = useState(props.year)
    const [editorial] = useState(props.editorial)
    const [link] = useState(props.link)
    const [categories, setCategories] = useState('')
    const [authors, setAuthors] = useState('')

    const API_ENDPOINT_CHANGE_STATE_BOOK = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book'

    useEffect(() => {
        var textAuthors = ""
        for (let index = 0; index < props.authors.length; index++) {
            const element = props.authors[index];
            textAuthors += element+","
            
        }
        setAuthors(textAuthors)

        var textCategories=""
        for (let index = 0; index < props.categories.length; index++) {
            const element = props.categories[index];
            textCategories+= element+","
            
        }
        setCategories(textCategories)
    }, []);

    const acceptBook = async() =>{
        setShowItem(false);
        //do further actions
        const bodyStr={
            "status": 1
        }
        Axios.put(API_ENDPOINT_CHANGE_STATE_BOOK+"?id="+id, bodyStr)
    }

    const declineBook = () =>{
        setShowItem(false);
        //do further actions
        const bodyStr={
            "status": 2
        }
        Axios.put(API_ENDPOINT_CHANGE_STATE_BOOK+"?id="+id, bodyStr)

    }

    const openDocument = () =>{
        window.open(link)
    }

    return (
        <Grid item xs={12}>
            { showItem ?
            <Grid container direction='row' spacing={2}>
                <Grid item xs={10} >
                    <Paper elevation={3} className={classes.itemPaper}>
                        <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                            <Grid item xs={12}><p className={classes.title}> <b>Titulo:</b> {title} </p></Grid>
                            <Grid item xs={6}><p className={classes.text}> <b>Año:</b> {year} </p></Grid>
                            <Grid item xs={6}><p className={classes.text}> <b>Editorial:</b> {editorial} </p></Grid>
                            <Grid item xs={6}><p className={classes.text}> <b>ISBN:</b> {isbn} </p></Grid>
                            <Grid item xs={6}><p className={classes.text}> <b>Autores:</b> {authors} </p></Grid>  
                            <Grid item xs={6}><p className={classes.text}> <b>Categorías:</b> {categories} </p></Grid>  
                            <Grid item xs={12}><p className={classes.title}> <b>Documento:</b> <Link component="button" variant="body2" underline="hover" onClick={openDocument}>{link}</Link></p></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Button className={classes.buttonAccept} onClick={acceptBook}>Aceptar</Button> 
                    <Button className={classes.buttonDecline} onClick={declineBook}>Rechazar</Button> 
                </Grid>
            </Grid>
            :
            <Grid></Grid> 
            }
        </Grid>
    );
}