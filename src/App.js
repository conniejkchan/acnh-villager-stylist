import React, {useState} from 'react';
import styled from 'styled-components';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }

}));

const App = ({}) => {
  const [villagerName, setVillagerName] = useState('')
  const [villagerNameColor, setVillagerNameColor] = useState('')
  const [villagerPhoto, setVillagerPhoto] = useState('')
  const [villagerColors, setVillagerColors] = useState([])
  const [villagerStyles, setVillagerStyles] = useState([])

  const[itemName, setItemName] = useState('')
  const[itemPhoto, setItemPhoto] = useState('')
  const[itemColors, setItemColors] = useState([])
  const[itemStyle, setItemStyle] = useState('')
  const[itemVariation,setItemVariation] = useState('')
  const[itemVariationList,setItemVariationList] = useState([])
  const[itemPropertyList,setItemPropertyList] = useState([])
  
  // filter to only clothes items
  const clothesData = itemsData.filter(
  item => 
    item.sourceSheet === 'Tops' ||
    item.sourceSheet === 'Bottoms' ||
    item.sourceSheet === 'Dress-Up' ||
    item.sourceSheet === 'Headwear' ||
    item.sourceSheet === 'Accessories' ||
    item.sourceSheet === 'Socks' ||
    item.sourceSheet === 'Shoes' ||
    item.sourceSheet === 'Bags'
  );
  
  const classes = useStyles();

  // input -> show villager pic and name
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

  // select -> show villager pic and name
  const selectVillager = (event, value) => {
    setVillagerName(value)
    villagersData.map(villager => {
      console.log(value)
      if(value !== null && value.toLowerCase() === villager.name.toLowerCase()) {
        setVillagerPhoto(villager.photoImage)
        setVillagerNameColor(villager.bubbleColor)
        setVillagerColors(villager.colors)
        setVillagerStyles(villager.styles)
      }
      else if(value === null ) {
        setVillagerPhoto('')
        setVillagerNameColor('')
        setVillagerColors([])
        setVillagerStyles([])
      }
    })
  }

  const getItem = e => {
    clothesData.map(item => {
      if(e.target.value.toLowerCase() === item.name.toLowerCase()) {
        setItemName(item.name)
        setItemStyle(item.style)
        const variants = item.variants
        setItemPropertyList(variants)
        const variantList = []
        variants.map(variant => {
          variantList.push(variant.variation)
        })
        setItemVariationList(variantList)
        // value is null
        console.log(itemVariationList)
      }
    })
  }

  const selectItem = (event,value) => {
    setItemName(value)
    clothesData.map(item => {
      if(value !== null && value.toLowerCase() === item.name.toLowerCase()) {
        const variants = item.variants
        setItemPropertyList(variants)
        const variantList = []
        variants.map(variant => {
          variantList.push(variant.variation)
        })
        setItemVariationList(variantList)
        setItemStyle(item.style)
        // value is undefined
        console.log(itemVariationList)
      }
      else if(value === null) {
        setItemVariation('')
        setItemPhoto('')
        setItemStyle('')
      }
    })
  }

  const getItemVariation = e => {
    // FIXME: have to search item with variant options first before items with no variants like orange hat
    e.preventDefault()
    clothesData.map(item => {
    // check item
      if(itemName === item.name) {
        // FIXME: variant list already set previously, assigns the wrong color variant and doesnt change photo
        console.log(itemPropertyList)
        itemPropertyList.map( obj => {
          // reset selection

          if(e.target.value === obj.variation || obj.variation == null) {
            setItemVariation(e.target.value)
            setItemPhoto(obj.closetImage)
            setItemColors(obj.colors)
            // also set up colors fields        
          }
          // else if(obj.variation == null){
          //   // only one variation
          //   // disable the variation select
          //   setItemVariation(e.target.value)
          //   setItemPhoto(obj.closetImage)
          //   setItemColors(obj.colors)
          // }

        })
      }
    })

  };

  return (
    <>
    <h1 className="text">Animal Crossing New Horizon Villager Stylists</h1>
    <h3 className="text">Each villager has their favorite 2 clothing styles and 2 colors they prefer. Use this app to help verify if the gift aligns with the villager's clothing style and color preferences.</h3>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <form noValidate>
          <Autocomplete
            style={{ width: 300 }}
            options={villagersData.map((option) => option.name)}
            onChange={selectVillager}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.input}
                id="outlined-search"
                label="Villager Name"
                type="search"
                variant="outlined"
                color="secondary"
                onChange={getVillager}
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </form>
      </Grid>
      <Grid item xs={3}>
        <form noValidate>
        <Autocomplete
            style={{ width: 300 }}
            options={clothesData.map((option) => option.name)}
            onChange={selectItem}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.input}
                id="outlined-search"
                label="Item Name"
                type="search"
                variant="outlined"
                onChange={getItem}
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </form>
      </Grid>
      <Grid item xs={3}>
      <FormControl className={classes.formControl}>
        <InputLabel>Item Variation</InputLabel>
        <Select
          value={itemVariation}
          onClick={getItemVariation}
        >
            <MenuItem value="">None</MenuItem>
            {itemVariationList.map(option => {
                return (
                  <MenuItem value={option}>{option}</MenuItem>
                );
              })}   
        </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <div className="searchVillager">
          <h2 style={{color: villagerNameColor}}>{villagerName}</h2>
          <img src={villagerPhoto} />
          <h3>Likes: </h3>
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
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="searchItem">
          <h2>Item: {itemName}</h2>
          <img src={itemPhoto} />
          <h3>Style: {itemStyle}</h3>
          <h3>Colors:</h3>
          {itemColors.map(color => {
              return (
                <>
                  <li>
                    {color}
                  </li>
                </>
              );
            })}
        </div>
      </Grid>
    </Grid>
    {/* // check matches between color styles */}
    <h1 className="text">Stylists Recommendation:</h1>
    <CheckCircleRoundedIcon color="primary" />
  
    </>
  );
}

export default App;
