import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (passedPath) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === passedPath)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    // for toggle the sorting of the same column
    else {
      //to set up as asc value when new column is selected
      sortColumn.path = passedPath;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  sortIcon = (column) => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    else if (this.props.sortColumn.order === "desc")
      return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.sortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
