import React, { useState } from "react";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import PortadaLibro from '../../Images/PortadaLibro.jpg'

const useStyles = makeStyles((theme) => ({
    
    containerCategories:{
        padding: 20,
    },
    title:{
        margin:0,
        color:'black',
        fontSize:'5vmin'
    },
    imgPortada: {
        width:'100%', 
        objectFit: 'cover' 
    },
    text:{
        margin:0,
        color:'black',
        fontSize:'2.5vmin'
    }
}));

export default function ItemBoxBook(props) {
    const classes = useStyles()

    const [title] = useState(props.title)
    const [isbn] = useState(props.isbn)
    const [year] = useState(props.year)
    const [editorial] = useState(props.editorial)
    const [link] = useState(props.link)
    const [categories] = useState(props.categories)

    function bookManager(event, id){
        console.log(id)
        window.open(link)
    }

    return (
        <Grid item xs={6} onClick={(e) => bookManager(e, title)}>
            <Paper elevation={3} >
                <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={2} className={classes.containerCategories}>
                    <Grid item xs={2} style={{margin:0, padding:0}}>
                        <img src={PortadaLibro} className={classes.imgPortada}></img>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container direction='column' justifyContent='flex-start' alignItems='flex-start'>
                            <Grid item xs={12}><p className={classes.title}> {title} </p></Grid>
                            <Grid item xs={12}><p className={classes.text}> Año: {year} </p></Grid>
                            <Grid item xs={12}><p className={classes.text}> Editorial: {editorial} </p></Grid>
                            <Grid item xs={12}><p className={classes.text}> ISBN: {isbn} </p></Grid>
                            <Grid item xs={12}><p className={classes.text}> Categorías: {categories} </p></Grid>                          
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}