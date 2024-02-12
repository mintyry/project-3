import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MY_LIBRARY } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { REMOVE_BOOK } from '../../utils/mutations';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import './SavedBooks.css';
import CircularProgress from '@mui/material/CircularProgress';

const SavedBooks = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_MY_LIBRARY);
    const myBooks = data?.myLibrary.keptBooks;

    const myData = data?.myLibrary;
    // fields are: username, email, role, keptBooks.title


    const [removeBook] = useMutation(REMOVE_BOOK);

    const handleRemove = async (bookId) => {
        try {
            await removeBook({
                variables: {
                    bookId: bookId,
                },
            });

            // Refetch data after removing the book
            const { data: refetchedData } = await refetch();

            // You can update the state or perform any other actions with the refetched data if needed
            // For example, if you're using state:
            // setMyBooks(refetchedData?.myLibrary.keptBooks);
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return
    (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="success" />
        </div>
    );
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Grid container>
            {/* header greeting */}
            <Grid item className="slide-from-left" mb={3} p={3} sx={{ width: '100%', fontSize: '1.8rem', color: '#f3f3ec' }}>
                <em className="saved-head-text">Welcome to your MyLibrary, {myData.username.charAt(0).toUpperCase() + myData.username.slice(1)}... </em>
            </Grid>
            {/* account container */}
            <Grid container className="top-home-div">
                {/* account info header */}
                <Grid
                    item
                    style={{
                        display: 'flex',
                        textAlign: 'left',
                        width: '100%',
                        paddingTop: '1rem',
                        paddingLeft: '5rem',
                        borderTop: '10px double #8abbb1'
                    }}
                >
                    <p className="saved-head-text" style={{ fontSize: '1.5rem', color: '#505050' }}>Account info:</p>
                </Grid>
                {/* account info */}
                <Grid item sx={{ backgroundColor: '#8abbb1', width: '100%', padding: '1rem' }}>
                    <Grid item sx={{ backgroundColor: '#8abbb1', width: '100%', padding: '2rem', display: 'flex', justifyContent: 'space-evenly', border: 'double 10px #f3f3ec', }}>
                        <div style={{ backgroundColor: '#99ccc2', padding: '0.8rem', borderRadius: '5px' }}>
                            <p>N A M E : {myData.username}</p>
                        </div>
                        <div style={{ backgroundColor: '#99ccc2', padding: '0.8rem', borderRadius: '5px' }}>
                            <p>E M A I L : {myData.email}</p>
                        </div>
                        <div style={{ backgroundColor: '#99ccc2', padding: '0.8rem', borderRadius: '5px' }}>
                            <p>S T A T U S : {myData.role}</p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            {/* container for kept books */}
            <Grid container className="bottom-home-div">
                {/* header for kept books */}
                <Grid
                    item
                    className="spotlight-header"
                    style={{
                        display: 'flex',
                        textAlign: 'left',
                        width: '100%',
                        paddingTop: '1rem',
                        paddingLeft: '5rem',
                        marginBottom: '1rem',
                        marginTop: '1rem',
                        borderTop: '10px double #8abbb1'
                    }}
                >
                    <p className="saved-head-text" style={{ fontSize: '1.5rem', color: '#505050' }}>MyBookshelf <em>{'('}{myBooks.length}{')'}</em></p>
                </Grid>

                {/* kept books section */}
                <Grid className="books-container" container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'center', padding: '5vw', border: 'double 10px #cae4df', marginLeft: '5rem', marginRight: '5rem', marginBottom: '2rem', backgroundColor: '#e9e9e0' }}>

                    {/* each book will be in its own div */}
                    {myBooks.map((myBook, index) => (
                        <Grid className="ind-book" item key={myBook.bookId} xs={2.3} sx={{ animationDelay: `${index * 0.3}s` }}>
                            {/* image */}
                            <div style={{ width: '100%' }}>
                                <Link to={`/singleBook/${myBook.bookId}`}>
                                    <img style={{ width: '100%', height: '20vw' }} src={`data:image/jpg;base64,${myBook.image.data}`} />
                                </Link>
                            </div>

                            {/* title */}
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <p className="my-book-titles" style={{ fontSize: '0.8rem', textWrap: 'wrap' }}>
                                    {myBook.title}
                                </p>
                            </div>

                            {/* delete button */}
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={() => handleRemove(myBook.bookId)} sx={{
                                    backgroundColor: '#8abbb1',
                                    color: '#f3f3ec',
                                    '&:hover': {
                                        backgroundColor: '#6a8e86',
                                    },
                                }}
                                    variant="contained">
                                    remove</Button>
                            </div>

                        </Grid>
                    ))}
                </Grid>
            </Grid>


        </Grid>
    );
};

export default SavedBooks;
