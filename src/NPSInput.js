const React = require('react');
const classNames = require('classnames');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const NPSScale = require('./NPSScale');

/**
 * Promp the current user for its NPM score.
 * @param {ReactClass}
 */

const NPSInput = createReactClass({
    propTypes: {
        animated:    PropTypes.bool,
        comment:     PropTypes.bool,
        service:     PropTypes.string,
        onSubmit:    PropTypes.func.isRequired,
        onDismissed: PropTypes.func.isRequired,
        children:    PropTypes.func
    },

    getDefaultProps() {
        return {
            animated:    true,
            comment:     false,
            onSubmit:    () => {},
            onDismissed: () => {},
            children:    () => 'Tack för ditt svar'
        };
    },

    getInitialState() {
        return {
            submitted: false,
            dismissed: false,
            score: null,
            commentText: null
        };
    },

    /**
     * User clicked on a value.
     */
    onSelectScore(score) {
        const { comment } = this.props;
        if (comment) {
            this.setState({
                score
            });
        }
        else {
            this.submit(score, null);
        }
    },

    /**
     * User updated comment text.
     */
    onCommentUpdate(event) {
        this.setState({
            commentText: event.target.value
        });
    },

    /**
     * User submitted a form.
     */
    onFormSubmit(event) {
        const { score, commentText } = this.state;
        this.submit(score, commentText);
        event.preventDefault();
    },

    /**
     * User clicked to dismiss this form.
     */
    onDismiss() {
        const { onDismissed } = this.props;
        const { score, commentText } = this.state;

        this.setState({
            dismissed: true
        }, () => {
            onDismissed({ score, commentText });
        });
    },

    submit(score, commentText) {
        const { onSubmit } = this.props;
        this.setState({
            score,
            commentText,
            submitted: true
        }, () => {
            onSubmit({ score, commentText });
        });
    },

    render() {
        const { animated, comment, service, children } = this.props;
        const { submitted, dismissed, score, commentText } = this.state;

        const message = 'Hur troligt är det att du skulle rekommendera laget.se till en kollega eller vän?';

        if (dismissed) {
            return null;
        }

        return (
            <div className={classNames('NPSInput', { animated })}>
                <button className="NPSInput-Close" onClick={this.onDismiss}>✕</button>

                {submitted ? (
                    <div className="NPSInput-Inner">
                        {children({
                            score,
                            commentText,
                            dismiss: this.onDismiss
                        })}
                    </div>
                ) : (
                    <div className="NPSInput-Inner">
                        <p className="NPSInput-Message">
                            {message}
                        </p>
                        <NPSScale selectedValue={score} onSubmit={this.onSelectScore} />
                        {comment && score ? (
                            <form onSubmit={this.onFormSubmit} className="NPSInput-Form">
                                <input type="text" placeholder="Tell us a bit more (it's optional)"
                                    value={commentText || ''} onChange={this.onCommentUpdate} maxLength={255} autoFocus />
                                <button onClick={this.onFormSubmit}>Submit</button>
                            </form>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
});

module.exports = NPSInput;
