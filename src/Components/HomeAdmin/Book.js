import React, {useState, useEffect} from "react";
import { Grid, Button, makeStyles, Paper } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
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

export default function Main(props) {
    const classes = useStyles();
    const [showItem, setShowItem] = useState(true)

    const acceptBook = () =>{
        setShowItem(false);
        //do further actions
    }

    const declineBook = () =>{
        setShowItem(false);
        //do further actions
    }



    return (
        <Grid item xs={12}>
            { showItem ?
            <Grid container direction='row' spacing={2}>
                <Grid item xs={10} >
                    <Paper elevation={3} className={classes.itemPaper}>
                        <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                            <Grid item xs={12}><p className={classes.title}> Titulo:  </p></Grid>
                            <Grid item xs={6}><p className={classes.text}> Año:  </p></Grid>
                            <Grid item xs={6}><p className={classes.text}> Editorial:  </p></Grid>
                            <Grid item xs={6}><p className={classes.text}> ISBN:  </p></Grid>
                            <Grid item xs={6}><p className={classes.text}> Categorías: </p></Grid>  
                            <Grid item xs={12}><p className={classes.title}> Documento:  </p></Grid>
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