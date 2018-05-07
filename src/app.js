import React from 'react';
import ReactDom from 'react-dom';
import Comments from './Components/Comments';

// get all html elements which css class is 'wp-react-comment-app'
const wpReactCommentElements = document.querySelectorAll('.wp-react-comment-app');

// iterate through all html elements and render the Comments react component
// inside each of them
wpReactCommentElements.forEach((el) => {
    // get attributes passed from WP
    const postId = el.getAttribute('data-wp-post-id');
    const userId = el.getAttribute('data-wp-user-id');
    // render the Comments react component in the current element
    ReactDom.render(<Comments postId={postId} userId={userId} />, el);
});
