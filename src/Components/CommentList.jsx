import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import CommentAdd from './CommentAdd';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            user: null,
            loadingComments: false,
            loadingUser: false,
            addCommentVisible: false,
        };
        this.addComment = this.addComment.bind(this);
    }

    componentWillMount() {
        this.fetchLoggedUser();
        this.refreshComments();
    }

    fetchLoggedUser() {
        this.setState({
            loadingUser: true,
            addCommentVisible: false,
        });
        if (!this.props.userId) {
            this.setState({
                user: null,
                loadingUser: false,
            });
            return;
        }
        jQuery.getJSON(
            REACT_COMMENT.root + 'wp/v2/users/' + this.props.userId,
            null,
            (data) => { // success callback
                this.setState({
                    user: data,
                    loadingUser: false,
                });
            }
        );
    }

    refreshComments() {
        this.setState({
            loadingComments: true,
            addCommentVisible: false,
        });
        jQuery.getJSON(
            REACT_COMMENT.root + 'wp/v2/comments',
            {
                post: this.props.postId,
                order: 'asc',
                orderby: 'id',
            },
            (data) => { // success callback
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
        const {user} = this.state;
        jQuery.ajax({
            type: 'POST',
            url: REACT_COMMENT.root + 'wp/v2/comments',
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader( 'X-WP-Nonce', REACT_COMMENT.nonce );
            },
            data: JSON.stringify({
                parent: 0,
                post: postId,
                author: userId,
                author_name: user.name,
                author_email: user.email,
                author_url: user.website,
                content: comment,
            }),
            success: () => { // success callback
                this.refreshComments();
            },
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        });
    }

    render() {
        if (this.state.loadingComments || this.state.loadingUser) {
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
                    user={this.state.user}
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
                        <CommentItem key={comment.id} comment={comment} isLast={i < a.length - 1} />
                    ))}
                </ul>
            </div>
        );
    }
}

CommentList.propTypes = {
    wpId: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
};

export default CommentList;
