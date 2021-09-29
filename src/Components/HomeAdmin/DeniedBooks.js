import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import BookAD from './BookAD.js'
import Axios from 'axios'

export default function DeniedBooks() {
    const { enqueueSnackbar } = useSnackbar();
    const [status2, setStatus2] = useState([])
    const API_ENDPOINT_GET_BOOKS2 = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book?status=2'

    useEffect(() => {
        getBooks()
    }, []);

    const getBooks = async () =>{
        const result3 = await Axios({
            method: 'GET',
            url: API_ENDPOINT_GET_BOOKS2
        })
        //console.log('Result: ', result3.data)
        setStatus2(result3.data)
    }

    function selectSearchMode2() {
        return status2.map((book) =>(
            <BookAD title={book.title} isbn={book.isbn} year={book.year} editorial={book.editorial} link={book.url} categories={book.categories} authors={book.authors} categories={book.categories} id={book.id}/>                  
        ))
    }

    return (
        <Grid container direction='row' justifyContent='flex-start' alignItems="flex-start" spacing={2}>
            {
                selectSearchMode2()
            } 
        </Grid>     
    );
}