import React from 'react';

import { Modal } from "react-bootstrap";
import Spinner from './Spinner';

const scoreCard = (props) => {

     //Check if previous event
   let date = new Date(props.formatDate)
   let today = new Date();
   today.setHours(0,0,0,0);
   const previous = date < today

    let grossScoreClassnameh1 = 'holeSpan';

    if(props.entrant.scoreCard.h1Score < props.entrant.scoreCard.h1Par) {
        grossScoreClassnameh1 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h1Score > props.entrant.scoreCard.h1Par) {
        grossScoreClassnameh1 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h1Score === props.entrant.scoreCard.h1Par) {
        grossScoreClassnameh1 = 'holeSpan parText'
    }

    let grossScoreClassnameh2 = 'holeSpan';

    if(props.entrant.scoreCard.h2Score < props.entrant.scoreCard.h2Par) {
        grossScoreClassnameh2 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h2Score > props.entrant.scoreCard.h2Par) {
        grossScoreClassnameh2 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h2Score === props.entrant.scoreCard.h2Par) {
        grossScoreClassnameh2 = 'holeSpan parText'
    }

    let grossScoreClassnameh3 = 'holeSpan';

    if(props.entrant.scoreCard.h3Score < props.entrant.scoreCard.h3Par) {
        grossScoreClassnameh3 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h3Score > props.entrant.scoreCard.h3Par) {
        grossScoreClassnameh3 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h3Score === props.entrant.scoreCard.h3Par) {
        grossScoreClassnameh3 = 'holeSpan parText'
    }

    let grossScoreClassnameh4 = 'holeSpan';

    if(props.entrant.scoreCard.h4Score < props.entrant.scoreCard.h4Par) {
        grossScoreClassnameh4 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h4Score > props.entrant.scoreCard.h4Par) {
        grossScoreClassnameh4 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h4Score === props.entrant.scoreCard.h4Par) {
        grossScoreClassnameh4 = 'holeSpan parText'
    }

    let grossScoreClassnameh5 = 'holeSpan';

    if(props.entrant.scoreCard.h5Score < props.entrant.scoreCard.h5Par) {
        grossScoreClassnameh5 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h5Score > props.entrant.scoreCard.h5Par) {
        grossScoreClassnameh5 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h5Score === props.entrant.scoreCard.h5Par) {
        grossScoreClassnameh5 = 'holeSpan parText'
    }

    let grossScoreClassnameh6 = 'holeSpan';

    if(props.entrant.scoreCard.h6Score < props.entrant.scoreCard.h6Par) {
        grossScoreClassnameh6 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h6Score > props.entrant.scoreCard.h6Par) {
        grossScoreClassnameh6 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h6Score === props.entrant.scoreCard.h6Par) {
        grossScoreClassnameh6 = 'holeSpan parText'
    }

    let grossScoreClassnameh7 = 'holeSpan';

    if(props.entrant.scoreCard.h7Score < props.entrant.scoreCard.h7Par) {
        grossScoreClassnameh7 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h7Score > props.entrant.scoreCard.h7Par) {
        grossScoreClassnameh7 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h7Score === props.entrant.scoreCard.h7Par) {
        grossScoreClassnameh7 = 'holeSpan parText'
    }

    let grossScoreClassnameh8 = 'holeSpan';

    if(props.entrant.scoreCard.h8Score < props.entrant.scoreCard.h8Par) {
        grossScoreClassnameh8 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h8Score > props.entrant.scoreCard.h8Par) {
        grossScoreClassnameh8 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h8Score === props.entrant.scoreCard.h8Par) {
        grossScoreClassnameh8 = 'holeSpan parText'
    }

    let grossScoreClassnameh9 = 'holeSpan';

    if(props.entrant.scoreCard.h9Score < props.entrant.scoreCard.h9Par) {
        grossScoreClassnameh9 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h9Score > props.entrant.scoreCard.h9Par) {
        grossScoreClassnameh9 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h9Score === props.entrant.scoreCard.h9Par) {
        grossScoreClassnameh9 = 'holeSpan parText'
    }

    let grossScoreClassnameh10 = 'holeSpan';

    if(props.entrant.scoreCard.h10Score < props.entrant.scoreCard.h10Par) {
        grossScoreClassnameh10 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h10Score > props.entrant.scoreCard.h10Par) {
        grossScoreClassnameh10 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h10Score === props.entrant.scoreCard.h10Par) {
        grossScoreClassnameh10 = 'holeSpan parText'
    }

    let grossScoreClassnameh11 = 'holeSpan';

    if(props.entrant.scoreCard.h11Score < props.entrant.scoreCard.h11Par) {
        grossScoreClassnameh11 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h11Score > props.entrant.scoreCard.h11Par) {
        grossScoreClassnameh11 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h11Score === props.entrant.scoreCard.h11Par) {
        grossScoreClassnameh11 = 'holeSpan parText'
    }

    let grossScoreClassnameh12 = 'holeSpan';

    if(props.entrant.scoreCard.h12Score < props.entrant.scoreCard.h12Par) {
        grossScoreClassnameh12 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h12Score > props.entrant.scoreCard.h12Par) {
        grossScoreClassnameh12 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h12Score === props.entrant.scoreCard.h12Par) {
        grossScoreClassnameh12 = 'holeSpan parText'
    }

    let grossScoreClassnameh13 = 'holeSpan';

    if(props.entrant.scoreCard.h13Score < props.entrant.scoreCard.h13Par) {
        grossScoreClassnameh13 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h13Score > props.entrant.scoreCard.h13Par) {
        grossScoreClassnameh13 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h13Score === props.entrant.scoreCard.h13Par) {
        grossScoreClassnameh13 = 'holeSpan parText'
    }

    let grossScoreClassnameh14 = 'holeSpan';

    if(props.entrant.scoreCard.h14Score < props.entrant.scoreCard.h14Par) {
        grossScoreClassnameh14 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h14Score > props.entrant.scoreCard.h14Par) {
        grossScoreClassnameh14 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h14Score === props.entrant.scoreCard.h14Par) {
        grossScoreClassnameh14 = 'holeSpan parText'
    }

    let grossScoreClassnameh15 = 'holeSpan';

    if(props.entrant.scoreCard.h15Score < props.entrant.scoreCard.h15Par) {
        grossScoreClassnameh15 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h15Score > props.entrant.scoreCard.h15Par) {
        grossScoreClassnameh15 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h15Score === props.entrant.scoreCard.h15Par) {
        grossScoreClassnameh15 = 'holeSpan parText'
    }

    let grossScoreClassnameh16 = 'holeSpan';

    if(props.entrant.scoreCard.h16Score < props.entrant.scoreCard.h16Par) {
        grossScoreClassnameh16 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h16Score > props.entrant.scoreCard.h16Par) {
        grossScoreClassnameh16 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h16Score === props.entrant.scoreCard.h16Par) {
        grossScoreClassnameh16 = 'holeSpan parText'
    }

    let grossScoreClassnameh17 = 'holeSpan';

    if(props.entrant.scoreCard.h17Score < props.entrant.scoreCard.h17Par) {
        grossScoreClassnameh17 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h17Score > props.entrant.scoreCard.h17Par) {
        grossScoreClassnameh17 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h17Score === props.entrant.scoreCard.h17Par) {
        grossScoreClassnameh17 = 'holeSpan parText'
    }

    let grossScoreClassnameh18 = 'holeSpan';

    if(props.entrant.scoreCard.h18Score < props.entrant.scoreCard.h18Par) {
        grossScoreClassnameh18 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h18Score > props.entrant.scoreCard.h18Par) {
        grossScoreClassnameh18 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h18Score === props.entrant.scoreCard.h18Par) {
        grossScoreClassnameh18 = 'holeSpan parText'
    }

    let NettScoreClassnameh1 = 'holeSpan';

    if(props.entrant.scoreCard.h1NettScore < props.entrant.scoreCard.h1Par) {
        NettScoreClassnameh1 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h1NettScore > props.entrant.scoreCard.h1Par) {
        NettScoreClassnameh1 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h1NettScore === props.entrant.scoreCard.h1Par) {
        NettScoreClassnameh1 = 'holeSpan parText'
    }

    let NettScoreClassnameh2 = 'holeSpan';

    if(props.entrant.scoreCard.h2NettScore < props.entrant.scoreCard.h2Par) {
        NettScoreClassnameh2 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h2NettScore > props.entrant.scoreCard.h2Par) {
        NettScoreClassnameh2 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h2NettScore === props.entrant.scoreCard.h2Par) {
        NettScoreClassnameh2 = 'holeSpan parText'
    }

    let NettScoreClassnameh3 = 'holeSpan';

    if(props.entrant.scoreCard.h3NettScore < props.entrant.scoreCard.h3Par) {
        NettScoreClassnameh3 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h3NettScore > props.entrant.scoreCard.h3Par) {
        NettScoreClassnameh3 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h3NettScore === props.entrant.scoreCard.h3Par) {
        NettScoreClassnameh3 = 'holeSpan parText'
    }

    let NettScoreClassnameh4 = 'holeSpan';

    if(props.entrant.scoreCard.h4NettScore < props.entrant.scoreCard.h4Par) {
        NettScoreClassnameh4 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h4NettScore > props.entrant.scoreCard.h4Par) {
        NettScoreClassnameh4 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h4NettScore === props.entrant.scoreCard.h4Par) {
        NettScoreClassnameh4 = 'holeSpan parText'
    }

    let NettScoreClassnameh5 = 'holeSpan';

    if(props.entrant.scoreCard.h5NettScore < props.entrant.scoreCard.h5Par) {
        NettScoreClassnameh5 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h5NettScore > props.entrant.scoreCard.h5Par) {
        NettScoreClassnameh5 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h5NettScore === props.entrant.scoreCard.h5Par) {
        NettScoreClassnameh5 = 'holeSpan parText'
    }

    let NettScoreClassnameh6 = 'holeSpan';

    if(props.entrant.scoreCard.h6NettScore < props.entrant.scoreCard.h6Par) {
        NettScoreClassnameh6 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h6NettScore > props.entrant.scoreCard.h6Par) {
        NettScoreClassnameh6 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h6NettScore === props.entrant.scoreCard.h6Par) {
        NettScoreClassnameh6 = 'holeSpan parText'
    }

    let NettScoreClassnameh7 = 'holeSpan';

    if(props.entrant.scoreCard.h7NettScore < props.entrant.scoreCard.h7Par) {
        NettScoreClassnameh7 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h7NettScore > props.entrant.scoreCard.h7Par) {
        NettScoreClassnameh7 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h7NettScore === props.entrant.scoreCard.h7Par) {
        NettScoreClassnameh7 = 'holeSpan parText'
    }

    let NettScoreClassnameh8 = 'holeSpan';

    if(props.entrant.scoreCard.h8NettScore < props.entrant.scoreCard.h8Par) {
        NettScoreClassnameh8 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h8NettScore > props.entrant.scoreCard.h8Par) {
        NettScoreClassnameh8 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h8NettScore === props.entrant.scoreCard.h8Par) {
        NettScoreClassnameh8 = 'holeSpan parText'
    }

    let NettScoreClassnameh9 = 'holeSpan';

    if(props.entrant.scoreCard.h9NettScore < props.entrant.scoreCard.h9Par) {
        NettScoreClassnameh9 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h9NettScore > props.entrant.scoreCard.h9Par) {
        NettScoreClassnameh9 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h9NettScore === props.entrant.scoreCard.h9Par) {
        NettScoreClassnameh9 = 'holeSpan parText'
    }

    let NettScoreClassnameh10 = 'holeSpan';

    if(props.entrant.scoreCard.h10NettScore < props.entrant.scoreCard.h10Par) {
        NettScoreClassnameh10 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h10NettScore > props.entrant.scoreCard.h10Par) {
        NettScoreClassnameh10 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h10NettScore === props.entrant.scoreCard.h10Par) {
        NettScoreClassnameh10 = 'holeSpan parText'
    }

    let NettScoreClassnameh11 = 'holeSpan';

    if(props.entrant.scoreCard.h11NettScore < props.entrant.scoreCard.h11Par) {
        NettScoreClassnameh11 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h11NettScore > props.entrant.scoreCard.h11Par) {
        NettScoreClassnameh11 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h11NettScore === props.entrant.scoreCard.h11Par) {
        NettScoreClassnameh11 = 'holeSpan parText'
    }

    let NettScoreClassnameh12 = 'holeSpan';

    if(props.entrant.scoreCard.h12NettScore < props.entrant.scoreCard.h12Par) {
        NettScoreClassnameh12 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h12NettScore > props.entrant.scoreCard.h12Par) {
        NettScoreClassnameh12 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h12NettScore === props.entrant.scoreCard.h12Par) {
        NettScoreClassnameh12 = 'holeSpan parText'
    }

    let NettScoreClassnameh13 = 'holeSpan';

    if(props.entrant.scoreCard.h13NettScore < props.entrant.scoreCard.h13Par) {
        NettScoreClassnameh13 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h13NettScore > props.entrant.scoreCard.h13Par) {
        NettScoreClassnameh13 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h13NettScore === props.entrant.scoreCard.h13Par) {
        NettScoreClassnameh13 = 'holeSpan parText'
    }

    let NettScoreClassnameh14 = 'holeSpan';

    if(props.entrant.scoreCard.h14NettScore < props.entrant.scoreCard.h14Par) {
        NettScoreClassnameh14 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h14NettScore > props.entrant.scoreCard.h14Par) {
        NettScoreClassnameh14 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h14NettScore === props.entrant.scoreCard.h14Par) {
        NettScoreClassnameh14 = 'holeSpan parText'
    }

    let NettScoreClassnameh15 = 'holeSpan';

    if(props.entrant.scoreCard.h15NettScore < props.entrant.scoreCard.h15Par) {
        NettScoreClassnameh15 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h15NettScore > props.entrant.scoreCard.h15Par) {
        NettScoreClassnameh15 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h15NettScore === props.entrant.scoreCard.h15Par) {
        NettScoreClassnameh15 = 'holeSpan parText'
    }

    let NettScoreClassnameh16 = 'holeSpan';

    if(props.entrant.scoreCard.h16NettScore < props.entrant.scoreCard.h16Par) {
        NettScoreClassnameh16 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h16NettScore > props.entrant.scoreCard.h16Par) {
        NettScoreClassnameh16 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h16NettScore === props.entrant.scoreCard.h16Par) {
        NettScoreClassnameh16 = 'holeSpan parText'
    }

    let NettScoreClassnameh17 = 'holeSpan';

    if(props.entrant.scoreCard.h17NettScore < props.entrant.scoreCard.h17Par) {
        NettScoreClassnameh17 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h17NettScore > props.entrant.scoreCard.h17Par) {
        NettScoreClassnameh17 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h17NettScore === props.entrant.scoreCard.h17Par) {
        NettScoreClassnameh17 = 'holeSpan parText'
    }

    let NettScoreClassnameh18 = 'holeSpan';

    if(props.entrant.scoreCard.h18NettScore < props.entrant.scoreCard.h18Par) {
        NettScoreClassnameh18 = 'holeSpan birdieText'
    }

    if(props.entrant.scoreCard.h18NettScore > props.entrant.scoreCard.h18Par) {
        NettScoreClassnameh18 = 'holeSpan bogeyText'
    }

    if(props.entrant.scoreCard.h18NettScore === props.entrant.scoreCard.h18Par) {
        NettScoreClassnameh18 = 'holeSpan parText'
    }

    let front9Par = props.entrant.scoreCard.h1Par + props.entrant.scoreCard.h2Par + props.entrant.scoreCard.h3Par + props.entrant.scoreCard.h4Par + props.entrant.scoreCard.h5Par + props.entrant.scoreCard.h6Par + props.entrant.scoreCard.h7Par + props.entrant.scoreCard.h8Par + props.entrant.scoreCard.h9Par;
    let back9Par = props.entrant.scoreCard.h10Par + props.entrant.scoreCard.h11Par + props.entrant.scoreCard.h12Par + props.entrant.scoreCard.h13Par + props.entrant.scoreCard.h14Par + props.entrant.scoreCard.h15Par + props.entrant.scoreCard.h16Par + props.entrant.scoreCard.h17Par + props.entrant.scoreCard.h18Par;
    let front9Score = props.entrant.scoreCard.h1Score + props.entrant.scoreCard.h2Score + props.entrant.scoreCard.h3Score + props.entrant.scoreCard.h4Score + props.entrant.scoreCard.h5Score + props.entrant.scoreCard.h6Score + props.entrant.scoreCard.h7Score + props.entrant.scoreCard.h8Score + props.entrant.scoreCard.h9Score;
    let back9Score = props.entrant.scoreCard.h10Score + props.entrant.scoreCard.h11Score + props.entrant.scoreCard.h12Score + props.entrant.scoreCard.h13Score + props.entrant.scoreCard.h14Score + props.entrant.scoreCard.h15Score + props.entrant.scoreCard.h16Score + props.entrant.scoreCard.h17Score + props.entrant.scoreCard.h18Score;
    let front9NettScore = props.entrant.scoreCard.h1NettScore + props.entrant.scoreCard.h2NettScore + props.entrant.scoreCard.h3NettScore + props.entrant.scoreCard.h4NettScore + props.entrant.scoreCard.h5NettScore + props.entrant.scoreCard.h6NettScore + props.entrant.scoreCard.h7NettScore + props.entrant.scoreCard.h8NettScore + props.entrant.scoreCard.h9NettScore;
    let back9NettScore = props.entrant.scoreCard.h10NettScore + props.entrant.scoreCard.h11NettScore + props.entrant.scoreCard.h12NettScore + props.entrant.scoreCard.h13NettScore + props.entrant.scoreCard.h14NettScore + props.entrant.scoreCard.h15NettScore + props.entrant.scoreCard.h16NettScore + props.entrant.scoreCard.h17NettScore + props.entrant.scoreCard.h18NettScore;
    let front9Points = props.entrant.scoreCard.h1Points + props.entrant.scoreCard.h2Points + props.entrant.scoreCard.h3Points + props.entrant.scoreCard.h4Points + props.entrant.scoreCard.h5Points + props.entrant.scoreCard.h6Points + props.entrant.scoreCard.h7Points + props.entrant.scoreCard.h8Points + props.entrant.scoreCard.h9Points;
    let back9Points = props.entrant.scoreCard.h10Points + props.entrant.scoreCard.h11Points + props.entrant.scoreCard.h12Points + props.entrant.scoreCard.h13Points + props.entrant.scoreCard.h14Points + props.entrant.scoreCard.h15Points + props.entrant.scoreCard.h16Points + props.entrant.scoreCard.h17Points + props.entrant.scoreCard.h18Points;
    let totalPar = front9Par + back9Par;
    let totalNett = front9NettScore + back9NettScore;
    let totalPoints = front9Points + back9Points;

    console.log(Math.round(props.entrant.member.handicap/113*props.courseSlope)-props.entrant.member.socHcpRed)

    return (
        <>
        
        <Modal.Header closeButton>
        <Modal.Title id='scoreCardModal'>
          Score Card for {props.event.name}
          
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
            <div>
                <h3> 
                {!props.event.ninetyFivePercent &&
                          <th >{!previous ?
                            `${props.entrant.member.firstName} ${props.entrant.member.surname} (${Math.round(props.entrant.member.handicap/113*props.courseSlope)-props.entrant.member.socHcpRed})` :
                            `${props.entrant.member.firstName} ${props.entrant.member.surname} (${props.entrant.coursehcp})` }
                          </th>}
                          {props.event.ninetyFivePercent &&
                          <th >{!previous ?
                            `${props.entrant.member.firstName} ${props.entrant.member.surname} (${Math.round(0.95*(props.entrant.member.handicap/113*props.courseSlope)-props.entrant.member.socHcpRed)})` :
                            `${props.entrant.member.firstName} ${props.entrant.member.surname} (${props.entrant.coursehcp})` }
                          </th>}
                </h3>
                <article className="front9">
                    <div className="hole">
                        <span span className={'holeSpanH'}>Front</span>
                        <span span className='holeSpan'>1</span>
                        <span span className='holeSpan'>2</span>
                        <span span className='holeSpan'>3</span>
                        <span span className='holeSpan'>4</span>
                        <span span className='holeSpan'>5</span>
                        <span span className='holeSpan'>6</span>
                        <span span className='holeSpan'>7</span>
                        <span span className='holeSpan'>8</span>
                        <span span className='holeSpan'>9</span>
                        <span span className='holeSpan'>Out</span>
                    </div>
                    <div className="par">
                        <span span className='holeSpanH'>Par</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h1Par}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h2Par}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h3Par}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h4Par}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h5Par}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h6Par}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h7Par}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h8Par}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h9Par}</span>
                        <span span className='holeSpan'>{front9Par}</span>
                    </div>
                    <div className="index">
                        <span span className='holeSpanH'>Index</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h1Index}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h2Index}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h3Index}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h4Index}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h5Index}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h6Index}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h7Index}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h8Index}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h9Index}</span>
                    </div>
                    <div className="gross">
                        <span span className='holeSpanH'>Gross</span>
                        <span span className={grossScoreClassnameh1}>{props.entrant.scoreCard.h1Score}</span>
                        <span span className={grossScoreClassnameh2}>{props.entrant.scoreCard.h2Score}</span>
                        <span span className={grossScoreClassnameh3}>{props.entrant.scoreCard.h3Score}</span>
                        <span span className={grossScoreClassnameh4}>{props.entrant.scoreCard.h4Score}</span>
                        <span span className={grossScoreClassnameh5}>{props.entrant.scoreCard.h5Score}</span>
                        <span span className={grossScoreClassnameh6}>{props.entrant.scoreCard.h6Score}</span>
                        <span span className={grossScoreClassnameh7}>{props.entrant.scoreCard.h7Score}</span>
                        <span span className={grossScoreClassnameh8}>{props.entrant.scoreCard.h8Score}</span>
                        <span span className={grossScoreClassnameh9}>{props.entrant.scoreCard.h9Score}</span>
                        <span className="sub">{front9Score}</span>
                    </div>
                    <div className="score">
                        <span span className='holeSpanH'>Nett</span>
                        <span span className={NettScoreClassnameh1}>{props.entrant.scoreCard.h1NettScore}</span>
                        <span span className={NettScoreClassnameh2}>{props.entrant.scoreCard.h2NettScore}</span>
                        <span span className={NettScoreClassnameh3}>{props.entrant.scoreCard.h3NettScore}</span>
                        <span span className={NettScoreClassnameh4}>{props.entrant.scoreCard.h4NettScore}</span>
                        <span span className={NettScoreClassnameh5}>{props.entrant.scoreCard.h5NettScore}</span>
                        <span span className={NettScoreClassnameh6}>{props.entrant.scoreCard.h6NettScore}</span>
                        <span span className={NettScoreClassnameh7}>{props.entrant.scoreCard.h7NettScore}</span>
                        <span span className={NettScoreClassnameh8}>{props.entrant.scoreCard.h8NettScore}</span>
                        <span span className={NettScoreClassnameh9}>{props.entrant.scoreCard.h9NettScore}</span>
                        <span className="sub">{front9NettScore}</span>
                    </div>
                    <div className="points">
                        <span span className='holeSpanH'>Points</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h1Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h2Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h3Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h4Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h5Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h6Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h7Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h8Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h9Points}</span>
                        <span className="sub">{front9Points}</span>
                    </div>
                </article>
                <article className="back9">
                    <div className="hole">
                        <span className='holeSpanH'>Back</span>
                        <span className='holeSpan'>10</span>
                        <span className='holeSpan'>11</span>
                        <span className='holeSpan'>12</span>
                        <span className='holeSpan'>13</span>
                        <span className='holeSpan'>14</span>
                        <span className='holeSpan'>15</span>
                        <span className='holeSpan'>16</span>
                        <span className='holeSpan'>17</span>
                        <span className='holeSpan'>18</span>
                        <span className='holeSpan'>In</span>
                        <span className='holeSpan'>Total</span>
                    </div>
                    <div className="par">
                        <span className='holeSpanH'>Par</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h1Par}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h2Par}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h3Par}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h4Par}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h5Par}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h6Par}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h7Par}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h8Par}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h9Par}</span>
                        <span className='holeSpan'>{back9Par}</span>
                        <span className='holeSpan'>{totalPar}</span>
                    </div>
                    <div className="index">
                        <span className='holeSpanH'>Index</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h10Index}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h11Index}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h12Index}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h13Index}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h14Index}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h15Index}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h16Index}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h17Index}</span>
                        <span className='holeSpan'>{props.entrant.scoreCard.h18Index}</span>
                    </div>
                    <div className="gross">
                        <span span className='holeSpanH'>Gross</span>
                        <span span className={grossScoreClassnameh10}>{props.entrant.scoreCard.h10Score}</span>
                        <span span className={grossScoreClassnameh11}>{props.entrant.scoreCard.h11Score}</span>
                        <span span className={grossScoreClassnameh12}>{props.entrant.scoreCard.h12Score}</span>
                        <span span className={grossScoreClassnameh13}>{props.entrant.scoreCard.h13Score}</span>
                        <span span className={grossScoreClassnameh14}>{props.entrant.scoreCard.h14Score}</span>
                        <span span className={grossScoreClassnameh15}>{props.entrant.scoreCard.h15Score}</span>
                        <span span className={grossScoreClassnameh16}>{props.entrant.scoreCard.h16Score}</span>
                        <span span className={grossScoreClassnameh17}>{props.entrant.scoreCard.h17Score}</span>
                        <span span className={grossScoreClassnameh18}>{props.entrant.scoreCard.h18Score}</span>
                        <span className="sub">{back9Score}</span>
                        <span className="total">{front9Score + back9Score}</span>
                    </div>
                    <div className="score">
                        <span span className='holeSpanH'>Nett</span>
                        <span span className={NettScoreClassnameh10}>{props.entrant.scoreCard.h10NettScore}</span>
                        <span span className={NettScoreClassnameh11}>{props.entrant.scoreCard.h11NettScore}</span>
                        <span span className={NettScoreClassnameh12}>{props.entrant.scoreCard.h12NettScore}</span>
                        <span span className={NettScoreClassnameh13}>{props.entrant.scoreCard.h13NettScore}</span>
                        <span span className={NettScoreClassnameh14}>{props.entrant.scoreCard.h14NettScore}</span>
                        <span span className={NettScoreClassnameh15}>{props.entrant.scoreCard.h15NettScore}</span>
                        <span span className={NettScoreClassnameh16}>{props.entrant.scoreCard.h16NettScore}</span>
                        <span span className={NettScoreClassnameh17}>{props.entrant.scoreCard.h17NettScore}</span>
                        <span span className={NettScoreClassnameh18}>{props.entrant.scoreCard.h18NettScore}</span>
                        <span className="sub">{back9NettScore}</span>
                        <span className="total">{totalNett}</span>
                    </div>

                    <div className="points">
                        <span span className='holeSpanH'>Points</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h10Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h11Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h12Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h13Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h14Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h15Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h16Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h17Points}</span>
                        <span span className='holeSpan'>{props.entrant.scoreCard.h18Points}</span>
                        <span className="sub">{back9Points}</span>
                        <span className="sub">{totalPoints}</span>
                    </div>
                </article>
            </div>
        </Modal.Body>
        </>
    );
};

export default scoreCard;