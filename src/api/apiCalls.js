import axios from 'axios';
//const url = 'https://glacial-sierra-91195.herokuapp.com';

const url = 'http://localhost:8080';

//user calls

export const getWeather = (postcode, country) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${postcode},${country}&appid=8feabdd26e08ce9f20f50bf57d3caa22`)
}

export const signup = (user) => {
  return axios.post(url + `/api/1.0/management/member`, user);
};

export const login = (user) => {
  return axios.post(url + '/api/1.0/login', {}, { auth: user });
};

// export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
//   if (isLoggedIn) {
//     axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
//       username + ':' + password
//     )}`;
//   } else {
//     delete axios.defaults.headers.common['Authorization'];
//   }
// };

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
      axios.defaults.headers.common['Authorization'] = `Basic ${Buffer.from(username + ':' + password).toString('base64')
    }`
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const userCSV = (id) => {
  return axios.get(url + `/api/1.0/management/users/export/${id}`);
}

export const listUsers = (id, param = { page: 0, size: 9 }) => {
  const path = url + `/api/1.0/members/${id}?page=${param.page || 0}&size=${param.size || 9}&sort=username,asc`;
  return axios.get(path);
};

export const getMemberByFedExRanking = (societyId) => {
  const path = url + `/api/1.0/members/fedex/${societyId}`;
  return axios.get(path);
};


export const listFilteredUsers = (param = { page: 0, size: 9 }, id, nameFilter) => {
  const path = url + `/api/1.0/societyFilteredUsers/${id}?query=${nameFilter}&page=${param.page || 0}&size=${param.size || 9}&sort=username,asc`;
  return axios.get(path);
};

export const getUser = (username) => {
  return axios.get(url + `/api/1.0/member/${username}`);
};

export const getListOfMembers = (societyId) => {
  return axios.get(url + `/api/1.0/getMembers/${societyId}`);
};

export const updateUser = (userId, body) => {
  return axios.put(url + '/api/1.0/updateMember/' + userId, body);
};

export const deleteMember = (userid) => {
  return axios.delete(url + '/api/1.0/management/member/' + userid);
};

export const makeAdmin = (userid) => {
  return axios.put(url + '/api/1.0/management/users/admin/' + userid);
};

export const makeScorer = (userid) => {
  return axios.put(url + '/api/1.0/management/users/scorer/' + userid);
};

export const makeEventAdmin = (userid) => {
  return axios.put(url + '/api/1.0/management/users/EventAdmin/' + userid);
};

export const makeUser = (userid) => {
  return axios.put(url + '/api/1.0/management/users/User/' + userid);
};

export const updateHandicap = (userid, body) => {
  return axios.put(url + '/api/1.0/management/members/handicap/' + userid, body);
}

export const addWin = (userid) => {
  return axios.put(url + '/api/1.0/management/user/win/' + userid);
}

export const takeWin = (userid) => {
  return axios.put(url + '/api/1.0/management/user/' + userid);
}

export const changePassword = (userid, userpassword) => {
  return axios.put(url + '/api/1.0/member/passwordChange/' + userid, userpassword);
}

export const resetWins = (societyId) => {
  return axios.put(url + '/api/1.0/management/member/resetWins/' + societyId);
}

export const resetHcpReductions = (societyId) => {
  return axios.put(url + '/api/1.0/management/member/resetHcpRed/' + societyId);
}

export const randomiseEntrants = (eventId, perTee) => {
  const path = url + '/api/1.0/event/entrants/teesheet/' + eventId + '/' + perTee;
  return axios.put(path);
}

export const removeEntrantFromTeeSheet = (teeSheetId, memberId) => {
  return axios.delete(url + '/api/1.0/management/teeSheet/entrant/remove/' + teeSheetId + "/" + memberId);
}


//course calls

export const signupCourse = (societyId, course) => {
  return axios.post(url + `/api/1.0/management/course/${societyId}`, course);
};

//Getting courses for new event page dropdown list
export const getCourses = (id) => {
  return axios.get(url + `/api/1.0/getCourseList/` + id);
};

//Showing page of courses on course page
export const listCourses = (id, param = { page: 0, size: 9 }) => {
  const path = url + `/api/1.0/getCourses/${id}?page=${param.page || 0}&size=${param.size || 9}&sort=name,asc`;
  return axios.get(path);
};

//List of filtered courses
export const listFilteredCourses = (param = { page: 0, size: 9 }, id, nameFilter) => {
  const path = url + `/api/1.0/societyFilteredCourses/${id}?query=${nameFilter}&page=${param.page || 0}&size=${param.size || 9}&sort=name,asc`;
  return axios.get(path);
};
  
