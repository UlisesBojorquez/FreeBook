import React, {useState, useEffect} from "react";
import { Grid, makeStyles, Paper, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    
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

export default function BookAD(props) {
    const classes = useStyles();

    const [id] = useState(props.id)
    const [title] = useState(props.title)
    const [isbn] = useState(props.isbn)
    const [year] = useState(props.year)
    const [editorial] = useState(props.editorial)
    const [link] = useState(props.link)
    const [categories, setCategories] = useState('')
    const [authors, setAuthors] = useState('')

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

    const openDocument = () =>{
        window.open(link)
    }

    return (
        <Grid item xs={12}>
            <Grid container direction='row' spacing={2}>
                <Grid item xs={12} >
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
            </Grid>
        </Grid> 
    );
}