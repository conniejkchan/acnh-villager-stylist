import React from 'react';
import styled from 'styled-components';
import './App.css';

import villagersData from './data/villagers.json';
import ItemsData from "./data/items.json";

const App = ({}) => {

  let villagerNameList = []
  let villagerPhotoList = []

  for(let i=0; i<villagersData.length; i++){
      villagerNameList[i] = villagersData[i].name
  }

  for(let i=0; i<villagersData.length; i++){
    villagerPhotoList[i] = villagersData[i].photoImage
  }


  return (
    <>
    <h1>Animal Crossing New Horizon Villager Stylist</h1>
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
