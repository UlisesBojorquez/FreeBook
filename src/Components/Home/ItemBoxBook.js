import React, { useState, useEffect } from "react";
import { makeStyles, Paper, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    
    containerCategories:{
        padding: 20,
    },
    title:{
        margin:0,
        color:'black',
        fontSize:'4vmin'
    },
    imgPortada: {
        width:'100%', 
        objectFit: 'cover' 
    },
    text:{
        margin:0,
        color:'black',
        fontSize:'2vmin'
    }
}));
export default function ItemBoxBook0(props) {
    const classes = useStyles()

    const [title] = useState(props.title)
    const [isbn] = useState(props.isbn)
    const [year] = useState(props.year)
    const [editorial] = useState(props.editorial)
    const [link] = useState(props.link)
    const [categories, setCategories] = useState('')
    const [authors, setAuthors] = useState('')
    const [cover] = useState(props.image)

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

    function bookManager(event, id){
        window.open(link)
    }

    return (
        <Grid item xs={6} onClick={(e) => bookManager(e, title)}>
            <Paper elevation={3} >
                <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={2} className={classes.containerCategories}>
                    <Grid item xs={2} style={{margin:0, padding:0}}>
                        <img src={cover} alt='image' className={classes.imgPortada}></img>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container direction='column' justifyContent='flex-start' alignItems='flex-start'>
                            <Grid item xs={12}><p className={classes.title}> {title} </p></Grid>
                            <Grid item xs={12}><p className={classes.text}> Autores: {authors} </p></Grid>
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