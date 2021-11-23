import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import  AuthContext  from '../auth';
import DeleteModal from './DeleteModal'
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';


/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadIdNamePairs(auth.email);
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <Button><HomeIcon/></Button>
            <Button><HomeIcon/></Button>
            <Button><HomeIcon/></Button>
            <Button><HomeIcon/></Button>
            <TextField label = "Search" style = {{width : "60%"}}></TextField>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <DeleteModal/>
        </div>);
}

export default HomeScreen;