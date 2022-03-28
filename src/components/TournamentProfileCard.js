import React, { useState, useEffect } from 'react';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import { connect } from 'react-redux';

const TournamentProfileCard = (props) => {

  const { name, status, type, startDate, endDate, id } = props.tournament;

  const showEditButton = props.isEditable && !props.inEditMode;

  
  let formatStartDate = new Date(startDate).toString().substring(0,15)
  let formatEndDate = new Date(endDate).toString().substring(0,15)
  
  return (
    <div className="card">
      <div className="card-body text-center">
      {!props.inEditMode && 
      <h4>{`${name}`}</h4>}
      <h5>{`Start: ${formatStartDate}`}</h5>
      <h5>{`End: ${formatEndDate}`}</h5>
      <h5>{`Format: ${type}`}</h5>
      <h5>{`Status: ${status}`}</h5>
      <hr />
        {props.inEditMode && (  
          
          <div className="mb-2">
            <Input
              name="name"
              value={name}
              label={`Change tournament name for ${name}`}
              onChange={props.onChangeTournamentName}
              hasError={props.errors.name && true}
              error={props.errors.name}
            />
            <Input
              name="startDate"
              type="date"
              value={startDate}
              label={`Change start date for ${name}`}
              onChange={props.onChangeStartDate}
              hasError={props.errors.startDate && true}
              error={props.errors.startDate}
            />
            <Input
              name="endDate"
              type="date"
              value={endDate}
              label={`Change end date for ${name}`}
              onChange={props.onChangeEndDate}
              hasError={props.errors.endDate && true}
              error={props.errors.endDate}
            />
            <Input
              name="type"
              value={type}
              label={`Change format for ${name}`}
              onChange={props.onChangeType}
              hasError={props.errors.type && true}
              error={props.errors.type}
            />
            <Input
              name="status"
              value={status}
              label={`Change status for ${name}`}
              onChange={props.onChangeStatus}
              hasError={props.errors.status && true}
              error={props.errors.status}
            />
          </div>
        )}
        {showEditButton && props.loggedInUser.role === 'ADMIN' && (
          <button
          className="btn btn-outline-success"
          onClick={props.onClickEdit}
        >
            <i className="fas fa-user-edit" /> Edit Tournament
          </button>
        )}
        {props.inEditMode && (
          <div>
            <ButtonWithProgress
              className="btn btn-primary"
              onClick={props.onClickSave}
              text={
                <span>
                  <i className="fas fa-save" /> Save
                </span>
              }
              pendingApiCall={props.pendingUpdateCall}
              disabled={props.pendingUpdateCall}
            />
            <button
              className="btn btn-outline-secondary ml-1"
              onClick={props.onClickCancel}
              disabled={props.pendingUpdateCall}
            >
              <i className="fas fa-window-close" /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state
  };
};

TournamentProfileCard.defaultProps = {
  errors: {}
};

export default connect(mapStateToProps)(TournamentProfileCard);