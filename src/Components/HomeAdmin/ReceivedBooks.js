import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import Book from './Book.js'
import Axios from 'axios'

export default function ReceivedBooks() {
    const [status0, setStatus0] = useState([])
    const API_ENDPOINT_GET_BOOKS0 = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book?status=0'

    useEffect(() => {
        getBooks()
    }, []);

    const getBooks = async () =>{
        const result = await Axios({
            method: 'GET',
            url: API_ENDPOINT_GET_BOOKS0
        })
        setStatus0(result.data)     
    }

    function selectSearchMode0() {
        return status0.map((book) =>(
            <Book title={book.title} isbn={book.isbn} year={book.year} editorial={book.editorial} link={book.url} categories={book.categories} authors={book.authors} categories={book.categories} id={book.id}/>         
        ))   
    }

    return (
        <Grid container direction='row' justifyContent='flex-start' alignItems="flex-start" spacing={2}>
            {
                selectSearchMode0()
            } 
        </Grid>
    );
}