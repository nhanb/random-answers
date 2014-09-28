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
        var rows = parseInt(this.refs.rows.state.value);
        var cols = parseInt(this.refs.cols.state.value);

        if (isNaN(rows) || isNaN(cols)) {
            console.log('NaN');
            return false;
        }

        if (rows * cols > 12000) {
            alert('Lớn quá!');
            return false;
        }

        this.setState({
            numRows: rows,
            numCols: cols,
        });

        return false;
    },

    render: function() {
        var numRows = this.state.numRows;
        var numCols = this.state.numCols;
        var data = [];

        for (var i=0; i < numRows; i++) {

            // 1 to numCols inclusive
            var choices = [];
            for (var num=1; num < numCols + 1; num++) {
                choices.push(num);
            }

            data[i] = [];

            // First item can't be 0
            var index = Math.floor(Math.random()*choices.length);
            data[i].push(choices.splice(index, 1));

            // The rest may be 0
            for (var ii=0; ii < numCols - 1; ii++) {
                choices.push(0);
                var iindex = Math.floor(Math.random()*choices.length);
                data[i].push(choices.splice(iindex, 1));
            }
        }


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
