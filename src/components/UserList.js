import React, { useState, useEffect } from "react";
import * as apiCalls from '../api/apiCalls';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import ExportCSV from "./ExportCSV";
import Input from './Input';
import Spinner from './Spinner';

export const UserList = (props) => {
  const [page, setPage] = useState({
    content: [],
    number: 0,
    size: 9
  });

  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [showMembers, setShowMembers] = useState(true);
  const [showReductions, setShowReductions] = useState(false);


  //Name filter when filtering users
  const [nameFilter, setNameFilter] = useState('');

  const clearFilter = () => {
    setNameFilter('')
    loadData()
  }
  

  const [loadError, setLoadError] = useState();

  //Change filter value
  const onChange = (event) => {
  const { value } = event.target;

  
  setNameFilter(value)
  
  loadFilter()
}

const loadFilter = async (requestedPage = 0) => {
  let name = nameFilter
  let id = props.user.society.id 
  setPendingApiCall(true);
  await apiCalls
     .listFilteredUsers({ page: requestedPage, size: 9 }, id, name.toLowerCase())
     .then ((response)  => {
      setPage(response.data);
      if(Object.entries(response.data.content).length === 0) {
        setLoadError('No members');
      }
    })
    .catch((error) => {
      setLoadError("Member load failed" );
    });
    setPendingApiCall(false);
};

const loadUsersWithReduction = (requestedPage = 0) => {
  let id = props.user.society.id;
  setPendingApiCall(true);
  apiCalls
    .listUsersWithReduction(id, { page: requestedPage, size: 9 })
    .then((response) => {
      setPendingApiCall(false);
      setPage(response.data);
      setLoadError();
      setShowMembers(false);
      setShowReductions(true)
    })
    .catch((error) => {
      setLoadError("User load failed")
      setPendingApiCall(false)
    });
};

  const loadData = (requestedPage = 0) => {
    let id = props.user.society.id  
    setPendingApiCall(true)
    apiCalls
      .listUsers(id, { page: requestedPage, size: 9 })
      .then((response) => {
        setPage(response.data);
        console.log(response.data)
        setLoadError();
        setShowMembers(true);
        setShowReductions(false)
        setPendingApiCall(false)
      })
      .catch((error) => {
        setLoadError("User load failed" );
        setPendingApiCall(false)
      });
  };

  useEffect(() => {
    loadFilter();
  }, []);

  const onClickNext = () => {
    loadData(page.number + 1);
  };

  const onClickPrevious = () => {
    loadData(page.number - 1);
  };

  const { content, first, last } = page;
  

  return (

    <div>
      {(props.user.role === 'SUPERUSER' || props.user.role === 'ADMIN') &&
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="row">
              <Input name="nameFilter" value={nameFilter} type="text" placeholder="Search by firstname" onChange={onChange} />
              <button className="btn btn-primary" style={{'margin':'10px'}} onClick={clearFilter} >Clear</button>
            </div>
          </div>
          <div className="col-sm">
            <h3 className="card-title m-auto text-center">Members</h3>
          </div>
          
          <div className="col-sm">
            <ExportCSV />
            {showMembers &&
            <button 
              className="btn btn-primary" 
              onClick={loadUsersWithReduction}>Society reduction only
            </button>}
            {showReductions &&
            <button 
              className="btn btn-primary" 
              style={{'margin':'6px'}}
              onClick={loadFilter}>Members
            </button>}
          </div>
        </div>
      </div>}
      
      <hr />
      {pendingApiCall &&
        <Spinner></Spinner>}
      {!pendingApiCall && 
      <div>
        <div className="list-group list-group-flush" data-testid="usergroup">
          <div className="row">
            {content.map((user) => (
              <div key={user.id} className="col-xl-4 col-m-12 mb-4">
                <UserListItem
                  user={user}
                  onClickDeleteMember={() => {
                    apiCalls.deleteMember(user.id);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="clearfix">
          {!first && (
            <span className="badge badge-light float-left" style={{ cursor: "pointer" }} onClick={onClickPrevious}>
              <button className="btn btn-primary">Previous</button>
            </span>
          )}
          {!last && (
            <span className="badge badge-light float-right" style={{ cursor: "pointer" }} onClick={onClickNext}>
              <button className="btn btn-primary">Next</button>
            </span>
          )}
        </div>
        {loadError && <span className="text-center text-danger">{loadError}</span>}
    </div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state
  };
};

export default connect(mapStateToProps)(UserList);



// import React from 'react';
// import * as apiCalls from '../api/apiCalls';
// import UserListItem from './UserListItem';

// class UserList extends React.Component {
//   state = {
//     user: undefined,
//     loggedInUser: undefined,
//     userNotFound: true,
//     loadError: undefined,
//     page: {
//       content: [],
//       number: 0,
//       size: 9
//     }
//   };
  
//   componentDidMount() {
//     this.loadData();
//   }

//   loadData = (requestedPage = 0) => {
//     apiCalls
//       .listUsers({ page: requestedPage, size: this.state.page.size })
//       .then((response) => {
//         this.setState({
//           page: response.data,
//           loadError: undefined
//         });
//       })
//       .catch((error) => {
//         this.setState({ loadError: 'User load failed' });
//       });
//     };


//     onClickNext = () => {
//       this.loadData(this.state.page.number + 1);
//     };
  
//     onClickPrevious = () => {
//       this.loadData(this.state.page.number - 1);
//     };

//   render() {
//     return (
//       <div >
//         <h3 className="card-title m-auto text-center">Members</h3>
//         <hr></hr>
//         <div className="list-group list-group-flush" data-testid="usergroup">
//           <div className="row">
//           {this.state.page.content.map((user) => (
//               <div key={user.id} className="col-xl-4 col-m-12 mb-4">
//               <UserListItem user={user} onClickDeleteMember= { () => {apiCalls.deleteMember(user.id)}}  />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="clearfix">
//           {!this.state.page.first && (
//             <span
//               className="badge badge-light float-left"
//               style={{ cursor: 'pointer' }}
//               onClick={this.onClickPrevious}
//             ><button className="btn btn-primary">Previous</button></span>
//           )}
//           {!this.state.page.last && (
//             <span
//               className="badge badge-light float-right"
//               style={{ cursor: 'pointer' }}
//               onClick={this.onClickNext}
//             >
//               <button className="btn btn-primary">Next</button>
//             </span>
//           )}
//         </div>
//         {this.state.loadError && (
//           <span className="text-center text-danger">
//             {this.state.loadError}
//           </span>
//         )}
//       </div>
//     );
//   }
// }

// export default UserList;
