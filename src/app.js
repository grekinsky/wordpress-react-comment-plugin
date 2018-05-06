import React from 'react';
import ReactDom from 'react-dom';
import CommentList from './Components/CommentList';

// get all html elements which css class is 'wp-react-comment-app'
const wpReactCommentElements = document.querySelectorAll('.wp-react-comment-app');

// iterate through all html elements and render the CommentList react component
// inside each of them
wpReactCommentElements.forEach((el) => {
    // get attributes passed from WP
    const postId = el.getAttribute('data-wp-post-id');
    const userId = parseInt(el.getAttribute('data-wp-user-id'), 10);
    // render the CommentList react component in the current element
    ReactDom.render(<CommentList postId={postId} userId={userId} />, el);
});
