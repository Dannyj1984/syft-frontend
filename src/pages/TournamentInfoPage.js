import React from 'react';
import * as apiCalls from '../api/apiCalls';
import TournamentProfileCard from '../components/TournamentProfileCard';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';

class TournamentInfoPage extends React.Component{

    state = {
        tournament: undefined,
        tournamentNotFound: false,
        isLoadingTournament: false,
        inEditMode: false,
        originalName: undefined,
        originalStartDate: undefined,
        originalEndDate: undefined,
        originalType: undefined,
        originalStatus: undefined,
        pendingUpdateCall: false,
        errors: {}
      };
      componentDidMount() {
        this.loadTournament();
        }
        componentDidUpdate(prevProps) {
          if (prevProps.match.params.tournamentname !== this.props.match.params.tournamentname) {
            this.loadTournament();
          }
        }

        loadTournament = () => {
          const tournamentName = this.props.match.params.tournamentname;
          if (!tournamentName) {
            return;
          }
          this.setState({ tournamentNotFound: false, isLoadingTournament: true });
          apiCalls
            .getTournament(tournamentName)
            .then((response) => {
              this.setState({ tournament: response.data, isLoadingTournament: false });
            })
            .catch((error) => {
              this.setState({
                tournamentNotFound: true,
                isLoadingTournament: false
              });
            });
        };

    onClickEdit = () => {
      this.setState({
        inEditMode: true
      });
    };
  
    onClickCancel = () => {
      const tournament = { ...this.state.tournament };
    if (this.state.originalName !== undefined) {
      tournament.name = this.state.originalName;}
      if (this.state.originalStartDate !== undefined) {
      tournament.startDate = this.state.originalStartDate;
      tournament.endDate = this.state.originalEndDate;
      tournament.type = this.state.originalType;
      tournament.status = this.state.originalStatus;
    }
      this.setState({
        tournament,
        errors: {},
        originalName: undefined,
        originalStartDate: undefined,
        originalEndDate: undefined,
        originalType: undefined,
        originalStatus: undefined,
        inEditMode: false
      });
    };

    onClickSave = () => {
      const tournament = { ...this.state.tournament };
      const tournamentId = tournament.id;
      const tournamentUpdate = {
        name: tournament.name,
        startDate: tournament.startDate,
        endDate: tournament.endDate,
        type: tournament.type,
        status: tournament.status
      };
      this.setState({ pendingUpdateCall: true });
    apiCalls
      .updateTournament(tournamentId, tournamentUpdate)
      .then((response) => {
        const tournament = { ...this.state.tournament };
        this.setState(
          {
            inEditMode: false,
            originalName: undefined,
            originalStartDate: undefined,
            originalEndDate: undefined,
            originalType:undefined,
            originalStatus:undefined,
            pendingUpdateCall: false,
            tournament
          },
        );
      })
      .catch((error) => {
        let errors = {};
        if (error.response.data.validationErrors) {
          errors = error.response.data.validationErrors;
        }
        this.setState({
          pendingUpdateCall: false,
          errors
        });
       });
    };
  
    onChangeTournamentName = (event) => {
      const tournament = { ...this.state.tournament };
      let originalName = this.state.originalName;
    if (originalName === undefined) {
        originalName = tournament.name;
    }
      tournament.name = event.target.value;
      const errors = { ...this.state.errors };
      errors.name = undefined;
      this.setState({ tournament, originalName, errors });
    };

    onChangeStartDate = (event) => {
      const tournament = { ...this.state.tournament };
      let originalStartDate = this.state.originalStartDate;
    if (originalStartDate === undefined) {
        originalStartDate = tournament.startDate;
    }
      tournament.startDate = event.target.value;
      const errors = { ...this.state.errors };
      errors.startDate = undefined;
      this.setState({ tournament, originalStartDate, errors });
    };

    onChangeEndDate = (event) => {
      const tournament = { ...this.state.tournament };
      let originalEndDate = this.state.originalEndDate;
    if (originalEndDate === undefined) {
        originalEndDate = tournament.endDate;
    }
      tournament.endDate = event.target.value;
      const errors = { ...this.state.errors };
      errors.endDate = undefined;
      this.setState({ tournament, originalEndDate, errors });
    };

    onChangeType = (event) => {
      const tournament = { ...this.state.tournament };
      let originalType = this.state.originalType;
    if (originalType === undefined) {
        originalType = tournament.type;
    }
      tournament.type = event.target.value;
      const errors = { ...this.state.errors };
      errors.type = undefined;
      this.setState({ tournament, originalType, errors });
    };

    onChangeStatus = (event) => {
      const tournament = { ...this.state.tournament };
      let originalStatus = this.state.originalStatus;
    if (originalStatus === undefined) {
        originalStatus = tournament.status;
    }
      tournament.status = event.target.value;
      const errors = { ...this.state.errors };
      errors.status = undefined;
      this.setState({ tournament, originalStatus, errors });
    };
    
    render() {
      
    let pageContent;
    if (this.state.isLoadingTournament) {
      pageContent = (
        <Spinner></Spinner>
      );
    } else if (this.state.tournamentNotFound) {
      pageContent = (
          <div className="alert alert-danger text-center">
            <div className="alert-heading">
              <i className="fas fa-exclamation-triangle fa-3x" />
            </div>
            <h5>Tournament not found</h5>
          </div>
        );
      } else {
        const isEditable = true
        pageContent = this.state.tournament && (
          <TournamentProfileCard
          tournament={this.state.tournament}
          isEditable={isEditable}
          inEditMode={this.state.inEditMode}
          onClickEdit={this.onClickEdit}
          onClickCancel={this.onClickCancel}
          onClickSave={this.onClickSave}
          onChangeTournamentName={this.onChangeTournamentName}
          onChangeStartDate = {this.onChangeStartDate}
          onChangeEndDate = {this.onChangeEndDate}
          onChangeType = {this.onChangeType}
          onChangeStatus={this.onChangeStatus}
          pendingUpdateCall={this.state.pendingUpdateCall}
          errors={this.state.errors}
        />
      );
      }
      return <div data-testid="coursepage">{pageContent}</div>;
    }
}

TournamentInfoPage.defaultProps = {
    match: {
      params: {}
    },
    history: {
      push: () => {}
  }
  };

  const mapStateToProps = (state) => {
    return {
      loggedInUser: state
    };
  };
  
  export default connect(mapStateToProps)(TournamentInfoPage);  
