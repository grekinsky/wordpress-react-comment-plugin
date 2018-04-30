import React from 'react';
import ReactDom from 'react-dom';
import CommentList from './Components/CommentList';

const wpReactCommentElements = document.querySelectorAll('.wp-react-comment-app');
const len = wpReactCommentElements.length;

let el, wpId, postId, userId, i;

for (let i=0; i<len; i++) {
    el = wpReactCommentElements[i];
    wpId = el.getAttribute('data-wp-id');
    postId = el.getAttribute('data-wp-post-id');
    userId = parseInt(el.getAttribute('data-wp-user-id'), 10);
    ReactDom.render(<CommentList wpId={wpId} postId={postId} userId={userId} />, el);
};
