/** @jsx React.DOM */

// Ripped off from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

var App2 =  React.createClass({

    getInitialState: function() {
        return {
            answers: []
        };
    },

    renderInputItem: function() {
        return (
            <form onSubmit={this.addAnswer}>
                Mã: <input type="text" ref="code" />
                Số lượng: <input type="text" ref="quantity" />
                <button type="submit">Thêm</button>
            </form>
        );
    },

    addAnswer: function() {
        var code = this.refs.code.state.value;
        var quantity = this.refs.quantity.state.value;

        this.state.answers.push([code, quantity]);
        this.forceUpdate();

        return false;
    },

    render: function() {
        var input = this.renderInputItem();
        var self = this;
        var answers = this.state.answers;

        var answerPreviews = this.state.answers.map(function(answer, index) {
            var remove = function() {
                self.state.answers.splice(index, 1);
                self.forceUpdate();
            };
            return (
                <li>
                    <strong>{answer[0]}</strong>: {answer[1]}
                    <button type="button" onClick={remove}>Xóa</button>
                </li>
            );
        });

        // generated answers
        var generatedAnswers = [];
        for (var i=0; i < answers.length; i++) {
            for (var j=0; j < answers[i][1]; j++) {
                generatedAnswers.push(answers[i][0] + '\n');
            }
        }
        var randomAnswers = shuffle(generatedAnswers).join('');
        var generated = (
            <textarea id="result2" value={randomAnswers}>
            </textarea>
        );

        var copy = function () {
          var copyText = document.querySelector("#result2");
          copyText.select();
          document.execCommand("copy");
          alert("Đã copy!");
        }

        return (
            <div>
                {input}
                <ul>
                    {answerPreviews}
                </ul>
                <button onClick={copy}>Copy kết quả</button>
                <br/>
                {generated}
            </div>
        );
    }

});

React.renderComponent(<App2 />, document.getElementById('main2'));
