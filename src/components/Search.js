import React from 'react'
import Input from './Input';

const Search = () => {

    return (
        <div className="row">
            <Input type="text" placeholder="Search" />
            <button className="btn btn-primary">Search</button>
        </div>
    )

};

export default Search;