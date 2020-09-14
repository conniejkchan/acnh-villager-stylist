import React, {useState} from 'react';
import styled from 'styled-components';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";

import villagersData from './data/villagers.json';
import itemsData from "./data/items.json";

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
    textAlign: 'center'
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
  const [villagerName, setVillagerName] = useState('')
  const [villagerNameColor, setVillagerNameColor] = useState('')
  const [villagerPhoto, setVillagerPhoto] = useState('')
  const [villagerColors, setVillagerColors] = useState([])
  const [villagerStyles, setVillagerStyles] = useState([])

  const[itemName, setItemName] = useState('')
  const[itemPhoto, setItemPhoto] = useState('')
  const[itemVariation,setItemVariation] = useState([])


  const classes = useStyles();

  // show villager pic and name
  const getVillager = e => {
    villagersData.map(villager => {
      if(e.target.value.toLowerCase() === villager.name.toLowerCase()) {
        setVillagerName(villager.name)
        setVillagerPhoto(villager.photoImage)
        setVillagerNameColor(villager.bubbleColor)
        setVillagerColors(villager.colors)
        setVillagerStyles(villager.styles)
      }
    })
  }

  const getItem = e => {
    itemsData.map(item => {
      if(e.target.value.toLowerCase() === item.name.toLowerCase()) {
        setItemName(item.name)
        //setItemPhoto(item)
      }
    })
  }

  return (
    <>
    <h1 className="header">Animal Crossing New Horizon Villager Stylists</h1>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.input}
            id="outlined-search"
            label="Villager Name"
            type="search"
            variant="outlined"
            color="secondary"
            onChange={getVillager}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </Grid>
      <Grid item xs={6}>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.input}
            id="outlined-search"
            label="Item Name"
            type="search"
            variant="outlined"
            onChange={getItem}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </Grid>
      <Grid item xs={6}>
        <div className="searchVillager">
          <h2 style={{color: villagerNameColor}}>{villagerName}</h2>
          <img src={villagerPhoto} />
          <h3>likes 
            {villagerColors.map(color => {
              return (
                <>
                  <li>
                    {color}
                  </li>
                </>
              );
            })}
            {villagerStyles.map(style => {
            return (
              <>
                <li>
                  {style}
                </li>
              </>
            );
          })}
          </h3>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="searchItem">
          <h2>{itemName}</h2>
          <img src={villagerPhoto} />
        </div>
      </Grid>
    </Grid>
  
    </>
  );
}

export default App;