export const getCourse = (courseName) => {
  return axios.get(url + `/api/1.0/course/${courseName}`);
};

export const updateCourse = (courseId, body) => {
  return axios.put(url + '/api/1.0/management/courses/' + courseId, body);
};

export const deleteCourse = (courseId) => {
  return axios.delete(url + '/api/1.0/management/courses/delete/' + courseId);
};

export const addHoleDetails = (courseId, list) => {
  return axios.post(url + `/api/1.0/management/hole/${courseId}`, list);
};

export const getCourseHoles = (courseId)=> {
  return axios.get(url + `/api/1.0/hole/${courseId}`)
};

export const deleteHole = (holeId) => {
const path = url + `/api/1.0/management/hole/${holeId}`;
  return axios.delete(path);
}

//Event calls

export const signupEvent = (event, societyId, courseId) => {
  return axios.post(url + '/api/1.0/management/event/'+societyId+'/'+courseId, event);
};

export const listEvents = (id, param = { page: 0, size: 9 }) => {
  const path = url + `/api/1.0/upcomingEvents/${id}?page=${param.page || 0}&size=${param.size || 9}&sort=date,asc`;
  return axios.get(path);
};

export const listPreviousEvents = (id, param = { page: 0, size: 9 }) => {
  const path = url + `/api/1.0/previousEvents/${id}?page=${param.page || 0}&size=${param.size || 9}&sort=date,desc`;
  return axios.get(path); 
};
  
export const getEvent = (eventname) => {
  return axios.get(url + `/api/1.0/events/${eventname}`);
};

export const getEvents = (societyId) => {
  return axios.get(url + `/api/1.0/Events/list/${societyId}`);
};

export const updateEvent = (eventId, body) => {
  return axios.put(url + '/api/1.0/management/event/' + eventId, body);
};

export const completeEvent = (eventId) => {
  return axios.put(url + `/api/1.0/management/complete/${eventId}`);
};

export const updateTeeSheetCall = (teeSheetId, body) => {
  return axios.put(url + '/api/1.0/management/events/teesheet/update/' + teeSheetId, body);
};

export const updateTeeSheetEntrant = (teeSheetId, newId, oldId) => {
  return axios.put(url + '/api/1.0/management/teeSheet/update/' + teeSheetId + "/" + newId + "/" + oldId);
}

export const deleteTeeSheet = (teeSheetId) => {
  return axios.delete(url + '/api/1.0/management/teeSheet/' + teeSheetId);
};

export const deleteEvent = (eventId) => {
  return axios.delete(url + '/api/1.0/management/event/' + eventId);
};

export const getCourseDetails = (eventid) => {
  return axios.get(url + '/api/1.0/management/events/courseDetails/' + eventid);
}

export const eventEnter = (eventid, memberid) => {
  return axios.post(url + '/api/1.0/management/events/entrants/' + eventid + '/' + memberid);
}

export const getTeesheet = (eventid) => {
  return axios.get(url + '/api/1.0/teeSheets/'+ eventid);
}

export const getSingleTeesheet = (teesheetid) => {
  return axios.get(url + '/api/1.0/teeSheet/'+ teesheetid);
}

export const createTeeSheet = (eventid, body) => {
  return axios.post(url + '/api/1.0/management/teeSheet/' + eventid, body);
}

//Add event entrant
export const addEntrant = (eventid, memberid) => {
  const path = url + '/api/1.0/entrants/' + eventid + '/'+ memberid;
  return axios.post(path);
}

//Get event entrants
export const getEntrants = (eventid) => {
  return axios.get(url + '/api/1.0/entrants/' + eventid);
}

//Remove entrant from event
export const removeEntrant = (eventid, memberid) => {
  const path = url + '/api/1.0/event/entrants/' + eventid + '/'+ memberid;
  return axios.delete(path);
}

//Update an entrants score for scorecard
export const updateScore = (eventid, memberid, currentHole, score) => {
  const path = url + `/api/1.0/event/entrants/scorecard/${eventid}/${memberid}/${currentHole}`;
  return axios.put(path, score);
}

export const updateEntrantScore = async(eventId, memberId, score) => {
  return await axios.put(`/api/1.0/updateScore/${eventId}/${memberId}/${score}`)
}

//Get a list of previous events for a single entrant for profile card
export const getPreviousEventsForEntrant = (memberid) => {
  return axios.get(url + '/api/1.0/event/getPreviousEventsForEntrant/' + memberid);
}

