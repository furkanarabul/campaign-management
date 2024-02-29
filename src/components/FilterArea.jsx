// FilterArea.jsx

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FilterArea.css";

const FilterArea = ({
  nameFilter,
  typeFilter,
  startDateFilter,
  endDateFilter,
  statusFilter,
  onNameFilterChange,
  onTypeFilterChange,
  onStartDateFilterChange,
  onEndDateFilterChange,
  onStatusFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-area">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={onNameFilterChange}
        />
      </div>
      <div className="filter-group">
        <select value={typeFilter} onChange={onTypeFilterChange}>
          <option value="">All Types</option>
          <option value="standard">Standard</option>
          <option value="abtest">AB Test</option>
          <option value="mwtest">MW Test</option>
        </select>
      </div>
      <div className="filter-group">
        <DatePicker
          selected={startDateFilter ? new Date(startDateFilter) : null}
          onChange={(date) => onStartDateFilterChange(date)}
          placeholderText="Select Start Date"
        />
      </div>
      <div className="filter-group">
        <DatePicker
          selected={endDateFilter ? new Date(endDateFilter) : null}
          onChange={(date) => onEndDateFilterChange(date)}
          placeholderText="Select End Date"
        />
      </div>
      <div className="filter-group">
        <select value={statusFilter} onChange={onStatusFilterChange}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>
      <button className="btn filter-btn" onClick={onClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterArea;
