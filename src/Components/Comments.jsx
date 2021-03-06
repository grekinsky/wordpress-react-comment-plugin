import React from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
import CommentAdd from './CommentAdd';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        // set initial state
        this.state = {
            comments: [],
            isLoading: false,
            isAddCommentVisible: false,
        };
        // we have to bind this to the current instance because the function
        // will be executed from a child component
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        // fetch coments when component is mounted, right before initial render
        this.refreshComments();
    }

    refreshComments() {
        const {postId} = this.props;
        // begin loading
        this.setState({
            isLoading: true,
            isAddCommentVisible: false,
        });
        // get comments from local WP API
        jQuery.getJSON(
            REACT_COMMENT.root + 'wp/v2/comments',
            {
                post: postId,
                order: 'desc',
                orderby: 'date_gmt',
            },
            (data) => { // success callback
                // finish loading
                this.setState({
                    comments: data,
                    isLoading: false,
                });
            }
        );
    };

    addComment(comment) {
        const {postId, userId} = this.props;
        if (!userId) return;
        jQuery.ajax({
            type: 'POST',
            url: REACT_COMMENT.root + 'wp/v2/comments',
            beforeSend: function ( xhr ) {
                // we have to send the nonce to prevent CSRF (Cross-site request forgery)
                xhr.setRequestHeader( 'X-WP-Nonce', REACT_COMMENT.nonce );
            },
            data: JSON.stringify({ // data to send
                parent: 0,
                post: postId,
                author: userId,
                content: comment,
                date: new Date().toISOString(),
            }),
            success: () => { // success callback
                // refresh comments to display the latest
                this.refreshComments();
            },
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        });
    }

    render() {
        const {userId} = this.props;
        const {comments, isLoading, isAddCommentVisible} = this.state;
        // show the comment list
        return (
            <div style={{
                borderTop: '1px solid #999',
                fontSize: '14px',
                paddingTop: '40px',
                marginTop: '40px',
            }}>
                <CommentAdd
                    userId={userId}
                    isVisible={isAddCommentVisible}
                    setVisible={(visibility) => {
                        this.setState({
                            isAddCommentVisible: visibility,
                        });
                    }}
                    addComment={this.addComment}
                />

                <span>
                    <strong>{comments.length}</strong> comments:
                </span>

                <CommentList comments={comments} isLoading={isLoading} />
            </div>
        );
    }
}

Comments.propTypes = {
    postId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};

export default Comments;
