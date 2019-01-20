import React from "react";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import { format, formatDefaultLocale } from "d3";

import TagsCell from "../Tag/TagsCell";
import TransactionsTableRow from "./TransactionsTableRow";

import "react-table/react-table.css";
import "./TransactionsTable.css";

formatDefaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["£", ""]
});
const formatCurrency = format("($.2f");

const columns = map => [
  {
    id: "date",
    Header: "Date",
    accessor: d => d.date.toDateString() // Custom value accessors!
  },
  {
    Header: "Description",
    accessor: "description"
    // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  },
  {
    //id: 'friendName', // Required because our accessor is not a string
    // accessor: d => d.friend.name // Custom value accessors!
    id: "amount",
    Header: "Amount",
    accessor: d => formatCurrency(d.amount)
  },
  {
    //Header: props => <span>Friend Age</span>, // Custom header components!
    id: "balance",
    Header: "Balance",
    accessor: d => formatCurrency(d.balance)
  },
  {
    id: "tags",
    Header: "Tags",
    accessor: d => (
      <TagsCell tags={d.tags} selected={d.selected} tagColorMap={map} />
    )
  }
];

class TransactionsTable extends React.Component {
  render() {
    const tagColorMap = new Map(this.props.tags.map(t => [t.label, t.color]));

    return (
      <ReactTable
        data={this.props.transactions}
        columns={columns(tagColorMap)}
        defaultPageSize={5}
        // getTdProps={(state, rowInfo, column) => {
        //   return {
        //     onClick: (e, handleOriginal) => {
        //       console.log(
        //         `click: column=${column.id}, row=${rowInfo.original.id}`,
        //         state
        //       );

        //       // IMPORTANT! React-Table uses onClick internally to trigger
        //       // events like expanding SubComponents and pivots.
        //       // By default a custom 'onClick' handler will override this functionality.
        //       // If you want to fire the original onClick handler, call the
        //       // 'handleOriginal' function.
        //       if (handleOriginal) {
        //         handleOriginal();
        //       }
        //     }
        //   };
        // }}

        // custom row
        TrComponent={TransactionsTableRow}
        // row click event and selected style
        getTrProps={(state, rowInfo, column) => {
          const original = rowInfo ? rowInfo.original : null;

          if (!original) return {};

          return {
            onClick: (e, handleOriginal) => {
              if (this.props.selectTransaction && original) {
                const { id } = original;

                this.props.selectTransaction(id);
              }

              // ReactTable internal event handler
              if (handleOriginal) {
                handleOriginal();
              }
            },
            updateTransaction: this.props.updateTransaction,
            dropId: original.id,
            style: {
              background: original && original.selected ? "#ffd" : "none"
            },
            tags: original.tags
          };
        }}
      />
    );
  }
}

TransactionsTable.defaultProps = {
  onClick: e => {},
  updateTransaction: t => {}
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  selectTransaction: PropTypes.func,
  updateTransaction: PropTypes.func
};

export default TransactionsTable;
