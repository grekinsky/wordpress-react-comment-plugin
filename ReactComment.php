<?php
/*
Plugin Name: WP Plugin React Comment
Description: A react app which shows a Comments Component
Version: 1.0.0
Author: Greco Rubio
Author URI: http://greco.mx/
*/

// show nothing if the post is password protected
if ( post_password_required() ) {
	return;
}

// define plugin version
define( 'WP_PLUGIN_REACT_COMMENT_VERSION' , '1.0.0' );

function wpprc_enqueue_scripts() {
	// add the bundle file for the react app
    wp_enqueue_script( 'wp-plugin-react-comment-js', plugins_url( 'build/app.js', __FILE__ ),
										array(), WP_PLUGIN_REACT_COMMENT_VERSION, true );

	// localize data for script (set global variables), we will get this values
	// from a global object named 'REACT_COMMENT'
	wp_localize_script( 'wp-plugin-react-comment-js', 'REACT_COMMENT', array(
			'root' => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' )
		)
	);
}
// add necessary scripts
add_action( 'wp_enqueue_scripts', 'wpprc_enqueue_scripts' );

// return an empty file to replace comments
function wpprc_empty_comments_template() {
    return dirname( __FILE__ ) . '/includes/empty-comments-template.php';
}
// replace default comments template with an empty file
add_filter( 'comments_template', 'wpprc_empty_comments_template', 20 );

// add the placeholder for the react component
function wpprc_component( $content ) {
    if ( is_single() || is_page() ) {
		// get global post Id
        global $post;
        $post_id = $post->ID; // postId

		// get current logged user Id
        $current_user = wp_get_current_user();
        $user_id = $current_user->ID; // logged userId

		// placeholder for the react component
    	$content .= '<div class="wp-react-comment-app" data-wp-post-id="' . $post_id . '" data-wp-user-id="' . $user_id . '"></div>';
    }
    return $content;
}
// add the html element at the end of the page
add_filter( 'the_content', 'wpprc_component', 999999 );
