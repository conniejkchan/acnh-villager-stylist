import React from 'react';
import styled from 'styled-components';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import villagersData from './data/villagers.json';
import ItemsData from "./data/items.json";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const App = ({}) => {

  let villagerNameList = []
  let villagerPhotoList = []

  for(let i=0; i<villagersData.length; i++){
      villagerNameList[i] = villagersData[i].name
  }

  for(let i=0; i<villagersData.length; i++){
    villagerPhotoList[i] = villagersData[i].photoImage
  }

  const classes = useStyles();
  return (
    <>
    <h1>Animal Crossing New Horizon Villager Stylists</h1>
    <InputBase
        className={classes.input}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    <IconButton type="submit" className={classes.iconButton} aria-label="search">
      <SearchIcon />
    </IconButton>
    {villagersData.map(villager => {
        return (
          <>
          <div>
            <h2>{villager.name}</h2>
            <img src={villager.photoImage} />
          </div>
          </>
        );
    })}
  
    </>
  );
}

export default App;
