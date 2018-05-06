import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import CommentAdd from './CommentAdd';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        // set initial state
        this.state = {
            comments: [],
            loadingComments: false,
            addCommentVisible: false,
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
            loadingComments: true,
            addCommentVisible: false,
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
                    loadingComments: false,
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

        // show loader if loadingComments is true
        if (this.state.loadingComments) {
            return (
                <span style={{
                    borderTop: '1px solid #999',
                    fontSize: '14px',
                    paddingTop: '40px',
                    marginTop: '40px',
                }}>
                    <strong>Loading</strong> comments...
                </span>
            );
        }

        // show the comment list
        return (
            <div style={{
                borderTop: '1px solid #999',
                fontSize: '14px',
                paddingTop: '40px',
                marginTop: '40px',
            }}>
                <CommentAdd
                    visible={this.state.addCommentVisible}
                    setVisible={(visibility) => {
                        this.setState({
                            addCommentVisible: visibility,
                        });
                    }}
                    addComment={this.addComment}
                    userId={userId}
                />

                <span>
                    <strong>{this.state.comments.length}</strong> comments:
                </span>

                <ul
                    style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 0 10px',
                    }}
                >
                    {this.state.comments.map((comment, i, a) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            isLast={i < a.length - 1}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

CommentList.propTypes = {
    postId: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
};

export default CommentList;
