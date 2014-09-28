/** @jsx React.DOM */
var App =  React.createClass({

    componentDidMount: function() {
        this.refs.rows.getDOMNode().focus();
    },

    getInitialState: function() {
        return {
            numRows: 4,
            numCols: 4,
        };
    },

    update: function() {
        var self = this;
        this.setState({
            numRows: self.refs.rows.state.value,
            numCols: self.refs.cols.state.value,
        });
        return false;
    },

    render: function() {
        var data = [];
        var rowIndexes = [];
        for (var num=0; num < this.state.numRows; num++) {
            rowIndexes[num] = num;
        }
        var self = this;
        rowIndexes.forEach(function(rowIndex) {
            var rowData = [];
            var choices = rowIndexes.map(function(index) {
                return index + 1;
            });

            for (var i=0; i < self.state.numCols; i++) {
                var index = Math.floor(Math.random()*choices.length);
                rowData.push(choices.splice(index, 1)[0]);
            }

            data[rowIndex] = rowData;
        });

        var tableRows = data.map(function(row) {
            tds = row.map(function(td) {
                return <td>{td}</td>;
            });
            return <tr>{tds}</tr>;
        });

        return (
            <div>
                <form onSubmit={this.update}>
                    Số hàng: <input type="text" ref="rows" defaultValue="4"/>
                    Số cột: <input type="text" ref="cols" defaultValue="4"/>
                    <button type="submit">Enter</button>
                </form>

                <table id="result-table">
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    },
});

React.renderComponent(<App />, document.getElementById('main'));
