import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

const CommentItem = ({comment, isLast}) => (
    <li
    style={{
        borderBottom: isLast ? '1px solid #EEEEEE' : '',
        margin: '0',
        minHeight: '36px',
        paddingBottom: '20px',
        paddingTop: '40px',
    }}
    >
        <img style={{
            width: '36px',
            height: '36px',
            border: '2px #CCCCCC solid',
            borderRadius: '50%',
            position: 'absolute',
            backgroundColor: 'white',
        }}
        src={comment.author_avatar_urls[96]}
        />
        <div style={{
            marginLeft: '50px',
        }}>
            <TimeAgo style={{
                fontSize: '12px',
            }} date={comment.date_gmt} />

            <blockquote
                style={{
                    fontSize: '14px',
                }}
                key={comment.id}
                dangerouslySetInnerHTML={{__html: comment.content.rendered}} />
        </div>
    </li>
);

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    isLast: PropTypes.bool,
};

export default CommentItem;
