import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import CommentAdd from './CommentAdd';

// show comments or loader if is Loading
const CommentList = ({comments, isLoading}) => isLoading ? (
    <span style={{
        borderTop: '1px solid #999',
        fontSize: '14px',
        paddingTop: '40px',
        marginTop: '40px',
    }}>
    <strong>Loading</strong> comments...
    </span>
) : (
    <ul
        style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 0 10px',
        }}
    >
        {comments.map((comment, i, a) => (
            <CommentItem
                key={comment.id}
                comment={comment}
                isLast={i < a.length - 1}
            />
        ))}
    </ul>
);

CommentList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
};

export default CommentList;
