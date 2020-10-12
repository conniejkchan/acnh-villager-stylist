import React, {useState} from 'react';
import styled from 'styled-components';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { green,red } from '@material-ui/core/colors';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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

//TODO: final results stylist recommendations in the middle between villager and item search
const App = ({}) => {
  // All the states within the application
  const [villagerName, setVillagerName] = useState('')
  const [villagerNameColor, setVillagerNameColor] = useState('')
  const [villagerPhoto, setVillagerPhoto] = useState('')
  const [villagerColors, setVillagerColors] = useState([])
  const [villagerStyles, setVillagerStyles] = useState([])
  const [inputVillager, setInputVillager] = useState('');

  const[itemName, setItemName] = useState('')
  const[itemPhoto, setItemPhoto] = useState('')
  const[itemColors, setItemColors] = useState([])
  const[itemStyle, setItemStyle] = useState('')
  const[itemVariation,setItemVariation] = useState('')
  const[itemVariationList,setItemVariationList] = useState([])
  const[itemPropertyList,setItemPropertyList] = useState([])
  const [inputItem, setInputItem] = useState('');

  const[showDetails,setShowDetails] = useState(false)
  
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
        // clear item properties here
        setItemPhoto('')
        setItemColors([])
        const variants = item.variants
        setItemPropertyList(variants)
        const variantList = []
        variants.map(variant => {
          variantList.push(variant.variation)
        })
        setItemVariationList(variantList)
      }
    })
  }

  const selectItem = (event,value) => {
    console.log(event.target.value)
    console.log(value)
    clothesData.map(item => {
      if(value !== null && value.toLowerCase() === item.name.toLowerCase()) {
        const variants = item.variants
        setItemPropertyList(variants)
        const variantList = []
        variants.map(variant => {
          variantList.push(variant.variation)
        })
        setItemName(item.name)
        setItemVariationList(variantList)
        setItemStyle(item.style)
        // clear item properties here
        setItemPhoto('')
        setItemColors([])
      }
      else if(value === null) {
        setItemVariation('')
        setItemPhoto('')
        setItemStyle('')
        setShowDetails(false)
      }
    })
  }

  const getItemVariation = e => {
    e.preventDefault()
    clothesData.map(item => {
    // check item
      if(itemName === item.name) {
        itemPropertyList.map( obj => {
          // reset selection
          if(e.target.value === obj.variation || obj.variation == null) {
            setItemVariation(e.target.value)
            setItemPhoto(obj.closetImage)
            setItemColors(obj.colors)
            setShowDetails(true) 
          }
        })
      }
    })

  };

  return (
    <>
    <h1 className="text">Animal Crossing New Horizon Villager Stylist</h1>
    <h3 className="text">Each villager has their favorite 2 clothing styles and 2 colors they prefer. Use this app to help verify if the gift aligns with the villager's clothing style and color preferences.</h3>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <form noValidate>
          <Autocomplete
            freeSolo
            style={{ width: 300 }}
            options={villagersData.map((option) => option.name)}
            onChange={selectVillager}
            inputValue={inputVillager}
            onInputChange={(event, newInputVillager) => {
              setInputVillager(newInputVillager);
            }}
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
            freeSolo
            style={{ width: 300 }}
            options={clothesData.map((option) => option.name)}
            onChange={selectItem}
            inputValue={inputItem}
            onInputChange={(event, newInputItem) => {
              setInputItem(newInputItem);
            }}
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
        <div className="text">
          <h2 style={{color: villagerNameColor}}>{villagerName}</h2>
          <img src={villagerPhoto} />
            {(villagerStyles === undefined || villagerStyles.length === 0)?
                <></>
                :<h3>Likes: </h3>
            }       
            {villagerStyles.map(style => {
              return (
                <>
                  <li>
                    {style}
                  </li>
                </>
              );
            })}
            {villagerColors.map(color => {
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
      <Grid item xs={6}>
        {(itemName === "" || itemStyle === "" || itemColors.length === 0)?
          <></>
          :
            <div className="text">
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
          }
      </Grid>
    </Grid>
    {/* check matches between color and styles */}
    {(showDetails === false)?
        <></> :
        <>
        <h1 className="text">Stylist Recommendation:</h1>
        <h2 className="text">
      
        {villagerStyles.map(style => {
          return (
            <>
              {(style === itemStyle)?
                <>
                  <li>
                    <CheckCircleRoundedIcon style={{ color: green[500] }} />
                    Style Match ~ {itemStyle}
                  </li>
                </>
              :
                <>
                  <li>
                    <NotInterestedIcon style={{ color: red[500] }} />
                    Style Does NOT Match
                  </li>
                </>
              } 
            </>
          );
        })}
        {villagerColors.map(vColor => {
          return(
            <>
              {(itemColors.includes(vColor))?
                <>
                  <li>
                    <CheckCircleRoundedIcon style={{ color: green[500] }} />
                    Color Match ~ {vColor}
                  </li>
                </>
              :
                <>
                  <li>
                      <NotInterestedIcon style={{ color: red[500] }} />
                      Color Does NOT Match
                  </li>
                </>
              } 
            </>
          );
        })}
        </h2>
        </>
        }
    </>
  );
}

export default App;