//Get a list of future events for a single entrant for profile card
export const getUpcomingEventsForEntrant = (memberid) => {
  return axios.get(url + '/api/1.0/event/getUpcomingEventsForEntrant/' + memberid);
}

//Society calls

export const signupSociety = (society) => {
  return axios.post(url + '/api/1.0/management/society', society);
};

//tournament calls

export const createTournament = (societyId, tournament) => {
  return axios.post(url + '/api/1.0/management/tournament/create/' + societyId, tournament);
};

export const tournamentPage = (societyId, param = { page: 0, size: 9 }) => {
  const path = url + `/api/1.0/tournaments/${societyId}?page=${param.page || 0}&size=${param.size || 9}&sort=start_date,asc`;
 
  return axios.get(path);
};

export const getTournament = (tournamentName) => {
  const path = url + `/api/1.0/tournament/${tournamentName}`;
  return axios.get(path)
}

export const previousTournamentPage = (id, param = { page: 0, size: 9 }) => {
  const path = url + `/api/1.0/tournament/previous/${id}?page=${param.page || 0}&size=${param.size || 9}&sort=start_date,desc`;
  return axios.get(path);
};

export const tournamentList = (id) => {
  const path = url + `/api/1.0/tournament/list/${id}`;
  return axios.get(path);
};

export const deleteTournament = (id) => {
  const path = url + `/api/1.0/management/tournament/delete/${id}`;
  return axios.get(path);
};

export const completeTournament = (id) => {
  const path = url + `/api/1.0/management/tournament/complete/${id}`;
  return axios.put(path);
};

export const enterTournamentEntrant = (tournamentId, memberId) => {
  const path = url + `/api/1.0/tournament/entrants/${tournamentId}/${memberId}`;
  return axios.post(path);
};

export const removeTournamentEntrant = (tournamentId, memberId) => {
  const path = url + `/api/1.0/tournament/entrants/${memberId}/${tournamentId}`;
  return axios.delete(path);
};

export const getTournamentEntrants = (tournamentId) => {
  const path = url + `/api/1.0/tournament/entrants/${tournamentId}`;
  return axios.get(path);
};

export const removeEventFromTournament = (tournamentId, eventId) => {
  const path = url + `/api/1.0/management/tournament/removeEvent/${tournamentId}/${eventId}`;
  return axios.put(path);
}

export const addEvent = (tournamentId, eventId) => {
  const path = url + `/api/1.0/management/tournament/addEvent/${tournamentId}/${eventId}`;
  return axios.put(path);
}

export const updateTournament = (tournamentId, tournamentUpdate) => {
  return axios.put(url + '/api/1.0/management/tournament/update/' + tournamentId, tournamentUpdate);
}

//Matchplay calls

export const getMatchplays = async () => {
  return  await axios.get(url + '/api/1.0/matchPlays');
}

export const createMatchplayGroups = async (matchplayId) => {
  return await axios.put(url + '/api/1.0/management/matchplay/groups/' + matchplayId)
}

export const getMatches = async (matchplayId) => {
  return await axios.get(url + `/api/1.0/matchplay/rounds/${matchplayId}`)
}

export const updateScores =  (matchPlayId, roundRobinId, p1Score, p2Score) => {
  const path = url + `/api/1.0/matchplay/scores/${roundRobinId}/${matchPlayId}/${p1Score}/${p2Score}`
  return axios.put(path)
}

export const completeGroups = async(matchPlayId) => {
  const path = url + `/api/1.0/matchplay/complete/groups/${matchPlayId}`
  
  return await axios.put(path);
}

export const getSemiFinals = async(matchPlayId) => {
  const path = url + `/api/1.0/matchplay/getSemis/${matchPlayId}`
  
  return await axios.get(path);
}

export const updateSemiScores = async(matchPlayId, player1, player2, p1Score, p2Score) => {
  const path = url + `/api/1.0/matchplay/semiScores/${matchPlayId}/${player1}/${player2}/${p1Score}/${p2Score}`
  
  return await axios.put(path)
}

export const updateFinalScores = async(matchPlayId, player1, player2, p1Score, p2Score) => {
  const path = url + `/api/1.0/matchplay/finalScores/${matchPlayId}/${player1}/${player2}/${p1Score}/${p2Score}`
  
  return await axios.put(path)
}

export const getFinals = async(matchPlayId) => {
  const path = url + `/api/1.0/matchplay/getFinals/${matchPlayId}`
  
  return await axios.get(path);
}




