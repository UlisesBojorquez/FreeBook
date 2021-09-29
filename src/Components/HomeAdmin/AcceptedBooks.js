import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import BookAD from './BookAD.js'
import Axios from 'axios'

export default function AcceptedBooks() {
    const { enqueueSnackbar } = useSnackbar();
    const [status1, setStatus1] = useState([])
    const API_ENDPOINT_GET_BOOKS1 = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book'

    useEffect(() => {
        getBooks()
    }, []);

    const getBooks = async () =>{
        const result2 = await Axios({
            method: 'GET',
            url: API_ENDPOINT_GET_BOOKS1
        })
        //console.log('Result: ', result2.data)
        setStatus1(result2.data)    
    }

    function selectSearchMode1() {
        return status1.map((book) =>(
            <BookAD title={book.title} isbn={book.isbn} year={book.year} editorial={book.editorial} link={book.url} categories={book.categories} authors={book.authors} categories={book.categories} id={book.id}/>                 
        ))   
    }

    return (
        <Grid container direction='row' justifyContent='flex-start' alignItems="flex-start" spacing={2}>
            {
                selectSearchMode1()
            } 
        </Grid>          
    );
}