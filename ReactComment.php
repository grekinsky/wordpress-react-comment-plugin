<?php
/*
Plugin Name: WP Plugin React Comment
Description: A react app which shows a Comments Component
Version: 1.0.0
Author: Greco Rubio
Author URI: http://greco.mx/
*/

if ( post_password_required() ) {
	return;
}

define( 'WP_PLUGIN_REACT_COMMENT_VERSION' , '1.0.0' );

function wpprc_enqueue_scripts() {
    wp_enqueue_script( 'wp-plugin-react-comment-js', plugins_url( 'build/app.js', __FILE__ ),
										array(), WP_PLUGIN_REACT_COMMENT_VERSION, true );
    //localize data for script
	wp_localize_script( 'wp-plugin-react-comment-js', 'REACT_COMMENT', array(
			'root' => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' )
		)
	);
}

function wpprc_empty_comments_template() {
    return dirname( __FILE__ ) . '/includes/empty-comments-template.php';
}

function wpprc_component( $content ) {
    if ( is_single() || is_page() ) {
        global $post;
        $wpprc_id = uniqid();
        $post_id = $post->ID; // postId
        $current_user = wp_get_current_user();
        $user_id = $current_user->ID; // logged userId
    	$content .= '<div class="wp-react-comment-app" data-wp-id="wp-react-comment-' . $wpprc_id . '" data-wp-post-id="' . $post_id . '" data-wp-user-id="' . $user_id . '"></div>';
    }
    return $content;
}

add_action( 'wp_enqueue_scripts', 'wpprc_enqueue_scripts' );
// Replace comments template.
add_filter( 'comments_template', 'wpprc_empty_comments_template', 20 );
add_filter( 'the_content', 'wpprc_component', 999999 );
