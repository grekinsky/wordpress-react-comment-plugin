import React from 'react';
import PropTypes from 'prop-types';

class CommentAdd extends React.Component {
    render() {
        const {user, visible, addComment, setVisible} = this.props;
        if( !user ) return null;
        if (!visible) {
            return (
                <div
                style={{
                    marginBottom: '20px',
                }}>
                    <button onClick={() => {
                        setVisible(true);
                    }}>Add Comment</button>
                </div>
            );
        }
        return (
            <div style={{
                marginBottom: '20px',
            }}>
                <div style={{
                    marginBottom: '10px',
                }}>
                    <textarea autoFocus placeholder="Comment" ref={(r) => {this.comment = r;}}></textarea>
                </div>
                <div>
                    <button style={{
                        marginRight: '10px',
                    }} onClick={() => {
                        if (!this.comment.value) return;
                        addComment(this.comment.value);
                    }}>Save</button>&nbsp;
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setVisible(false);
                    }}>Cancel</a>
                </div>
            </div>
        );
    }
}

CommentAdd.propTypes = {
    user: PropTypes.object,
    setVisible: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    visible: PropTypes.bool,
};

export default CommentAdd;
