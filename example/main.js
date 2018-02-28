const React = require('react');
const ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');

const NPSInput = require('../src');

const Example = createReactClass({
    onSubmit({ score, commentText }) {
        alert('Submitted ' + score + (commentText ? ' and comment "' + commentText + '"' : 'and no comment'));
    },

    render() {
        return (
            <div>
                <NPSInput onSubmit={this.onSubmit} comment={true}></NPSInput>
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
