import React, { useState } from 'react';
import { Modal, Button, Container, Row } from "react-bootstrap";
import Spinner from "../Spinner";
import * as apiCalls from '../../api/apiCalls';

const AdminScoreEntryModal = (props) => {

  const [pendingApicall, setPendingApiCall] = useState(false)
  const [errors, setErrors] = useState();

  // Player 1 setup
    const [p1HoleIndex, setP1HoleIndex] = useState(sessionStorage.getItem('p1HoleIndex') ? sessionStorage.getItem('p1HoleIndex') : 0);
    const [member1Id, setMember1Id] = useState(sessionStorage.getItem('member1_id') ? sessionStorage.getItem('member1_id') : null);
    const [member1Selected, setMember1Selected] = useState(sessionStorage.getItem('p1MemberSelected') ? true : false);
    const p1ScoreAddOne = () => {
      let score = 0;
      let newScore = score + 1;
      window.sessionStorage.setItem(`h${p1HoleIndex+1}P1Score`, newScore);
    }
  
    const p1ScoreTakeOne = () => {
      let score = parseInt(window.sessionStorage.getItem(`h${p1HoleIndex+1}P1Score`));
      let newScore = score - 1;
      window.sessionStorage.setItem(`h${p1HoleIndex+1}P1Score`, newScore);
    }

    const [p1ScoreCardObj, setp1ScoreCardObj] = useState({
      h1P1Score: 0,
      h2P1Score: 0,
      h3P1Score: 0,
      h4P1Score: 0,
      h5P1Score: 0,
      h6P1Score: 0,
      h7P1Score: 0,
      h8P1Score: 0,
      h9P1Score: 0,
      h10P1Score: 0,
      h11P1Score: 0,
      h12P1Score: 0,
      h13P1Score: 0,
      h14P1Score: 0,
      h15P1Score: 0,
      h16P1Score: 0,
      h17P1Score: 0,
      h18P1Score: 0
    });

    const removeSessionStorageP1Name = () => {
      window.sessionStorage.removeItem('member1_id');
      setMember1Selected(false)
      window.sessionStorage.removeItem('p1MemberSelected');
      setMember1Id(null);
    };
  
    const removeSessionStorageP1Scores = () => {
      window.sessionStorage.removeItem('h1P1Score');
      window.sessionStorage.removeItem('h2P1Score');
      window.sessionStorage.removeItem('h3P1Score');
      window.sessionStorage.removeItem('h4P1Score');
      window.sessionStorage.removeItem('h5P1Score');
      window.sessionStorage.removeItem('h6P1Score');
      window.sessionStorage.removeItem('h7P1Score');
      window.sessionStorage.removeItem('h8P1Score');
      window.sessionStorage.removeItem('h9P1Score');
      window.sessionStorage.removeItem('h10P1Score');
      window.sessionStorage.removeItem('h11P1Score');
      window.sessionStorage.removeItem('h12P1Score');
      window.sessionStorage.removeItem('h13P1Score');
      window.sessionStorage.removeItem('h13P1Score');
      window.sessionStorage.removeItem('h14P1Score');
      window.sessionStorage.removeItem('h15P1Score');
      window.sessionStorage.removeItem('h16P1Score');
      window.sessionStorage.removeItem('h17P1Score');
      window.sessionStorage.removeItem('h18P1Score');
      window.sessionStorage.removeItem('p1HoleIndex')
      setp1ScoreCardObj({
        h1P1Score: 0,
        h2P1Score: 0,
        h3P1Score: 0,
        h4P1Score: 0,
        h5P1Score: 0,
        h6P1Score: 0,
        h7P1Score: 0,
        h8P1Score: 0,
        h9P1Score: 0,
        h10P1Score: 0,
        h11P1Score: 0,
        h12P1Score: 0,
        h13P1Score: 0,
        h14P1Score: 0,
        h15P1Score: 0,
        h16P1Score: 0,
        h17P1Score: 0,
        h18P1Score: 0
      })
    };

    const toP1NextHole = () => {
      if(p1HoleIndex+1 <=18) {
        sessionStorage.setItem('p1HoleIndex', p1HoleIndex + 1)
        setP1HoleIndex(p1HoleIndex+1)
        
      }
    }
    const toP1PrevHole = () => {
      if(p1HoleIndex+1 > 1){
        sessionStorage.setItem('p1HoleIndex', p1HoleIndex - 1)
        setP1HoleIndex(p1HoleIndex-1)
      }
    }

    const onChangeP1ScoreCard = (e) => {
      const { value, name } = e.target;
      window.sessionStorage.setItem(name, value)
      setp1ScoreCardObj((previousp1ScoreCardObj) => {
        return {
          ...previousp1ScoreCardObj,
          [name]: value
        };
      });
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const onChangeMember1 = (event) => {
      const { value, name } = event.target;
      setMember1Id(value);
      setMember1Selected(true)
      window.sessionStorage.setItem(name, value);
      window.sessionStorage.setItem('member1_id', value);
      window.sessionStorage.setItem('p1MemberSelected', true)
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const updateP1ScoreCard = () => {
      toP1NextHole();
      const eventId = props.event.id;
      const memberId = member1Id.split(" ")[0];
      const scoreCardUpdate = ({
        "h1Score" : sessionStorage.getItem('h1P1Score') ? sessionStorage.getItem('h1P1Score') : 0,
        "h2Score" : sessionStorage.getItem('h2P1Score') ? sessionStorage.getItem('h2P1Score') : 0,
        "h3Score" : sessionStorage.getItem('h3P1Score') ? sessionStorage.getItem('h3P1Score') : 0,
        "h4Score" : sessionStorage.getItem('h4P1Score') ? sessionStorage.getItem('h4P1Score') : 0,
        "h5Score" : sessionStorage.getItem('h5P1Score') ? sessionStorage.getItem('h5P1Score') : 0,
        "h6Score" : sessionStorage.getItem('h6P1Score') ? sessionStorage.getItem('h6P1Score') : 0,
        "h7Score" : sessionStorage.getItem('h7P1Score') ? sessionStorage.getItem('h7P1Score') : 0,
        "h8Score" : sessionStorage.getItem('h8P1Score') ? sessionStorage.getItem('h8P1Score') : 0,
        "h9Score" : sessionStorage.getItem('h9P1Score') ? sessionStorage.getItem('h9P1Score') : 0,
        "h10Score" : sessionStorage.getItem('h10P1Score') ? sessionStorage.getItem('h10P1Score') : 0,
        "h11Score" : sessionStorage.getItem('h11P1Score') ? sessionStorage.getItem('h11P1Score') : 0,
        "h12Score" : sessionStorage.getItem('h12P1Score') ? sessionStorage.getItem('h12P1Score') : 0,
        "h13Score" : sessionStorage.getItem('h13P1Score') ? sessionStorage.getItem('h13P1Score') : 0,
        "h14Score" : sessionStorage.getItem('h14P1Score') ? sessionStorage.getItem('h14P1Score') : 0,
        "h15Score" : sessionStorage.getItem('h15P1Score') ? sessionStorage.getItem('h15P1Score') : 0,
        "h16Score" : sessionStorage.getItem('h16P1Score') ? sessionStorage.getItem('h16P1Score') : 0,
        "h17Score" : sessionStorage.getItem('h17P1Score') ? sessionStorage.getItem('h17P1Score') : 0,
        "h18Score" : sessionStorage.getItem('h18P1Score') ? sessionStorage.getItem('h18P1Score') : 0,
      
      })
      setPendingApiCall(true)
      apiCalls
      .updateScore(eventId, memberId, p1HoleIndex + 1, scoreCardUpdate)
      .then(
        setPendingApiCall(false),
      )
      .catch((apiError) => {
        setPendingApiCall(false)
      })
      
    }



  // Player 2 setup
  const [p2HoleIndex, setP2HoleIndex] = useState(sessionStorage.getItem('p2HoleIndex') ? sessionStorage.getItem('p2HoleIndex') : 0);
  const [member2Id, setMember2Id] = useState(sessionStorage.getItem('member2_id') ? sessionStorage.getItem('member2_id') : null);
  const [member2Selected, setMember2Selected] = useState(sessionStorage.getItem('p2MemberSelected') ? true : false);
  const p2ScoreAddOne = () => {
    let score = 0;
    let newScore = score + 1;
    window.sessionStorage.setItem(`h${p2HoleIndex+1}P2Score`, newScore);
  }
  
  const p2ScoreTakeOne = () => {
    let score = parseInt(window.sessionStorage.getItem(`h${p2HoleIndex+1}P2Score`));
    let newScore = score - 1;
    window.sessionStorage.setItem(`h${p2HoleIndex+1}P2Score`, newScore);
  }

    const [p2ScoreCardObj, setp2ScoreCardObj] = useState({
      h1P2Score: 0,
      h2P2Score: 0,
      h3P2Score: 0,
      h4P2Score: 0,
      h5P2Score: 0,
      h6P2Score: 0,
      h7P2Score: 0,
      h8P2Score: 0,
      h9P2Score: 0,
      h10P2Score: 0,
      h11P2Score: 0,
      h12P2Score: 0,
      h13P2Score: 0,
      h14P2Score: 0,
      h15P2Score: 0,
      h16P2Score: 0,
      h17P2Score: 0,
      h18P2Score: 0
    });

    const removeSessionStorageP2Scores = () => {
      window.sessionStorage.removeItem('h1P2Score');
      window.sessionStorage.removeItem('h2P2Score');
      window.sessionStorage.removeItem('h3PScore');
      window.sessionStorage.removeItem('h4P2Score');
      window.sessionStorage.removeItem('h5P2Score');
      window.sessionStorage.removeItem('h6P2Score');
      window.sessionStorage.removeItem('h7P2Score');
      window.sessionStorage.removeItem('h8P2Score');
      window.sessionStorage.removeItem('h9P2Score');
      window.sessionStorage.removeItem('h10P2Score');
      window.sessionStorage.removeItem('h11P2Score');
      window.sessionStorage.removeItem('h12P2Score');
      window.sessionStorage.removeItem('h13P2Score');
      window.sessionStorage.removeItem('h13P2Score');
      window.sessionStorage.removeItem('h14P2Score');
      window.sessionStorage.removeItem('h15P2Score');
      window.sessionStorage.removeItem('h16P2Score');
      window.sessionStorage.removeItem('h17P2Score');
      window.sessionStorage.removeItem('h18P2Score');
      window.sessionStorage.removeItem('p2HoleIndex')
      setp2ScoreCardObj({
        h1P2Score: 0,
        h2P2Score: 0,
        h3P2Score: 0,
        h4P2Score: 0,
        h5P2Score: 0,
        h6P2Score: 0,
        h7P2Score: 0,
        h8P2Score: 0,
        h9P2Score: 0,
        h10P2Score: 0,
        h11P2Score: 0,
        h12P2Score: 0,
        h13P2Score: 0,
        h14P2Score: 0,
        h15P2Score: 0,
        h16P2Score: 0,
        h17P2Score: 0,
        h18P2Score: 0
      })
    };
  
    const removeSessionStorageP2Name = () => {
      window.sessionStorage.removeItem('member2_id');
      setMember1Selected(false)
      window.sessionStorage.removeItem('p2MemberSelected');
      setMember1Id(null);
    };

    const toP2NextHole = () => {
      if(p2HoleIndex+1 <=18) {
        sessionStorage.setItem('p2HoleIndex', p2HoleIndex + 1)
        setP2HoleIndex(p2HoleIndex+1)
        
      }
    }
    const toP2PrevHole = () => {
      if(p2HoleIndex+1 > 1){
        sessionStorage.setItem('p2HoleIndex', p2HoleIndex - 1)
        setP2HoleIndex(p2HoleIndex-1)
      }
    }

    const onChangeP2ScoreCard = (e) => {
      const { value, name } = e.target;
      window.sessionStorage.setItem(name, value)
      setp2ScoreCardObj((previousp2ScoreCardObj) => {
        return {
          ...previousp2ScoreCardObj,
          [name]: value
        };
      });
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const onChangeMember2 = (event) => {
      const { value, name } = event.target;
      setMember2Id(value);
      setMember2Selected(true)
      window.sessionStorage.setItem(name, value);
      window.sessionStorage.setItem('member2_id', value);
      window.sessionStorage.setItem('p2MemberSelected', true)
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const updateP2ScoreCard = () => {
      toP2NextHole();
      const eventId = props.event.id;
      const memberId = member2Id.split(" ")[0];
      const scoreCardUpdate = ({
        "h1Score" : sessionStorage.getItem('h1P2Score') ? sessionStorage.getItem('h1P2Score') : 0,
        "h2Score" : sessionStorage.getItem('h2P2Score') ? sessionStorage.getItem('h2P2Score') : 0,
        "h3Score" : sessionStorage.getItem('h3P2Score') ? sessionStorage.getItem('h3P2Score') : 0,
        "h4Score" : sessionStorage.getItem('h4P2Score') ? sessionStorage.getItem('h4P2Score') : 0,
        "h5Score" : sessionStorage.getItem('h5P2Score') ? sessionStorage.getItem('h5P2Score') : 0,
        "h6Score" : sessionStorage.getItem('h6P2Score') ? sessionStorage.getItem('h6P2Score') : 0,
        "h7Score" : sessionStorage.getItem('h7P2Score') ? sessionStorage.getItem('h7P2Score') : 0,
        "h8Score" : sessionStorage.getItem('h8P2Score') ? sessionStorage.getItem('h8P2Score') : 0,
        "h9Score" : sessionStorage.getItem('h9P2Score') ? sessionStorage.getItem('h9P2Score') : 0,
        "h10Score" : sessionStorage.getItem('h10P2Score') ? sessionStorage.getItem('h10P2Score') : 0,
        "h11Score" : sessionStorage.getItem('h11P2Score') ? sessionStorage.getItem('h11P2Score') : 0,
        "h12Score" : sessionStorage.getItem('h12P2Score') ? sessionStorage.getItem('h12P2Score') : 0,
        "h13Score" : sessionStorage.getItem('h13P2Score') ? sessionStorage.getItem('h13P2Score') : 0,
        "h14Score" : sessionStorage.getItem('h14P2Score') ? sessionStorage.getItem('h14P2Score') : 0,
        "h15Score" : sessionStorage.getItem('h15P2Score') ? sessionStorage.getItem('h15P2Score') : 0,
        "h16Score" : sessionStorage.getItem('h16P2Score') ? sessionStorage.getItem('h16P2Score') : 0,
        "h17Score" : sessionStorage.getItem('h17P2Score') ? sessionStorage.getItem('h17P2Score') : 0,
        "h18Score" : sessionStorage.getItem('h18P2Score') ? sessionStorage.getItem('h18P2Score') : 0,
      
      })
      setPendingApiCall(true)
      apiCalls
      .updateScore(eventId, memberId, p2HoleIndex + 1, scoreCardUpdate)
      .then(
        setPendingApiCall(false),
      )
      .catch((apiError) => {
        setPendingApiCall(false)
      })
      
    }
  
    


  // Player 3 setup
    const [p3HoleIndex, setP3HoleIndex] = useState(sessionStorage.getItem('p3HoleIndex') ? sessionStorage.getItem('p3HoleIndex') : 0);
    const [member3Id, setMember3Id] = useState(sessionStorage.getItem('member3_id') ? sessionStorage.getItem('member3_id') : null);
    const [member3Selected, setMember3Selected] = useState(sessionStorage.getItem('p3MemberSelected') ? true : false);
    const p3ScoreAddOne = () => {
      let score = parseInt(window.sessionStorage.getItem(`h${p3HoleIndex+1}P3Score`));
      let newScore = score + 1;
      window.sessionStorage.setItem(`h${p3HoleIndex+1}P3Score`, newScore);
    }
  
    const p3ScoreTakeOne = () => {
      let score = parseInt(window.sessionStorage.getItem(`h${p3HoleIndex+1}P3Score`));
      let newScore = score - 1;
      window.sessionStorage.setItem(`h${p3HoleIndex+1}P3Score`, newScore);
    }

    const [p3ScoreCardObj, setp3ScoreCardObj] = useState({
      h1P3Score: 0,
      h2P3Score: 0,
      h3P3Score: 0,
      h4P3Score: 0,
      h5P3Score: 0,
      h6P3Score: 0,
      h7P3Score: 0,
      h8P3Score: 0,
      h9P3Score: 0,
      h10P3Score: 0,
      h11P3Score: 0,
      h12P3Score: 0,
      h13P3Score: 0,
      h14P3Score: 0,
      h15P3Score: 0,
      h16P3Score: 0,
      h17P3Score: 0,
      h18P3Score: 0
    });

    const removeSessionStorageP3Scores = () => {
      window.sessionStorage.removeItem('h1P3Score');
      window.sessionStorage.removeItem('h2P3Score');
      window.sessionStorage.removeItem('h3P3Score');
      window.sessionStorage.removeItem('h4P3Score');
      window.sessionStorage.removeItem('h5P3Score');
      window.sessionStorage.removeItem('h6P3Score');
      window.sessionStorage.removeItem('h7P3Score');
      window.sessionStorage.removeItem('h8P3Score');
      window.sessionStorage.removeItem('h9P3Score');
      window.sessionStorage.removeItem('h10P3Score');
      window.sessionStorage.removeItem('h11P3Score');
      window.sessionStorage.removeItem('h12P3Score');
      window.sessionStorage.removeItem('h13P3Score');
      window.sessionStorage.removeItem('h13P3Score');
      window.sessionStorage.removeItem('h14P3Score');
      window.sessionStorage.removeItem('h15P3Score');
      window.sessionStorage.removeItem('h16P3Score');
      window.sessionStorage.removeItem('h17P3Score');
      window.sessionStorage.removeItem('h18P3Score');
      setp3ScoreCardObj({
        h1P3Score: 0,
        h2P3Score: 0,
        h3P3Score: 0,
        h4P3Score: 0,
        h5P3Score: 0,
        h6P3Score: 0,
        h7P3Score: 0,
        h8P3Score: 0,
        h9P3Score: 0,
        h10P3Score: 0,
        h11P3Score: 0,
        h12P3Score: 0,
        h13P3Score: 0,
        h14P3Score: 0,
        h15P3Score: 0,
        h16P3Score: 0,
        h17P3Score: 0,
        h18P3Score: 0
      })
    };

    const removeSessionStorageP3Name = () => {
      window.sessionStorage.removeItem('member3_id');
      setMember3Selected(false)
      window.sessionStorage.removeItem('p3MemberSelected')
      setMember3Id(null);
    };

    const toP3NextHole = () => {
      if(p3HoleIndex+1 <= 18){
        sessionStorage.setItem('p3HoleIndex', p3HoleIndex + 1)
        setP3HoleIndex(p3HoleIndex+1)
      }
    }
    const toP3PrevHole = () => {
      if(p3HoleIndex+1 > 1){
        sessionStorage.setItem('p3HoleIndex', p3HoleIndex - 1)
        setP3HoleIndex(p3HoleIndex-1)
      }
    }

    const onChangeP3ScoreCard = (e) => {
      const { value, name } = e.target;
      window.sessionStorage.setItem(name, value)
      setp3ScoreCardObj((previousp3ScoreCardObj) => {
        return {
          ...previousp3ScoreCardObj,
          [name]: value
        };
      });
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const onChangeMember3 = (event) => {
      const { value, name } = event.target;
      setMember3Id(value);
      setMember3Selected(true)
      window.sessionStorage.setItem(name, value);
      window.sessionStorage.setItem('member3_id', value);
      window.sessionStorage.setItem('p3MemberSelected', true)
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const updateP3ScoreCard = () => {
      toP3NextHole();
      const eventId = props.event.id;
      const memberId = member3Id.split(" ")[0];
      const scoreCardUpdate = ({
        "h1Score" : sessionStorage.getItem('h1P3Score') ? sessionStorage.getItem('h1P3Score') : 0,
        "h2Score" : sessionStorage.getItem('h2P3Score') ? sessionStorage.getItem('h2P3Score') : 0,
        "h3Score" : sessionStorage.getItem('h3P3Score') ? sessionStorage.getItem('h3P3Score') : 0,
        "h4Score" : sessionStorage.getItem('h4P3Score') ? sessionStorage.getItem('h4P3Score') : 0,
        "h5Score" : sessionStorage.getItem('h5P3Score') ? sessionStorage.getItem('h5P3Score') : 0,
        "h6Score" : sessionStorage.getItem('h6P3Score') ? sessionStorage.getItem('h6P3Score') : 0,
        "h7Score" : sessionStorage.getItem('h7P3Score') ? sessionStorage.getItem('h7P3Score') : 0,
        "h8Score" : sessionStorage.getItem('h8P3Score') ? sessionStorage.getItem('h8P3Score') : 0,
        "h9Score" : sessionStorage.getItem('h9P3Score') ? sessionStorage.getItem('h9P3Score') : 0,
        "h10Score" : sessionStorage.getItem('h10P3Score') ? sessionStorage.getItem('h10P3Score') : 0,
        "h11Score" : sessionStorage.getItem('h11P3Score') ? sessionStorage.getItem('h11P3Score') : 0,
        "h12Score" : sessionStorage.getItem('h12P3Score') ? sessionStorage.getItem('h12P3Score') : 0,
        "h13Score" : sessionStorage.getItem('h13P3Score') ? sessionStorage.getItem('h13P3Score') : 0,
        "h14Score" : sessionStorage.getItem('h14P3Score') ? sessionStorage.getItem('h14P3Score') : 0,
        "h15Score" : sessionStorage.getItem('h15P3Score') ? sessionStorage.getItem('h15P3Score') : 0,
        "h16Score" : sessionStorage.getItem('h16P3Score') ? sessionStorage.getItem('h16P3Score') : 0,
        "h17Score" : sessionStorage.getItem('h17P3Score') ? sessionStorage.getItem('h17P3Score') : 0,
        "h18Score" : sessionStorage.getItem('h18P3Score') ? sessionStorage.getItem('h18P3Score') : 0,
      
      })
      setPendingApiCall(true)
      apiCalls
      .updateScore(eventId, memberId, p1HoleIndex + 1, scoreCardUpdate)
      .then(
        setPendingApiCall(false),
      )
      .catch((apiError) => {
        setPendingApiCall(false)
      })
      
    }
  
    


  // Player 4 setup
    const [p4HoleIndex, setP4HoleIndex] = useState(sessionStorage.getItem('p4HoleIndex') ? sessionStorage.getItem('p4HoleIndex') : 0);
    const [member4Id, setMember4Id] = useState(sessionStorage.getItem('member4_id') ? sessionStorage.getItem('member4_id') : null);
    const [member4Selected, setMember4Selected] = useState(sessionStorage.getItem('p4MemberSelected') ? true : false);
    const p4ScoreAddOne = () => {
      let score = parseInt(window.sessionStorage.getItem(`h${p4HoleIndex+1}P4Score`));
      let newScore = score + 1;
      window.sessionStorage.setItem(`h${p4HoleIndex+1}P4Score`, newScore);
    }
  
    const p4ScoreTakeOne = () => {
      let score = parseInt(window.sessionStorage.getItem(`h${p4HoleIndex+1}P4Score`));
      let newScore = score - 1;
      window.sessionStorage.setItem(`h${p4HoleIndex+1}P4Score`, newScore);
    }
  
    const [p4ScoreCardObj, setp4ScoreCardObj] = useState({
      h1P4Score: 0,
      h2P4Score: 0,
      h3P4Score: 0,
      h4P4Score: 0,
      h5P4Score: 0,
      h6P4Score: 0,
      h7P4Score: 0,
      h8P4Score: 0,
      h9P4Score: 0,
      h10P4Score: 0,
      h11P4Score: 0,
      h12P4Score: 0,
      h13P4Score: 0,
      h14P4Score: 0,
      h15P4Score: 0,
      h16P4Score: 0,
      h17P4Score: 0,
      h18P4Score: 0
    });

    const removeSessionStorageP4Name = () => {
      window.sessionStorage.removeItem('member4_id');
      setMember4Selected(false)
      window.sessionStorage.removeItem('p4MemberSelected')
      setMember4Id(null);
    };

    const removeSessionStorageP4Scores = () => {
      window.sessionStorage.removeItem('h1P4Score');
      window.sessionStorage.removeItem('h2P4Score');
      window.sessionStorage.removeItem('h3P4core');
      window.sessionStorage.removeItem('h4P4Score');
      window.sessionStorage.removeItem('h5P4Score');
      window.sessionStorage.removeItem('h6P4Score');
      window.sessionStorage.removeItem('h7P4Score');
      window.sessionStorage.removeItem('h8P4Score');
      window.sessionStorage.removeItem('h9P4Score');
      window.sessionStorage.removeItem('h10P4Score');
      window.sessionStorage.removeItem('h11P4Score');
      window.sessionStorage.removeItem('h12P4Score');
      window.sessionStorage.removeItem('h13P4Score');
      window.sessionStorage.removeItem('h13P4Score');
      window.sessionStorage.removeItem('h14P4Score');
      window.sessionStorage.removeItem('h15P4Score');
      window.sessionStorage.removeItem('h16P4Score');
      window.sessionStorage.removeItem('h17P4Score');
      window.sessionStorage.removeItem('h18P4Score');
      setp4ScoreCardObj({
        h1P4Score: 0,
        h2P4Score: 0,
        h3P4Score: 0,
        h4P4Score: 0,
        h5P4Score: 0,
        h6P4Score: 0,
        h7P4Score: 0,
        h8P4Score: 0,
        h9P4Score: 0,
        h10P4Score: 0,
        h11P4Score: 0,
        h12P4Score: 0,
        h13P4Score: 0,
        h14P4Score: 0,
        h15P4Score: 0,
        h16P4Score: 0,
        h17P4Score: 0,
        h18P4Score: 0
      })
    };

    const toP4NextHole = () => {
      if(p4HoleIndex+1 <= 18){
        sessionStorage.setItem('p4HoleIndex', p4HoleIndex + 1)
        setP4HoleIndex(p4HoleIndex+1)
      }
    }
    const toP4PrevHole = () => {
      if(p4HoleIndex+1 > 1){
        sessionStorage.setItem('p4HoleIndex', p4HoleIndex - 1)
        setP4HoleIndex(p4HoleIndex-1)
      }
    }

    const onChangeP4ScoreCard = (e) => {
    const { value, name } = e.target;
    window.sessionStorage.setItem(name, value)
    setp4ScoreCardObj((previousp4ScoreCardObj) => {
      return {
        ...previousp4ScoreCardObj,
        [name]: value
      };
    });
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined
      };
    });
    }

    const onChangeMember4 = (event) => {
      const { value, name } = event.target;
      setMember4Id(value);
      setMember4Selected(true)
      window.sessionStorage.setItem(name, value);
      window.sessionStorage.setItem('member4_id', value);
      window.sessionStorage.setItem('p4MemberSelected', true)
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }
  
    const updateP4ScoreCard = () => {
      toP4NextHole();
        const eventId = props.event.id;
        const memberId = member4Id.split(" ")[0];
        const scoreCardUpdate = ({
          "h1Score" : sessionStorage.getItem('h1P4Score') ? sessionStorage.getItem('h1P4Score') : 0,
          "h2Score" : sessionStorage.getItem('h2P4Score') ? sessionStorage.getItem('h2P4Score') : 0,
          "h3Score" : sessionStorage.getItem('h3P4Score') ? sessionStorage.getItem('h3P4Score') : 0,
          "h4Score" : sessionStorage.getItem('h4P4Score') ? sessionStorage.getItem('h4P4Score') : 0,
          "h5Score" : sessionStorage.getItem('h5P4Score') ? sessionStorage.getItem('h5P4Score') : 0,
          "h6Score" : sessionStorage.getItem('h6P4Score') ? sessionStorage.getItem('h6P4Score') : 0,
          "h7Score" : sessionStorage.getItem('h7P4Score') ? sessionStorage.getItem('h7P4Score') : 0,
          "h8Score" : sessionStorage.getItem('h8P4Score') ? sessionStorage.getItem('h8P4Score') : 0,
          "h9Score" : sessionStorage.getItem('h9P4Score') ? sessionStorage.getItem('h9P4Score') : 0,
          "h10Score" : sessionStorage.getItem('h10P4Score') ? sessionStorage.getItem('h10P4Score') : 0,
          "h11Score" : sessionStorage.getItem('h11P4Score') ? sessionStorage.getItem('h11P4Score') : 0,
          "h12Score" : sessionStorage.getItem('h12P4Score') ? sessionStorage.getItem('h12P4Score') : 0,
          "h13Score" : sessionStorage.getItem('h13P4Score') ? sessionStorage.getItem('h13P4Score') : 0,
          "h14Score" : sessionStorage.getItem('h14P4Score') ? sessionStorage.getItem('h14P4Score') : 0,
          "h15Score" : sessionStorage.getItem('h15P4Score') ? sessionStorage.getItem('h15P4Score') : 0,
          "h16Score" : sessionStorage.getItem('h16P4Score') ? sessionStorage.getItem('h16P4Score') : 0,
          "h17Score" : sessionStorage.getItem('h17P4Score') ? sessionStorage.getItem('h17P4Score') : 0,
          "h18Score" : sessionStorage.getItem('h18P4Score') ? sessionStorage.getItem('h18P4Score') : 0,
        
        })
        setPendingApiCall(true)
        apiCalls
        .updateScore(eventId, memberId, p1HoleIndex + 1, scoreCardUpdate)
        .then(
          setPendingApiCall(false),
        )
        .catch((apiError) => {
          setPendingApiCall(false)
        })
        
    }


  

    return (
        <Modal 
          show={props.showAdminScore} 
          onHide={props.handleCloseAdminScoreEntry} 
          dialogClassName="modal-content-full modal-dialog-full"
          size="m"
          
        >
          <Modal.Header closeButton>
            <Modal.Title id='scoreEntryModal'>
              <Container>
              Score Entry 
              <p style={{color:"red", fontSize:"13px", width:"140%"}}>Please enter gross scores</p>
              </Container>
            </Modal.Title>
          </Modal.Header>
          {pendingApicall && 
          <Modal.Body>
          <Spinner></Spinner>
          </Modal.Body>
          }

          {/* Player 1 admin score entry */}
          {!props.pendingApiCall &&
          <Modal.Body>
          {props.pendingApiCall && <Spinner></Spinner>}
            {!props.pendingApiCall && props.members &&
              <div className="container">
              <Row>
               {/* If no member is saved in storage */}
                {window.sessionStorage.getItem('member1_id') === null &&
                <div className="col-6 mb-3">
                    <label>Player 1</label>
                    <select  
                      name="member1_id" 
                      id="member1_id" 
                      className={`form-control ${member1Selected ? "is-valid" : "is-invalid"} mt-4`}  
                      label="Member1" placeholder="select" 
                      onChange={onChangeMember1} 
                      required
                    >
                        <option selected disabled value="">Please select</option>
                        {props.members[0].id && props.members.map((member) =>  (
                        <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                        ))};
                    </select>
                    <div id="member1_idFeedback" className="invalid-feedback">
                        Please select a member. 
                    </div>
                </div>}
                {/* If  member is saved in storage */}
                {window.sessionStorage.getItem('member1_id') !== null &&
                <div className="col-6 mb-3">
                    <label>Player 1</label>
                    <p style={{fontSize:"24px", margin:"15px auto"}}>{window.sessionStorage.getItem('member1_id').substring(window.sessionStorage.getItem('member1_id').indexOf(' ') + 1)}</p>
                    <button onClick={removeSessionStorageP1Name} className='btn btn-primary ml-1' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                    <div id="member1_idFeedback" className="invalid-feedback">
                        Please select a member. 
                    </div>
                </div>}

                {member1Selected &&
                <div className="col-6 mb-3">
                <div id='score-entry'>
                    {/* If hole index is less than 19  */}
                    {p1HoleIndex < 19 &&
                    <Row>
                      <div className="col-4 mb-3">
                      {/* If not the first hole, allow to return to prev hole */}
                      {p1HoleIndex+1 !== 1 &&
                        <button onClick={toP1PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                      </div>
                      
                      <div className="col-4 mb-3">
                      <p style={{fontSize:"20px", textAlign:"center"}}>Hole {`${p1HoleIndex+1}`}</p>
                      </div>
                      <div className="col-4 mb-3">
                      {/* If the hole is less than 19, and the member has been selected, allow to update the score and move to next hole */}
                      {p1HoleIndex+1 !== 19 && member1Id &&
                        <button onClick={updateP1ScoreCard} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                      </div>
                    </Row>}

                    {/* If hole index is 19, then mark as complete */}
                        {p1HoleIndex+1 === 19 &&
                        <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                        <Row>
                        {/* <div className="col-4 mb-3">
                            <button 
                              onClick={p1ScoreTakeOne} 
                              style={{fontSize: "32px"}}>{'-'}
                            </button>
                        </div> */}
                        <div className="col-4"></div>
                        <div className="col-4 mb-3">
                            <input className='scoreInput' 
                              name={`h${p1HoleIndex+1}P1Score`} 
                              value={window.sessionStorage.getItem(`h${p1HoleIndex+1}P1Score`) ? window.sessionStorage.getItem(`h${p1HoleIndex+1}P1Score`) : '' }  
                              onChange={onChangeP1ScoreCard} 
                              type="number" 
                              min={"0"} 
                              max={"15"} 
                            />
                        </div>
                        <div className="col-4"></div>
                        {/* <div className="col-4 mb-3">
                            <button  onClick={p1ScoreAddOne} style={{fontSize:"32px"}}> {'+'}</button>
                        </div> */}
                        </Row>
                        <Row>
                        <button onClick={removeSessionStorageP1Scores} className='btn btn-primary ml-4'>Reset scores</button>
                      </Row>
                    </div>
                </div>}
                </Row>
              </div>}
          </Modal.Body>}

            {/* Player 2 admin score entry */}
            {!props.pendingApiCall &&
    <Modal.Body>
    {props.pendingApiCall && <Spinner></Spinner>}
      {!props.pendingApiCall && props.members &&
        <div className="container">
        <Row>
         {/* If no member is saved in storage */}
          {window.sessionStorage.getItem('member2_id') === null &&
          <div className="col-6 mb-3">
              <label>Player 2</label>
              <select  
                name="member2_id" 
                id="member2_id" 
                className={`form-control ${member2Selected ? "is-valid" : "is-invalid"} mt-4`}  
                label="Member2" placeholder="select" 
                onChange={onChangeMember2} 
                required
              >
                  <option selected disabled value="">Please select</option>
                  {props.members[0].id && props.members.map((member) =>  (
                  <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                  ))};
              </select>
              <div id="member2_idFeedback" className="invalid-feedback">
                  Please select a member. 
              </div>
          </div>}
          {/* If  member is saved in storage */}
          {window.sessionStorage.getItem('member2_id') !== null &&
          <div className="col-6 mb-3">
              <label>Player 2</label>
              <p style={{fontSize:"24px", margin:"15px auto"}}>{window.sessionStorage.getItem('member2_id').substring(window.sessionStorage.getItem('member2_id').indexOf(' ') + 1)}</p>
              <button onClick={removeSessionStorageP2Name} className='btn btn-primary ml-1' style={{position:"absolute", bottom:"0"}}>Choose another</button>
              <div id="member2_idFeedback" className="invalid-feedback">
                  Please select a member. 
              </div>
          </div>}

          {member2Selected &&
          <div className="col-6 mb-3">
          <div id='score-entry2'>
              {/* If hole index is less than 19  */}
              {p2HoleIndex < 19 &&
              <Row>
                <div className="col-4 mb-3">
                {/* If not the first hole, allow to return to prev hole */}
                {p2HoleIndex+1 !== 1 &&
                  <button onClick={toP2PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                </div>
                
                <div className="col-4 mb-3">
                <p style={{fontSize:"20px", textAlign:"center"}}>Hole {`${p2HoleIndex+1}`}</p>
                </div>
                <div className="col-4 mb-3">
                {/* If the hole is less than 19, and the member has been selected, allow to update the score and move to next hole */}
                {p2HoleIndex+1 !== 19 && member2Id &&
                  <button onClick={updateP2ScoreCard} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                </div>
              </Row>}

              {/* If hole index is 19, then mark as complete */}
                  {p2HoleIndex+1 === 19 &&
                  <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                  <Row>
                  {/* <div className="col-4 mb-3">
                      <button 
                        onClick={p1ScoreTakeOne} 
                        style={{fontSize: "32px"}}>{'-'}
                      </button>
                  </div> */}
                  <div className="col-4"></div>
                  <div className="col-4 mb-3">
                      <input className='scoreInput' 
                        name={`h${p2HoleIndex+1}P2Score`} 
                        value={window.sessionStorage.getItem(`h${p2HoleIndex+1}P2Score`) ? window.sessionStorage.getItem(`h${p2HoleIndex+1}P2Score`) : '' }  
                        onChange={onChangeP2ScoreCard} 
                        type="number" 
                        min={"0"} 
                        max={"15"} 
                      />
                  </div>
                  <div className="col-4"></div>
                  {/* <div className="col-4 mb-3">
                      <button  onClick={p1ScoreAddOne} style={{fontSize:"32px"}}> {'+'}</button>
                  </div> */}
                  </Row>
                  <Row>
                  <button onClick={removeSessionStorageP2Scores} className='btn btn-primary ml-4'>Reset scores</button>
                </Row>
              </div>
          </div>}
          </Row>
        </div>}
    </Modal.Body>}

          {/* Player 3 admin score entry */}
          {!props.pendingApiCall &&
    <Modal.Body>
    {props.pendingApiCall && <Spinner></Spinner>}
      {!props.pendingApiCall && props.members &&
        <div className="container">
        <Row>
         {/* If no member is saved in storage */}
          {window.sessionStorage.getItem('member3_id') === null &&
          <div className="col-6 mb-3">
              <label>Player 3</label>
              <select  
                name="member3_id" 
                id="member3_id" 
                className={`form-control ${member3Selected ? "is-valid" : "is-invalid"} mt-4`}  
                label="Member3" placeholder="select" 
                onChange={onChangeMember3} 
                required
              >
                  <option selected disabled value="">Please select</option>
                  {props.members[0].id && props.members.map((member) =>  (
                  <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                  ))};
              </select>
              <div id="member3_idFeedback" className="invalid-feedback">
                  Please select a member. 
              </div>
          </div>}
          {/* If  member is saved in storage */}
          {window.sessionStorage.getItem('member3_id') !== null &&
          <div className="col-6 mb-3">
              <label>Player 3</label>
              <p style={{fontSize:"24px", margin:"15px auto"}}>{window.sessionStorage.getItem('member3_id').substring(window.sessionStorage.getItem('member3_id').indexOf(' ') + 1)}</p>
              <button onClick={removeSessionStorageP3Name} className='btn btn-primary ml-1' style={{position:"absolute", bottom:"0"}}>Choose another</button>
              <div id="member3_idFeedback" className="invalid-feedback">
                  Please select a member. 
              </div>
          </div>}

          {member3Selected &&
          <div className="col-6 mb-3">
          <div id='score-entry3'>
              {/* If hole index is less than 19  */}
              {p3HoleIndex < 19 &&
              <Row>
                <div className="col-4 mb-3">
                {/* If not the first hole, allow to return to prev hole */}
                {p3HoleIndex+1 !== 1 &&
                  <button onClick={toP3PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                </div>
                
                <div className="col-4 mb-3">
                <p style={{fontSize:"20px", textAlign:"center"}}>Hole {`${p3HoleIndex+1}`}</p>
                </div>
                <div className="col-4 mb-3">
                {/* If the hole is less than 19, and the member has been selected, allow to update the score and move to next hole */}
                {p3HoleIndex+1 !== 19 && member3Id &&
                  <button onClick={updateP3ScoreCard} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                </div>
              </Row>}

              {/* If hole index is 19, then mark as complete */}
                  {p3HoleIndex+1 === 19 &&
                  <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                  <Row>
                  {/* <div className="col-4 mb-3">
                      <button 
                        onClick={p1ScoreTakeOne} 
                        style={{fontSize: "32px"}}>{'-'}
                      </button>
                  </div> */}
                  <div className="col-4"></div>
                  <div className="col-4 mb-3">
                      <input className='scoreInput' 
                        name={`h${p3HoleIndex+1}P3Score`} 
                        value={window.sessionStorage.getItem(`h${p3HoleIndex+1}P3Score`) ? window.sessionStorage.getItem(`h${p3HoleIndex+1}P3Score`) : '' }  
                        onChange={onChangeP3ScoreCard} 
                        type="number" 
                        min={"0"} 
                        max={"15"} 
                      />
                  </div>
                  <div className="col-4"></div>
                  {/* <div className="col-4 mb-3">
                      <button  onClick={p1ScoreAddOne} style={{fontSize:"32px"}}> {'+'}</button>
                  </div> */}
                  </Row>
                  <Row>
                  <button onClick={removeSessionStorageP3Scores} className='btn btn-primary ml-4'>Reset scores</button>
                </Row>
              </div>
          </div>}
          </Row>
        </div>}
    </Modal.Body>}
          
          {/* Player 4 admin score entry */}
          {!props.pendingApiCall &&
    <Modal.Body>
    {props.pendingApiCall && <Spinner></Spinner>}
      {!props.pendingApiCall && props.members &&
        <div className="container">
        <Row>
         {/* If no member is saved in storage */}
          {window.sessionStorage.getItem('member4_id') === null &&
          <div className="col-6 mb-3">
              <label>Player 4</label>
              <select  
                name="member4_id" 
                id="member4_id" 
                className={`form-control ${member4Selected ? "is-valid" : "is-invalid"} mt-4`}  
                label="Member4" placeholder="select" 
                onChange={onChangeMember4} 
                required
              >
                  <option selected disabled value="">Please select</option>
                  {props.members[0].id && props.members.map((member) =>  (
                  <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                  ))};
              </select>
              <div id="member4_idFeedback" className="invalid-feedback">
                  Please select a member. 
              </div>
          </div>}
          {/* If  member is saved in storage */}
          {window.sessionStorage.getItem('member4_id') !== null &&
          <div className="col-6 mb-3">
              <label>Player 4</label>
              <p style={{fontSize:"24px", margin:"15px auto"}}>{window.sessionStorage.getItem('member4_id').substring(window.sessionStorage.getItem('member4_id').indexOf(' ') + 1)}</p>
              <button onClick={removeSessionStorageP4Name} className='btn btn-primary ml-1' style={{position:"absolute", bottom:"0"}}>Choose another</button>
              <div id="member4_idFeedback" className="invalid-feedback">
                  Please select a member. 
              </div>
          </div>}

          {member4Selected &&
          <div className="col-6 mb-3">
          <div id='score-entry4'>
              {/* If hole index is less than 19  */}
              {p4HoleIndex < 19 &&
              <Row>
                <div className="col-4 mb-3">
                {/* If not the first hole, allow to return to prev hole */}
                {p4HoleIndex+1 !== 1 &&
                  <button onClick={toP4PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                </div>
                
                <div className="col-4 mb-3">
                <p style={{fontSize:"20px", textAlign:"center"}}>Hole {`${p4HoleIndex+1}`}</p>
                </div>
                <div className="col-4 mb-3">
                {/* If the hole is less than 19, and the member has been selected, allow to update the score and move to next hole */}
                {p4HoleIndex+1 !== 19 && member4Id &&
                  <button onClick={updateP4ScoreCard} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                </div>
              </Row>}

              {/* If hole index is 19, then mark as complete */}
                  {p4HoleIndex+1 === 19 &&
                  <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                  <Row>
                  {/* <div className="col-4 mb-3">
                      <button 
                        onClick={p1ScoreTakeOne} 
                        style={{fontSize: "32px"}}>{'-'}
                      </button>
                  </div> */}
                  <div className="col-4"></div>
                  <div className="col-4 mb-3">
                      <input className='scoreInput' 
                        name={`h${p4HoleIndex+1}P4Score`} 
                        value={window.sessionStorage.getItem(`h${p4HoleIndex+1}P4Score`) ? window.sessionStorage.getItem(`h${p4HoleIndex+1}P4Score`) : '' }  
                        onChange={onChangeP4ScoreCard} 
                        type="number" 
                        min={"0"} 
                        max={"15"} 
                      />
                  </div>
                  <div className="col-4"></div>
                  {/* <div className="col-4 mb-3">
                      <button  onClick={p1ScoreAddOne} style={{fontSize:"32px"}}> {'+'}</button>
                  </div> */}
                  </Row>
                  <Row>
                  <button onClick={removeSessionStorageP4Scores} className='btn btn-primary ml-4'>Reset scores</button>
                </Row>
              </div>
          </div>}
          </Row>
        </div>}
    </Modal.Body>}

          
          <Modal.Footer>
            <Button variant='primary' onClick={props.adminUpdateScorecard}>Submit</Button>
          </Modal.Footer>
        </Modal>
    );
};

export default AdminScoreEntryModal;