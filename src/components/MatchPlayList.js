import React, { useState, useEffect } from 'react';
import * as apiCalls from '../api/apiCalls';



export const MatchPlayList = (props) => {
    const [entrants, setEntrants] = useState([]);
    const [groups, setGroups] = useState([[]]);

    let noOfEntrants = entrants.length;
      let noOfGroups = 3;
      let entrantsPerGroup =  noOfEntrants / noOfGroups; // 4
      let noOfRounds = entrantsPerGroup - 1; // 3

    const loadData = () => {
        apiCalls.getEntrants(97)
        .then ((response) => {
            setEntrants(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        loadData();
      }, []);

    



    return (
        <div>Hello</div>
    )
}

export default MatchPlayList;