import React from 'react';
import PropTypes from 'prop-types';

const CommentAdd = ({userId, isVisible, addComment, setVisible}) => {
    // don't show if user is not logged
    if( userId === '0' ) return null;

    // if is not visible then show only a button to activate the 'add comment' form
    if (!isVisible) {
        return (
            <div
            style={{
                marginBottom: '20px',
            }}>
                <button onClick={
                    () => {
                        // execute method from the parent to show the 'add comment' form
                        setVisible(true);
                    }
                }>Add Comment</button>
            </div>
        );
    }

    // variable that will hold the reference of the textarea element
    let commentElement;

    // show the 'add comment' form
    return (
        <div style={{
            marginBottom: '20px',
        }}>
            <div style={{
                marginBottom: '10px',
            }}>
                <textarea
                    autoFocus
                    placeholder="Comment"
                    ref={
                        (r) => {
                            // add a reference to the textarea html element
                            commentElement = r;
                        }
                }></textarea>
            </div>
            <div>
                <button style={{
                    marginRight: '10px',
                }} onClick={
                    () => {
                        const commentValue = commentElement.value;
                        // ignore if no value was specified
                        if (!commentValue) return;
                        // execute method from the parent to add a comment
                        addComment(commentValue);
                    }
                }>Save</button>

                <a href="#" onClick={
                    (e) => {
                        // prevent the default link behavior
                        e.preventDefault();
                        // execute method from the parent to hide the 'add comment' form
                        setVisible(false);
                    }
                }>Cancel</a>
            </div>
        </div>
    );
};

CommentAdd.propTypes = {
    userId: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    setVisible: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
};

export default CommentAdd;
