import React from 'react';
import '../styles/DisplayOptions.css';

const DisplayOptions = ({ groupingOption, setGroupingOption, orderingOption, setOrderingOption }) => {
  return (
    <div className="display-options">
      <div className="option-group">
        <h3> Grouping</h3>
        <select value={groupingOption} onChange={(e) => setGroupingOption(e.target.value)}>
          <option value="status">
             <p>Status</p>
          </option>
          <option value="user"> <p>User</p></option>
          <option value="priority"> <p>Priority</p></option>
        </select>
      </div>
      <div className="option-group">
        <h3>Ordering</h3>
        <select value={orderingOption} onChange={(e) => setOrderingOption(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default DisplayOptions;
