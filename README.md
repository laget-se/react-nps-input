# react-nps-input

A lightweight React component for gathering Net Promoter Score surveys. [See demo](http://eugenijusr.github.io/react-nps-input/).

### Fork Extras

This fork has been extended with:

- an optional comment field
- UI fixes for smaller screens on mobile devices
- SASS instead of LESS

### Installation

```
$ npm i https://github.com/laget-se/react-nps-input
```

### Usage

```js
const React = require('react');
const NPSInput = require('react-nps-input');

const MyApp = React.createClass({
    onSubmit({ score }) {
        console.log(`Score for current user is ${score}/10`);
    },

    render() {
        return (
            <div>
                <NPSInput onSubmit={this.onSubmit}>{({ score, commentText }) => {
                    if (score >= 9) {
                        return <p>Awesome thank you!</p>;
                    } else {
                        return <p>Oh :(</p>;
                    }
                }}</NPSInput>
            </div>
        );
    }
})
```

### Props

- `[Function] onSubmit`: function to call when the user clicked on a score
- `[Function] onDismissed`: function to call when the user clicked to dismiss the form
- `[String] service` (Optional): name of the service for the introduction message
- `[Boolean] animated` (Optional): show animation for apparition (default is `true`)
- `[Boolean] comment` (Optional): the ability to submit an optional comment together with the score
