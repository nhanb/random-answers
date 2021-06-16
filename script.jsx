/** @jsx React.DOM */
var App =  React.createClass({

    componentDidMount: function() {
        this.refs.rows.getDOMNode().focus();
    },

    getInitialState: function() {
        return {
            numChoices: 4,
            numRows: 4,
            numCols: 4,
        };
    },

    update: function() {
        var choices = parseInt(this.refs.choices.state.value);
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

        if (cols > choices) {
            alert('Số cột > Số lựa chọn');
            return false;
        }

        this.setState({
            numRows: rows,
            numCols: cols,
            numChoices: choices,
        });

        return false;
    },

    render: function() {
        var numRows = this.state.numRows;
        var numCols = this.state.numCols;
        var numChoices = this.state.numChoices;
        var data = [];

        for (var i=0; i < numRows; i++) {

            // 1 to numChoices inclusive
            var choices = [];
            for (var num=1; num < numChoices + 1; num++) {
                choices.push(num);
            }

            data[i] = [];

            // First item can't be 0
            var index = Math.floor(Math.random()*choices.length);
            data[i].push(choices.splice(index, 1)[0]);

            var numChosen = 1;  // number of non-zero answers so far

            // The rest may be 0
            for (var ii=0; ii < numCols - 1; ii++) {

                if (numChosen >= numChoices) {
                    data[i].push(0);
                    continue;
                }

                choices.push(0);
                var iindex = Math.floor(Math.random()*choices.length);
                var chosenAnswer = choices.splice(iindex, 1)[0];
                data[i].push(chosenAnswer);
                if (chosenAnswer !== 0) {
                    numChosen++;
                }
            }
        }
        var textareaContent = data.map(function(row) {
            return row.join('-');
        }).join('\n');

        var copy = function () {
          var copyText = document.querySelector("#result-table");
          copyText.select();
          document.execCommand("copy");
          alert("Đã copy!");
        }

        return (
            <div>
                <form onSubmit={this.update}>
                    Số lựa chọn: <input type="text" ref="choices" defaultValue="4"/>
                    Số hàng: <input type="text" ref="rows" defaultValue="4"/>
                    Số cột: <input type="text" ref="cols" defaultValue="4"/>
                    <button type="submit">Enter</button>
                </form>
                <button onClick={copy}>Copy kết quả</button>
                <br/>
                <textarea id="result-table" value={textareaContent}>
                </textarea>
            </div>
        );
    },
});

React.renderComponent(<App />, document.getElementById('main'));
