<?php
require_once(__DIR__.'/vendor/autoload.php');
add_action( 'init', 'php_console_example' ); // Run the function on init
function php_console_example() {
  $message_var = "Here's an example of logging the contents of a variable with PHP Console!"; // A simple string var.
  if ( class_exists( 'PC' ) ) { // Prevent your site from breaking if the 'PC' class has not been registered.
    PC::debug( $message_var, 'Example' ); // Here's where the magic happens: The contents of $message_var will be logged with the title 'Example'.
  }
}

/////////////////////////////
$FIREBASE_API_KEY = 'AAAAwD3HiJk:APA91bHg07tkGBlikckdX_R5k6aG6nOLZ6GumTqnAh4W0iE2YViKHt3qxoE1N4meUyvFPfiC-cDch418_TJoG070-8j9o__scW_SxtPq_sWzazgCCyqBEMekRGNvf92qwT0qpDSUBZWG';

\Stripe\Stripe::setApiKey('sk_test_CIlQLWqJmuSmDFQoQwvDYZAp');

//

/**
 * Twenty Twenty functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

/**
 * Table of Contents:
 * Theme Support
 * Required Files
 * Register Styles
 * Register Scripts
 * Register Menus
 * Custom Logo
 * WP Body Open
 * Register Sidebars
 * Enqueue Block Editor Assets
 * Enqueue Classic Editor Styles
 * Block Editor Settings
 */

function get_resetPwd_template($code) {
return '<head>
<title>Rating Reminder</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width" name="viewport">
<style type="text/css">
            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 600;
              font-style: normal;
              src: local(&#x27;Postmates Std Bold&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format(&#x27;woff&#x27;);
            }

            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 500;
              font-style: normal;
              src: local(&#x27;Postmates Std Medium&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format(&#x27;woff&#x27;);
            }

            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 400;
              font-style: normal;
              src: local(&#x27;Postmates Std Regular&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format(&#x27;woff&#x27;);
            }
        </style>
<style media="screen and (max-width: 680px)">
            @media screen and (max-width: 680px) {
                .page-center {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }
                
                .footer-center {
                  padding-left: 20px !important;
                  padding-right: 20px !important;
                }
            }
        </style>
</head>
<body style="background-color: #f4f4f5;">
<table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
<tbody><tr>
<td style="text-align: center;">
<table align="center" cellpadding="0" cellspacing="0" id="body" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
<tbody><tr>
<td>
<table align="center" cellpadding="0" cellspacing="0" class="page-center" style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
<tbody><tr>
<td style="padding-top: 24px;">
<img src="https://d1pgqke3goo8l6.cloudfront.net/wRMe5oiRRqYamUFBvXEw_logo.png" style="width: 56px;">
</td>
</tr>
<tr>
<td colspan="2" style="padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: \'Postmates Std\', \'Helvetica\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;">Reset your password</td>
</tr>
<tr>
<td style="padding-top: 48px; padding-bottom: 48px;">
<table cellpadding="0" cellspacing="0" style="width: 100%">
<tbody><tr>
<td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
</tr>
</tbody></table>
</td>
</tr>
<tr>
<td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: \'Postmates Std\', \'Helvetica\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                      You\'re receiving this e-mail because you requested a password reset for your Snap Sniper account.
                                    </td>
</tr>
<tr>
<td style="padding-top: 24px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: \'Postmates Std\', \'Helvetica\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                      Please tap the button below to choose a new password.
                                    </td>
</tr>
<tr>
<td>
<a data-click-track-id="37" href="'.$code.'" style="margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #ffffff; font-family: \'Postmates Std\', \'Helvetica\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #00cc99; border-radius: 28px; display: block; text-align: center; text-transform: uppercase" target="_blank">
                                        Reset Password
                                      </a>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" id="footer" style="background-color: #000; width: 100%; max-width: 680px; height: 100%;">
<tbody><tr>
<td>
<table align="center" cellpadding="0" cellspacing="0" class="footer-center" style="text-align: left; width: 100%; padding-left: 120px; padding-right: 120px;">
<tbody><tr>
<td colspan="2" style="padding-top: 72px; padding-bottom: 24px; width: 100%;">
<img src="https://d1pgqke3goo8l6.cloudfront.net/DFcmHWqyT2CXk2cfz1QB_wordmark.png" style="width: 124px; height: 20px">
</td>
</tr>
<tr>
<td colspan="2" style="padding-top: 24px; padding-bottom: 48px;">
<table cellpadding="0" cellspacing="0" style="width: 100%">
<tbody><tr>
<td style="width: 100%; height: 1px; max-height: 1px; background-color: #EAECF2; opacity: 0.19"></td>
</tr>
</tbody></table>
</td>
</tr>
<tr>
<td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095A2; font-family: \'Postmates Std\', \'Helvetica\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; font-size: 15px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: 0; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                          If you have any questions or concerns, we\'re here to help. Contact us via our <a data-click-track-id="1053" href="#" style="font-weight: 500; color: #ffffff" target="_blank">Help Center</a>.
                                        </td>
</tr>
<tr>
<td style="height: 72px;"></td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>



</body>';
	
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */

function my_simple_crypt( $string, $action = 'e' ) {
    // you may change these values to your own
    $secret_key = 'my_simple_secret_key';
    $secret_iv = 'my_simple_secret_iv';
 
    $output = false;
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', $secret_key );
    $iv = substr( hash( 'sha256', $secret_iv ), 0, 16 );
 
    if( $action == 'e' ) {
        $output = base64_encode( openssl_encrypt( $string, $encrypt_method, $key, 0, $iv ) );
    }
    else if( $action == 'd' ){
        $output = openssl_decrypt( base64_decode( $string ), $encrypt_method, $key, 0, $iv );
    }
 
    return $output;
}


function twentytwenty_theme_support() {

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Custom background color.
	add_theme_support(
		'custom-background',
		array(
			'default-color' => 'f5efe0',
		)
	);

	// Set content-width.
	global $content_width;
	if ( ! isset( $content_width ) ) {
		$content_width = 580;
	}

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// Set post thumbnail size.
	set_post_thumbnail_size( 1200, 9999 );

	// Add custom image size used in Cover Template.
	add_image_size( 'twentytwenty-fullscreen', 1980, 9999 );

	// Custom logo.
	$logo_width  = 120;
	$logo_height = 90;

	// If the retina setting is active, double the recommended width and height.
	if ( get_theme_mod( 'retina_logo', false ) ) {
		$logo_width  = floor( $logo_width * 2 );
		$logo_height = floor( $logo_height * 2 );
	}

	add_theme_support(
		'custom-logo',
		array(
			'height'      => $logo_height,
			'width'       => $logo_width,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
			'style',
		)
	);

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Twenty Twenty, use a find and replace
	 * to change 'twentytwenty' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'twentytwenty' );

	// Add support for full and wide align images.
	add_theme_support( 'align-wide' );

	/*
	 * Adds starter content to highlight the theme on fresh sites.
	 * This is done conditionally to avoid loading the starter content on every
	 * page load, as it is a one-off operation only needed once in the customizer.
	 */
	if ( is_customize_preview() ) {
		require get_template_directory() . '/inc/starter-content.php';
		add_theme_support( 'starter-content', twentytwenty_get_starter_content() );
	}

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/*
	 * Adds `async` and `defer` support for scripts registered or enqueued
	 * by the theme.
	 */
	$loader = new TwentyTwenty_Script_Loader();
	add_filter( 'script_loader_tag', array( $loader, 'filter_script_loader_tag' ), 10, 2 );

}

add_action( 'after_setup_theme', 'twentytwenty_theme_support' );

/**
 * REQUIRED FILES
 * Include required files.
 */
require get_template_directory() . '/inc/template-tags.php';

// Handle SVG icons.
require get_template_directory() . '/classes/class-twentytwenty-svg-icons.php';
require get_template_directory() . '/inc/svg-icons.php';

// Handle Customizer settings.
require get_template_directory() . '/classes/class-twentytwenty-customize.php';

// Require Separator Control class.
require get_template_directory() . '/classes/class-twentytwenty-separator-control.php';

// Custom comment walker.
require get_template_directory() . '/classes/class-twentytwenty-walker-comment.php';

// Custom page walker.
require get_template_directory() . '/classes/class-twentytwenty-walker-page.php';

// Custom script loader class.
require get_template_directory() . '/classes/class-twentytwenty-script-loader.php';

// Non-latin language handling.
require get_template_directory() . '/classes/class-twentytwenty-non-latin-languages.php';

// Custom CSS.
require get_template_directory() . '/inc/custom-css.php';

/**
 * Register and Enqueue Styles.
 */
function twentytwenty_register_styles() {

	$theme_version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style( 'twentytwenty-style', get_stylesheet_uri(), array(), $theme_version );
	wp_style_add_data( 'twentytwenty-style', 'rtl', 'replace' );

	// Add output of Customizer settings as inline style.
	wp_add_inline_style( 'twentytwenty-style', twentytwenty_get_customizer_css( 'front-end' ) );

	// Add print CSS.
	wp_enqueue_style( 'twentytwenty-print-style', get_template_directory_uri() . '/print.css', null, $theme_version, 'print' );

}

add_action( 'wp_enqueue_scripts', 'twentytwenty_register_styles' );

/**
 * Register and Enqueue Scripts.
 */
function twentytwenty_register_scripts() {

	$theme_version = wp_get_theme()->get( 'Version' );

	if ( ( ! is_admin() ) && is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	wp_enqueue_script( 'twentytwenty-js', get_template_directory_uri() . '/assets/js/index.js', array(), $theme_version, false );
	wp_script_add_data( 'twentytwenty-js', 'async', true );

}

add_action( 'wp_enqueue_scripts', 'twentytwenty_register_scripts' );

/**
 * Fix skip link focus in IE11.
 *
 * This does not enqueue the script because it is tiny and because it is only for IE11,
 * thus it does not warrant having an entire dedicated blocking script being loaded.
 *
 * @link https://git.io/vWdr2
 */
function twentytwenty_skip_link_focus_fix() {
	// The following is minified via `terser --compress --mangle -- assets/js/skip-link-focus-fix.js`.
	?>
	<script>
	/(trident|msie)/i.test(navigator.userAgent)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",function(){var t,e=location.hash.substring(1);/^[A-z0-9_-]+$/.test(e)&&(t=document.getElementById(e))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())},!1);
	</script>
	<?php
}
add_action( 'wp_print_footer_scripts', 'twentytwenty_skip_link_focus_fix' );

/** Enqueue non-latin language styles
 *
 * @since 1.0.0
 *
 * @return void
 */
function twentytwenty_non_latin_languages() {
	$custom_css = TwentyTwenty_Non_Latin_Languages::get_non_latin_css( 'front-end' );

	if ( $custom_css ) {
		wp_add_inline_style( 'twentytwenty-style', $custom_css );
	}
}

add_action( 'wp_enqueue_scripts', 'twentytwenty_non_latin_languages' );

/**
 * Register navigation menus uses wp_nav_menu in five places.
 */
function twentytwenty_menus() {

	$locations = array(
		'primary'  => __( 'Desktop Horizontal Menu', 'twentytwenty' ),
		'expanded' => __( 'Desktop Expanded Menu', 'twentytwenty' ),
		'mobile'   => __( 'Mobile Menu', 'twentytwenty' ),
		'footer'   => __( 'Footer Menu', 'twentytwenty' ),
		'social'   => __( 'Social Menu', 'twentytwenty' ),
	);

	register_nav_menus( $locations );
}

add_action( 'init', 'twentytwenty_menus' );

/**
 * Get the information about the logo.
 *
 * @param string $html The HTML output from get_custom_logo (core function).
 *
 * @return string $html
 */
function twentytwenty_get_custom_logo( $html ) {

	$logo_id = get_theme_mod( 'custom_logo' );

	if ( ! $logo_id ) {
		return $html;
	}

	$logo = wp_get_attachment_image_src( $logo_id, 'full' );

	if ( $logo ) {
		// For clarity.
		$logo_width  = esc_attr( $logo[1] );
		$logo_height = esc_attr( $logo[2] );

		// If the retina logo setting is active, reduce the width/height by half.
		if ( get_theme_mod( 'retina_logo', false ) ) {
			$logo_width  = floor( $logo_width / 2 );
			$logo_height = floor( $logo_height / 2 );

			$search = array(
				'/width=\"\d+\"/iU',
				'/height=\"\d+\"/iU',
			);

			$replace = array(
				"width=\"{$logo_width}\"",
				"height=\"{$logo_height}\"",
			);

			// Add a style attribute with the height, or append the height to the style attribute if the style attribute already exists.
			if ( strpos( $html, ' style=' ) === false ) {
				$search[]  = '/(src=)/';
				$replace[] = "style=\"height: {$logo_height}px;\" src=";
			} else {
				$search[]  = '/(style="[^"]*)/';
				$replace[] = "$1 height: {$logo_height}px;";
			}

			$html = preg_replace( $search, $replace, $html );

		}
	}

	return $html;

}

add_filter( 'get_custom_logo', 'twentytwenty_get_custom_logo' );

if ( ! function_exists( 'wp_body_open' ) ) {

	/**
	 * Shim for wp_body_open, ensuring backwards compatibility with versions of WordPress older than 5.2.
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
}

/**
 * Include a skip to content link at the top of the page so that users can bypass the menu.
 */
function twentytwenty_skip_link() {
	echo '<a class="skip-link screen-reader-text" href="#site-content">' . __( 'Skip to the content', 'twentytwenty' ) . '</a>';
}

add_action( 'wp_body_open', 'twentytwenty_skip_link', 5 );

/**
 * Register widget areas.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function twentytwenty_sidebar_registration() {

	// Arguments used in all register_sidebar() calls.
	$shared_args = array(
		'before_title'  => '<h2 class="widget-title subheading heading-size-3">',
		'after_title'   => '</h2>',
		'before_widget' => '<div class="widget %2$s"><div class="widget-content">',
		'after_widget'  => '</div></div>',
	);

	// Footer #1.
	register_sidebar(
		array_merge(
			$shared_args,
			array(
				'name'        => __( 'Footer #1', 'twentytwenty' ),
				'id'          => 'sidebar-1',
				'description' => __( 'Widgets in this area will be displayed in the first column in the footer.', 'twentytwenty' ),
			)
		)
	);

	// Footer #2.
	register_sidebar(
		array_merge(
			$shared_args,
			array(
				'name'        => __( 'Footer #2', 'twentytwenty' ),
				'id'          => 'sidebar-2',
				'description' => __( 'Widgets in this area will be displayed in the second column in the footer.', 'twentytwenty' ),
			)
		)
	);

}

add_action( 'widgets_init', 'twentytwenty_sidebar_registration' );

/**
 * Enqueue supplemental block editor styles.
 */
function twentytwenty_block_editor_styles() {

	$css_dependencies = array();

	// Enqueue the editor styles.
	wp_enqueue_style( 'twentytwenty-block-editor-styles', get_theme_file_uri( '/assets/css/editor-style-block.css' ), $css_dependencies, wp_get_theme()->get( 'Version' ), 'all' );
	wp_style_add_data( 'twentytwenty-block-editor-styles', 'rtl', 'replace' );

	// Add inline style from the Customizer.
	wp_add_inline_style( 'twentytwenty-block-editor-styles', twentytwenty_get_customizer_css( 'block-editor' ) );

	// Add inline style for non-latin fonts.
	wp_add_inline_style( 'twentytwenty-block-editor-styles', TwentyTwenty_Non_Latin_Languages::get_non_latin_css( 'block-editor' ) );

	// Enqueue the editor script.
	wp_enqueue_script( 'twentytwenty-block-editor-script', get_theme_file_uri( '/assets/js/editor-script-block.js' ), array( 'wp-blocks', 'wp-dom' ), wp_get_theme()->get( 'Version' ), true );
}

add_action( 'enqueue_block_editor_assets', 'twentytwenty_block_editor_styles', 1, 1 );

/**
 * Enqueue classic editor styles.
 */
function twentytwenty_classic_editor_styles() {

	$classic_editor_styles = array(
		'/assets/css/editor-style-classic.css',
	);

	add_editor_style( $classic_editor_styles );

}

add_action( 'init', 'twentytwenty_classic_editor_styles' );

/**
 * Output Customizer settings in the classic editor.
 * Adds styles to the head of the TinyMCE iframe. Kudos to @Otto42 for the original solution.
 *
 * @param array $mce_init TinyMCE styles.
 *
 * @return array $mce_init TinyMCE styles.
 */
function twentytwenty_add_classic_editor_customizer_styles( $mce_init ) {

	$styles = twentytwenty_get_customizer_css( 'classic-editor' );

	if ( ! isset( $mce_init['content_style'] ) ) {
		$mce_init['content_style'] = $styles . ' ';
	} else {
		$mce_init['content_style'] .= ' ' . $styles . ' ';
	}

	return $mce_init;

}

add_filter( 'tiny_mce_before_init', 'twentytwenty_add_classic_editor_customizer_styles' );

/**
 * Output non-latin font styles in the classic editor.
 * Adds styles to the head of the TinyMCE iframe. Kudos to @Otto42 for the original solution.
 *
 * @param array $mce_init TinyMCE styles.
 *
 * @return array $mce_init TinyMCE styles.
 */
function twentytwenty_add_classic_editor_non_latin_styles( $mce_init ) {

	$styles = TwentyTwenty_Non_Latin_Languages::get_non_latin_css( 'classic-editor' );

	// Return if there are no styles to add.
	if ( ! $styles ) {
		return $mce_init;
	}

	if ( ! isset( $mce_init['content_style'] ) ) {
		$mce_init['content_style'] = $styles . ' ';
	} else {
		$mce_init['content_style'] .= ' ' . $styles . ' ';
	}

	return $mce_init;

}

add_filter( 'tiny_mce_before_init', 'twentytwenty_add_classic_editor_non_latin_styles' );

/**
 * Block Editor Settings.
 * Add custom colors and font sizes to the block editor.
 */
function twentytwenty_block_editor_settings() {

	// Block Editor Palette.
	$editor_color_palette = array(
		array(
			'name'  => __( 'Accent Color', 'twentytwenty' ),
			'slug'  => 'accent',
			'color' => twentytwenty_get_color_for_area( 'content', 'accent' ),
		),
		array(
			'name'  => __( 'Primary', 'twentytwenty' ),
			'slug'  => 'primary',
			'color' => twentytwenty_get_color_for_area( 'content', 'text' ),
		),
		array(
			'name'  => __( 'Secondary', 'twentytwenty' ),
			'slug'  => 'secondary',
			'color' => twentytwenty_get_color_for_area( 'content', 'secondary' ),
		),
		array(
			'name'  => __( 'Subtle Background', 'twentytwenty' ),
			'slug'  => 'subtle-background',
			'color' => twentytwenty_get_color_for_area( 'content', 'borders' ),
		),
	);

	// Add the background option.
	$background_color = get_theme_mod( 'background_color' );
	if ( ! $background_color ) {
		$background_color_arr = get_theme_support( 'custom-background' );
		$background_color     = $background_color_arr[0]['default-color'];
	}
	$editor_color_palette[] = array(
		'name'  => __( 'Background Color', 'twentytwenty' ),
		'slug'  => 'background',
		'color' => '#' . $background_color,
	);

	// If we have accent colors, add them to the block editor palette.
	if ( $editor_color_palette ) {
		add_theme_support( 'editor-color-palette', $editor_color_palette );
	}

	// Block Editor Font Sizes.
	add_theme_support(
		'editor-font-sizes',
		array(
			array(
				'name'      => _x( 'Small', 'Name of the small font size in the block editor', 'twentytwenty' ),
				'shortName' => _x( 'S', 'Short name of the small font size in the block editor.', 'twentytwenty' ),
				'size'      => 18,
				'slug'      => 'small',
			),
			array(
				'name'      => _x( 'Regular', 'Name of the regular font size in the block editor', 'twentytwenty' ),
				'shortName' => _x( 'M', 'Short name of the regular font size in the block editor.', 'twentytwenty' ),
				'size'      => 21,
				'slug'      => 'normal',
			),
			array(
				'name'      => _x( 'Large', 'Name of the large font size in the block editor', 'twentytwenty' ),
				'shortName' => _x( 'L', 'Short name of the large font size in the block editor.', 'twentytwenty' ),
				'size'      => 26.25,
				'slug'      => 'large',
			),
			array(
				'name'      => _x( 'Larger', 'Name of the larger font size in the block editor', 'twentytwenty' ),
				'shortName' => _x( 'XL', 'Short name of the larger font size in the block editor.', 'twentytwenty' ),
				'size'      => 32,
				'slug'      => 'larger',
			),
		)
	);

	// If we have a dark background color then add support for dark editor style.
	// We can determine if the background color is dark by checking if the text-color is white.
	if ( '#ffffff' === strtolower( twentytwenty_get_color_for_area( 'content', 'text' ) ) ) {
		add_theme_support( 'dark-editor-style' );
	}

}

add_action( 'after_setup_theme', 'twentytwenty_block_editor_settings' );

/**
 * Overwrite default more tag with styling and screen reader markup.
 *
 * @param string $html The default output HTML for the more tag.
 *
 * @return string $html
 */
function twentytwenty_read_more_tag( $html ) {
	return preg_replace( '/<a(.*)>(.*)<\/a>/iU', sprintf( '<div class="read-more-button-wrap"><a$1><span class="faux-button">$2</span> <span class="screen-reader-text">"%1$s"</span></a></div>', get_the_title( get_the_ID() ) ), $html );
}

add_filter( 'the_content_more_link', 'twentytwenty_read_more_tag' );

/**
 * Enqueues scripts for customizer controls & settings.
 *
 * @since 1.0.0
 *
 * @return void
 */
function twentytwenty_customize_controls_enqueue_scripts() {
	$theme_version = wp_get_theme()->get( 'Version' );

	// Add main customizer js file.
	wp_enqueue_script( 'twentytwenty-customize', get_template_directory_uri() . '/assets/js/customize.js', array( 'jquery' ), $theme_version, false );

	// Add script for color calculations.
	wp_enqueue_script( 'twentytwenty-color-calculations', get_template_directory_uri() . '/assets/js/color-calculations.js', array( 'wp-color-picker' ), $theme_version, false );

	// Add script for controls.
	wp_enqueue_script( 'twentytwenty-customize-controls', get_template_directory_uri() . '/assets/js/customize-controls.js', array( 'twentytwenty-color-calculations', 'customize-controls', 'underscore', 'jquery' ), $theme_version, false );
	wp_localize_script( 'twentytwenty-customize-controls', 'twentyTwentyBgColors', twentytwenty_get_customizer_color_vars() );
}

add_action( 'customize_controls_enqueue_scripts', 'twentytwenty_customize_controls_enqueue_scripts' );

/**
 * Enqueue scripts for the customizer preview.
 *
 * @since 1.0.0
 *
 * @return void
 */
function twentytwenty_customize_preview_init() {
	$theme_version = wp_get_theme()->get( 'Version' );

	wp_enqueue_script( 'twentytwenty-customize-preview', get_theme_file_uri( '/assets/js/customize-preview.js' ), array( 'customize-preview', 'customize-selective-refresh', 'jquery' ), $theme_version, true );
	wp_localize_script( 'twentytwenty-customize-preview', 'twentyTwentyBgColors', twentytwenty_get_customizer_color_vars() );
	wp_localize_script( 'twentytwenty-customize-preview', 'twentyTwentyPreviewEls', twentytwenty_get_elements_array() );

	wp_add_inline_script(
		'twentytwenty-customize-preview',
		sprintf(
			'wp.customize.selectiveRefresh.partialConstructor[ %1$s ].prototype.attrs = %2$s;',
			wp_json_encode( 'cover_opacity' ),
			wp_json_encode( twentytwenty_customize_opacity_range() )
		)
	);
}

add_action( 'customize_preview_init', 'twentytwenty_customize_preview_init' );

/**
 * Get accessible color for an area.
 *
 * @since 1.0.0
 *
 * @param string $area The area we want to get the colors for.
 * @param string $context Can be 'text' or 'accent'.
 * @return string Returns a HEX color.
 */
function twentytwenty_get_color_for_area( $area = 'content', $context = 'text' ) {

	// Get the value from the theme-mod.
	$settings = get_theme_mod(
		'accent_accessible_colors',
		array(
			'content'       => array(
				'text'      => '#000000',
				'accent'    => '#cd2653',
				'secondary' => '#6d6d6d',
				'borders'   => '#dcd7ca',
			),
			'header-footer' => array(
				'text'      => '#000000',
				'accent'    => '#cd2653',
				'secondary' => '#6d6d6d',
				'borders'   => '#dcd7ca',
			),
		)
	);

	// If we have a value return it.
	if ( isset( $settings[ $area ] ) && isset( $settings[ $area ][ $context ] ) ) {
		return $settings[ $area ][ $context ];
	}

	// Return false if the option doesn't exist.
	return false;
}

/**
 * Returns an array of variables for the customizer preview.
 *
 * @since 1.0.0
 *
 * @return array
 */
function twentytwenty_get_customizer_color_vars() {
	$colors = array(
		'content'       => array(
			'setting' => 'background_color',
		),
		'header-footer' => array(
			'setting' => 'header_footer_background_color',
		),
	);
	return $colors;
}

/**
 * Get an array of elements.
 *
 * @since 1.0
 *
 * @return array
 */
function twentytwenty_get_elements_array() {

	// The array is formatted like this:
	// [key-in-saved-setting][sub-key-in-setting][css-property] = [elements].
	$elements = array(
		'content'       => array(
			'accent'     => array(
				'color'            => array( '.color-accent', '.color-accent-hover:hover', '.color-accent-hover:focus', ':root .has-accent-color', '.has-drop-cap:not(:focus):first-letter', '.wp-block-button.is-style-outline', 'a' ),
				'border-color'     => array( 'blockquote', '.border-color-accent', '.border-color-accent-hover:hover', '.border-color-accent-hover:focus' ),
				'background-color' => array( 'button:not(.toggle)', '.button', '.faux-button', '.wp-block-button__link', '.wp-block-file .wp-block-file__button', 'input[type="button"]', 'input[type="reset"]', 'input[type="submit"]', '.bg-accent', '.bg-accent-hover:hover', '.bg-accent-hover:focus', ':root .has-accent-background-color', '.comment-reply-link' ),
				'fill'             => array( '.fill-children-accent', '.fill-children-accent *' ),
			),
			'background' => array(
				'color'            => array( ':root .has-background-color', 'button', '.button', '.faux-button', '.wp-block-button__link', '.wp-block-file__button', 'input[type="button"]', 'input[type="reset"]', 'input[type="submit"]', '.wp-block-button', '.comment-reply-link', '.has-background.has-primary-background-color:not(.has-text-color)', '.has-background.has-primary-background-color *:not(.has-text-color)', '.has-background.has-accent-background-color:not(.has-text-color)', '.has-background.has-accent-background-color *:not(.has-text-color)' ),
				'background-color' => array( ':root .has-background-background-color' ),
			),
			'text'       => array(
				'color'            => array( 'body', '.entry-title a', ':root .has-primary-color' ),
				'background-color' => array( ':root .has-primary-background-color' ),
			),
			'secondary'  => array(
				'color'            => array( 'cite', 'figcaption', '.wp-caption-text', '.post-meta', '.entry-content .wp-block-archives li', '.entry-content .wp-block-categories li', '.entry-content .wp-block-latest-posts li', '.wp-block-latest-comments__comment-date', '.wp-block-latest-posts__post-date', '.wp-block-embed figcaption', '.wp-block-image figcaption', '.wp-block-pullquote cite', '.comment-metadata', '.comment-respond .comment-notes', '.comment-respond .logged-in-as', '.pagination .dots', '.entry-content hr:not(.has-background)', 'hr.styled-separator', ':root .has-secondary-color' ),
				'background-color' => array( ':root .has-secondary-background-color' ),
			),
			'borders'    => array(
				'border-color'        => array( 'pre', 'fieldset', 'input', 'textarea', 'table', 'table *', 'hr' ),
				'background-color'    => array( 'caption', 'code', 'code', 'kbd', 'samp', '.wp-block-table.is-style-stripes tbody tr:nth-child(odd)', ':root .has-subtle-background-background-color' ),
				'border-bottom-color' => array( '.wp-block-table.is-style-stripes' ),
				'border-top-color'    => array( '.wp-block-latest-posts.is-grid li' ),
				'color'               => array( ':root .has-subtle-background-color' ),
			),
		),
		'header-footer' => array(
			'accent'     => array(
				'color'            => array( 'body:not(.overlay-header) .primary-menu > li > a', 'body:not(.overlay-header) .primary-menu > li > .icon', '.modal-menu a', '.footer-menu a, .footer-widgets a', '#site-footer .wp-block-button.is-style-outline', '.wp-block-pullquote:before', '.singular:not(.overlay-header) .entry-header a', '.archive-header a', '.header-footer-group .color-accent', '.header-footer-group .color-accent-hover:hover' ),
				'background-color' => array( '.social-icons a', '#site-footer button:not(.toggle)', '#site-footer .button', '#site-footer .faux-button', '#site-footer .wp-block-button__link', '#site-footer .wp-block-file__button', '#site-footer input[type="button"]', '#site-footer input[type="reset"]', '#site-footer input[type="submit"]' ),
			),
			'background' => array(
				'color'            => array( '.social-icons a', 'body:not(.overlay-header) .primary-menu ul', '.header-footer-group button', '.header-footer-group .button', '.header-footer-group .faux-button', '.header-footer-group .wp-block-button:not(.is-style-outline) .wp-block-button__link', '.header-footer-group .wp-block-file__button', '.header-footer-group input[type="button"]', '.header-footer-group input[type="reset"]', '.header-footer-group input[type="submit"]' ),
				'background-color' => array( '#site-header', '.footer-nav-widgets-wrapper', '#site-footer', '.menu-modal', '.menu-modal-inner', '.search-modal-inner', '.archive-header', '.singular .entry-header', '.singular .featured-media:before', '.wp-block-pullquote:before' ),
			),
			'text'       => array(
				'color'               => array( '.header-footer-group', 'body:not(.overlay-header) #site-header .toggle', '.menu-modal .toggle' ),
				'background-color'    => array( 'body:not(.overlay-header) .primary-menu ul' ),
				'border-bottom-color' => array( 'body:not(.overlay-header) .primary-menu > li > ul:after' ),
				'border-left-color'   => array( 'body:not(.overlay-header) .primary-menu ul ul:after' ),
			),
			'secondary'  => array(
				'color' => array( '.site-description', 'body:not(.overlay-header) .toggle-inner .toggle-text', '.widget .post-date', '.widget .rss-date', '.widget_archive li', '.widget_categories li', '.widget cite', '.widget_pages li', '.widget_meta li', '.widget_nav_menu li', '.powered-by-wordpress', '.to-the-top', '.singular .entry-header .post-meta', '.singular:not(.overlay-header) .entry-header .post-meta a' ),
			),
			'borders'    => array(
				'border-color'     => array( '.header-footer-group pre', '.header-footer-group fieldset', '.header-footer-group input', '.header-footer-group textarea', '.header-footer-group table', '.header-footer-group table *', '.footer-nav-widgets-wrapper', '#site-footer', '.menu-modal nav *', '.footer-widgets-outer-wrapper', '.footer-top' ),
				'background-color' => array( '.header-footer-group table caption', 'body:not(.overlay-header) .header-inner .toggle-wrapper::before' ),
			),
		),
	);

	/**
	* Filters Twenty Twenty theme elements
	*
	* @since 1.0.0
	*
	* @param array Array of elements
	*/
	return apply_filters( 'twentytwenty_get_elements_array', $elements );
}

function get_latest_posts_by_category($request) {
	
//  	echo file_get_contents("http://localhost:5000/compare?source_face=sample/source.jpg&target_face=sample/target.jpg");
	echo $_FILES["fileToUpload"]["tmp_name"];
	echo "poo";
    return "posted";
}

function autoRotateImage($image) {
    $orientation = $image->getImageOrientation();

    switch($orientation) {
        case imagick::ORIENTATION_BOTTOMRIGHT: 
            $image->rotateimage("#000", 180); // rotate 180 degrees
            break;

        case imagick::ORIENTATION_RIGHTTOP:
            $image->rotateimage("#000", 90); // rotate 90 degrees CW
            break;

        case imagick::ORIENTATION_LEFTBOTTOM: 
            $image->rotateimage("#000", -90); // rotate 90 degrees CCW
            break;
    }

    // Now that it's auto-rotated, make sure the EXIF data is correct in case the EXIF gets saved with the image!
    $image->setImageOrientation(imagick::ORIENTATION_TOPLEFT);
}

function convertImage($originalImage, $outputImage, $quality)
{
    $image = new Imagick($originalImage);
	autoRotateImage($image);
	// - Do other stuff to the image here -
	$image->writeImage($outputImage);

    return 1;
}

function register_user($request) {	
	global $wpdb;
	$sql_query = "INSERT INTO tb_user (name, screenName, email, phoneNumber, birthday, password, uid) VALUES ('".$request['name']."', '".$request['screenName']."', '".$request['email']."', '".$request['phoneNumber']."', '".$request['birthday']."', '".$request['password']."', '".md5($request['email'])."')";
	$result = $wpdb->query($sql_query);
	
	if($result==1) {
		
		$sql_query = "SELECT * FROM tb_user WHERE email = '".$request['email']."'";
		$result = $wpdb->get_results($sql_query);
		return json_encode($result[0]);
	}

	return $result;
}

function login_user($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_user WHERE email = '".$request['email']."'";
	$result = $wpdb->get_results($sql_query);
	$user_info = json_encode($result);
	if($result[0]->password == $request['password']){
		$sql_query = "UPDATE tb_user SET loginStatus=1 WHERE uid='".$result[0]->uid."'";
		$wpdb->get_results($sql_query);
		return json_encode($result[0]);
	}
	else
		return 0;
	//return json_encode($result);
}

function pay_with_stripe($request) {
	global $wpdb;
	
	$token = $request['token'];
	$lives = $request['livesNum'];
	$currency = $request['currency'];
	$uid = $request['uid'];
	$pay_type = 0;
	$pay_fee = 0;
	$pay_currency="usd";
	
	$amount = $lives * 100;
	
	try {
		$sql_query = "INSERT INTO tb_stripe_history (uid, pay_date, pay_amount, pay_fee, pay_currency, lives, token) VALUES ('".$uid."', now(), ".$amount.", ".$pay_fee.", '".$currency."', ".$lives.",'".$token."')";
		$result = $wpdb->query($sql_query);

		if ($result != 1)
			return 'database error';
	} catch(Exception $e) {
		return $e->getMessage();
	}
	
	try {
		$charge = \Stripe\Charge::create(array(
		  "amount" => $amount,
		  "currency" => $currency,
		  "description" => "Buy SnapSniper Lives",
		  "source" => $token,
		));
		
// 		$stripe_amount = $charge['amount'];
// 		$stripe_currency = $charge['currency'];
// 		$stripe_payment_card_exp_year = $charge['payment_method_details']['card']['exp_year'];
// 		$stripe_payment_card_exp_month = $charge['payment_method_details']['card']['exp_month'];
// 		$stripe_payment_card_brand = $charge['payment_method_details']['card']['brand'];//'MasterCard'
// 		$stripe_payment_card_fingerprint = $charge['payment_method_details']['card']['fingerprint'];
// 		$stripe_payment_card_funding = $charge['payment_method_details']['card']['funding'];
// 		$stripe_payment_card_network = $charge['payment_method_details']['card']['network'];

		$stripe_created = $charge['created'];//1582292122
		$stripe_balance_transaction = $charge['balance_transaction'];//'txn_1GEbf4CrzGywnnPWzVCgBaOr'
		$stripe_id = $charge['id'];//'ch_1GEbf4CrzGywnnPWdReFBA0L'
		$stripe_object = $charge['object'];	//'charge'
		$stripe_outcome_risk_level = $charge['outcome']['risk_level'];//'normal'
		$stripe_outcome_risk_score = $charge['outcome']['risk_score'];//63
		$stripe_outcome_seller_message = $charge['outcome']['seller_message'];//'Payment complete.'
		$stripe_outcome_authorized = $charge['outcome']['type'];//'authorized'
		$stripe_paid = $charge['paid'];//true
		$stripe_payment = $charge['payment_method'];//'card_1GEbesCrzGywnnPWw2LYvZGA'
		$stripe_payment_type = $charge['payment_method_details']['type'];//'card'
		$stripe_payment_card_last4 = $charge['payment_method_details']['card']['last4'];//'4444'
		$stripe_receipt_url = $charge['receipt_url'];
		$stripe_refunds_url = $charge['refunds']['url'];				
		$stripe_source_check = $charge['source']['cvc_check'];//'pass'
		$stripe_status = $charge['status'];//'succeeded'
		
		$sql_query = "UPDATE tb_stripe_history SET stripe_created=".$stripe_created.", stripe_balance_transaction='".$stripe_balance_transaction."', stripe_id='".$stripe_id."', stripe_object='".$stripe_object."', stripe_outcome_risk_level='".$stripe_outcome_risk_level."', stripe_outcome_risk_score=".$stripe_outcome_risk_score.", stripe_outcome_seller_message='".$stripe_outcome_seller_message."', stripe_outcome_authorized='".$stripe_outcome_authorized."', stripe_paid='".$stripe_paid."', stripe_payment='".$stripe_payment."', stripe_payment_type='".$stripe_payment_type."', stripe_payment_card_last4='".$stripe_payment_card_last4."', stripe_receipt_url='".$stripe_receipt_url."', stripe_refunds_url='".$stripe_refunds_url."', stripe_source_check='".$stripe_source_check."', stripe_status='".$stripe_status.
			"' WHERE token='".$token."'";
		$wpdb->get_results($sql_query);
		
		if ($stripe_status == 'succeeded') { //charge lives
			$sql_query = "UPDATE tb_user_settings SET currentLives=currentLives+".$lives." WHERE uid='".$uid."'";
			$wpdb->get_results($sql_query);
		}
		
		return $stripe_status;
	}
	catch (Exception $e) {
		return $e->getMessage();
	}
}

function gof_login_user($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_user WHERE email = '".$request['email']."'";
	$result = $wpdb->get_results($sql_query);
	$user_info = json_encode($result);
	
	$token_len = strlen($request['idToken']);
	
	if($token_len > 5){
		$sql_query = "UPDATE tb_user SET loginStatus=1 WHERE uid='".$result[0]->uid."'";
		$wpdb->get_results($sql_query);
		
		return json_encode($result[0]);
	}
	else
		return $token_len;
	//return json_encode($result);
}

function resetPwd($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_user WHERE email = '".$request['email']."'";
	$result = $wpdb->get_results($sql_query);
	if($wpdb->num_rows == 0) {
		return json_encode(array('result' => 0));
	}
	$user_info = json_encode($result);
	
	$pwdlen = strlen($request['password']);
	
	if($pwdlen < 5){
		return json_encode(array('result' => 1));
	}
	$ret = send_email($request['email'], $request['password']);
	if($ret == 0) return json_encode(array('result' => 3));
	else return json_encode(array('result' => 2));
}
$key = 'rpgassassinsecretkey';
$iv = '12345678';
$cipher = mcrypt_module_open(MCRYPT_BLOWFISH,'','cbc','');
function data_encrypt($cc) {
	mcrypt_generic_init($cipher, $key, $iv);
	$encrypted = mcrypt_generic($cipher,$cc);
	mcrypt_generic_deinit($cipher);
	return $encrypted;
}
function data_decrypt($encrypted) {
	mcrypt_generic_init($cipher, $key, $iv);
	$decrypted = mdecrypt_generic($cipher,$encrypted);
	mcrypt_generic_deinit($cipher);
	return $decrypted;
}

function send_email($email, $password) {
	$to = $email;
	$subject = 'Reset Snap Sniper password';
	
	$code = $email.'-'.$password;
	
	//$encrypted = data_encrypt($code);	
	$encrypted = my_simple_crypt( $code, 'e' );
	
	$url = 'http://vps271456.vps.ovh.ca/?rest_route=/rest/v1/confirmPassword&data='.$encrypted;
	$body = get_resetPwd_template($url);
	$headers = array('Content-Type: text/html; charset=UTF-8');
	wp_mail( $to, $subject, $body, $headers );
	return 1;
}

function confirmPwd($request) {
	return 0;
	try{
		$encrypted = $request['data'];
		$decrypted = data_decrypt($encrypted);
		$pieces = explode("-", $decrypted);
		$email = $pieces[0];
		$password = $pieces[1];
		$sql_query = "UPDATE tb_user SET password=".$password." WHERE email='".$email."'";
		$wpdb->get_results($sql_query);
// 		redirect("https://www.gmail.com/");
	} catch(Exception $e) {
// 		redirect("https://www.google.com/");
	}

	$data=[];
// 	$response = new WP_REST_Response( $data );
// 	// Add a custom status code
// 	$response->set_status( 201 );
// 	// Add a custom header
// 	$response->header( 'Location', 'http://google.com/' );
// 	return $response;

	return new WP_Error( 'fspider', 'That is good error', array( 'status' => 404 ) );
}

function confirmPassword($request) {    
	global $wpdb;
	$data = $request['data'];	
	$decrypted = my_simple_crypt( $data, 'd' );
	
	///////////////////////////////////////////////////////////////////
	$pieces = explode("-", $decrypted);
	$dec_email = $pieces[0];
	$dec_pass = $pieces[1];
 	$sql_query = "UPDATE tb_user SET password='".$dec_pass."' WHERE email='".$dec_email."'";

	try {
		$res = $wpdb->query($sql_query);
		if($res == false) {
			$response = '<html><a href="https://mail.google.com/mail/">Error while updating password. Go back to the mailbox</a><script>location.href="https://mail.google.com/mail/"</script><html>';
			
			header('Content-Type: text/html');
			echo $response;
			exit();			
 			//return $response;
		}
	}
	catch(Exception $e) {
		return json_encode($e);
	}
	///////////////////////////////////////////////////////////////////
	
// 	$response = array('result'=>'success');	
 	$response = '<html><a href="https://mail.google.com/mail/">Error while updating password. Go back to the mailbox</a><script>location.href="https://mail.google.com/mail/"</script><html>';
//     $response = new WP_REST_Response($response);
//     $response->set_status(200);
// 	$response->header( 'Location', 'https://mail.google.com/mail/' );

	header('Content-Type: text/html');
	echo $response;
	exit();		    

	//return $response;
}

function upload_image($request) {
	$fileTmpPath = $_FILES['photo']['tmp_name'];
	$fileName = $_FILES['photo']['name'];
	$fileSize = $_FILES['photo']['size'];
	$fileType = $_FILES['photo']['type'];
	$uid = $request['uid'];
	$bFront = $request['bFront'];
	$fileNameCmps = explode(".", $fileName);
	$fileExtension = strtolower(end($fileNameCmps));
	$newFileName = $fileName;
	
	$uploadFileDir = 'uploadedPhotos/';
	$dest_path = $uploadFileDir . $newFileName;

	if(move_uploaded_file($fileTmpPath, $dest_path))
	{
	  	$message ='File is successfully uploaded.';
 		convertImage($dest_path, $dest_path, 10);
		return $dest_path;
	}
	else
	{
	  $message = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
	}
	return $message;
}

function update_profile($request) {
	global $wpdb;
	$from = new DateTime($request['birthday']);
	$to   = new DateTime('today');
	$age = $from->diff($to)->y;
	$sql_query = "UPDATE tb_user SET photoUrlFront='".$request['photoUrlFront']."', photoUrlSide='".$request['photoUrlSide']."', loginStatus=1, status='Rookie', dateJoined='".date('Y-m-d h:m:s')."', age=".$age." WHERE uid='".$request['uid']."'";
	$result = $wpdb->query($sql_query);
	return login_user($request);
}

function register_settings($request) {
	global $wpdb;
	$sql_query = "INSERT INTO tb_user_settings (uid, free_kills, free_deaths, secret_kills, secret_deaths, group_kills, group_deaths, pick_kills, pick_deaths, currentPoints, currentLives, isPlayingRand, isPlayingSecret, isPlayingGroup, groupNames,curGroupName, isVisible) VALUES ('".$request['uid']."', ".$request['free_kills'].", ".$request['free_deaths'].", ".$request['secret_kills'].", ".$request['secret_deaths'].", ".$request['group_kills'].", ".$request['group_deaths'].", ".$request['pick_kills'].", ".$request['pick_deaths'].", ".$request['currentPoints'].", ".$request['currentLives'].", ".$request['isPlayingRand'].", ".$request['isPlayingSecret'].", ".$request['isPlayingGroup'].", '".$request['groupNames']."', '".$request['curGroupName']."', ".$request['isVisible'].")";
	$result = $wpdb->query($sql_query);
	return $result;
}

function get_user_settings($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_user_settings WHERE uid='".$request['uid']."'";
	$result = $wpdb->get_results($sql_query);
	return json_encode($result[0]);
}

function update_user_settings($request) {
	global $wpdb;
 	$sql_query = "UPDATE tb_user_settings SET isPlayingPick=".$request['isPlayingPick'].", isPlayingSecret=".$request['isPlayingSecret'].", isPlayingGroup=".$request['isPlayingGroup'].", isVisible=".$request['isVisible']." WHERE uid='".$request['uid']."'";
	$result = $wpdb->query($sql_query);
	return $result;
}

function set_location($request) {
	global $wpdb;
	$sql_query = "UPDATE tb_user SET latitude=".$request['latitude'].", longitude=".$request['longitude'].", locationName='".$request['locationName']."' WHERE uid='".$request['uid']."'";
	$result = $wpdb->query($sql_query);
	return $result;
}

function upload_compare_photo($request) {
	global $wpdb;
	$fileTmpPath = $_FILES['compPhoto']['tmp_name'];
	$fileName = $_FILES['compPhoto']['name'];
	$fileSize = $_FILES['compPhoto']['size'];
	$fileType = $_FILES['compPhoto']['type'];
	$uid = $request['uid'];
	$minLat = (float)$request['latitude']-0.02;
	$maxLat = (float)$request['latitude']+0.02;
	$minLon = (float)$request['longitude']-0.02;
	$maxLon = (float)$request['longitude']+0.02;
	$fileNameCmps = explode(".", $fileName);
	$fileExtension = strtolower(end($fileNameCmps));
	$newFileName = $fileName;
	
	$uploadFileDir = 'uploadedPhotos/';
	$dest_path = $uploadFileDir . $newFileName;

	if(move_uploaded_file($fileTmpPath, $dest_path))
	{
	  	$message ='File is successfully uploaded.';
 		convertImage($dest_path, $dest_path, 10);
// 		$sql_query="SELECT name, uid, photoUrlFront, photoUrlSide FROM tb_user WHERE uid<>'".$request['uid']."' AND latitude BETWEEN ".$minLat." AND ".$maxLat." AND longitude BETWEEN ".$minLon." AND ".$maxLon;
// 		$result = $wpdb->get_results($sql_query);
		$min = 1.0;
		$min_user = $result[0];
		$opponents = json_decode($request['opponentPlayers']);
// 		foreach($result as $user) {
		foreach($opponents as $user) {
			$compareRes = file_get_contents("http://localhost:5000/compare?source_face=/var/www/html/wordpress/uploadedPhotos/".$user->uid."_Front.jpg&target_face=/var/www/html/wordpress/".$dest_path);
			if($compareRes==false) continue;
			if($compareRes < $min) {
				$min = $compareRes;
				$min_user=$user;
			}
			
			$compareRes = file_get_contents("http://localhost:5000/compare?source_face=/var/www/html/wordpress/uploadedPhotos/".$user->uid."_Side.jpg&target_face=/var/www/html/wordpress/".$dest_path);
			if($compareRes==false) continue;
			if($compareRes < $min) {
				$min = $compareRes;
				$min_user=$user;
			}
		}
// 		$compareRes = file_get_contents("http://localhost:5000/compare?source_face=../wordpress/uploadedPhotos/".$request['uid']."_Front.jpg&target_face=../wordpress/".$dest_path);
		//$compareRes = file_get_contents("http://localhost:5000/compare?source_face=sample/source.jpg&target_face=sample/target.jpg");
		if($min > 0.5) {
			return "NoMatch";
		}
		return json_encode($min_user);
	}
	else
	{
	  $message = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
	}
	return $message;
}

function update_score($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_mission_score";
	$result = $wpdb->get_results($sql_query);
	$group_game = (int)$result[0]->group_game;
	$free_game = (int)$result[0]->free_game;
	$secret_min = (int)$result[0]->secret_min;
	$secret_max = (int)$result[0]->secret_max;
	$chosen_kill = (int)$result[0]->chosen_kill;
	
	//Update victim scores
	$sql_query = "SELECT * FROM tb_user_settings WHERE uid='".$request['victim_uid']."'";
	$res = $wpdb->get_results($sql_query);
	$lives = (int)($res[0]->currentLives)-1;
	$lives = $lives < 0 ? 0 : $lives;
	switch($request['curGame']){
		case 'free':
			$score = (int)($res[0]->currentPoints) - 100;
			$score = $score < 0 ? 0 : $score;
			$sql_query = "UPDATE tb_user_settings SET currentLives=".$lives.", free_deaths=".((int)$res[0]->free_deaths+1).", currentPoints=".$score." WHERE uid='".$request['victim_uid']."'";
			break;
		case 'group':
			$score = (int)($res[0]->currentPoints) - 100;
			$score = $score < 0 ? 0 : $score;
			$sql_query = "UPDATE tb_user_settings SET currentLives=".$lives.", group_deaths=".((int)$res[0]->group_deaths+1).", currentPoints=".$score." WHERE uid='".$request['victim_uid']."'";
			break;
		case 'secret':
			$score = (int)($res[0]->currentPoints) - 100;
			$score = $score < 0 ? 0 : $score;
			$sql_query = "UPDATE tb_user_settings SET currentLives=".$lives.", secret_deaths=".((int)$res[0]->secret_deaths+1).", currentPoints=".$score." WHERE uid='".$request['victim_uid']."'";
			break;
		case 'pick':
			$score = (int)($res[0]->currentPoints) / 2;
			$score = $score < 0 ? 0 : $score;
			$sql_query = "UPDATE tb_user_settings SET currentLives=".$lives.", pick_deaths=".((int)$res[0]->pick_deaths+1).", currentPoints=".$score." WHERE uid='".$request['victim_uid']."'";
			break;
	}
	$res = $wpdb->query($sql_query);
	if($res == false){
		$message = "Error while updating victim scores.";
		return json_encode($message);
	}
	
	//Update killer scores
	$sql_query = "SELECT * FROM tb_user_settings WHERE uid='".$request['killer_uid']."'";
	$res = $wpdb->get_results($sql_query);
	$curPoint = (int)($res[0]->currentPoints);
	switch($request['curGame']){
		case 'free':
			$score = $curPoint + $free_game;
			$sql_query = "UPDATE tb_user_settings SET free_kills=".((int)($request['free_kills'])+1).", currentPoints=".$score." WHERE uid='".$request['killer_uid']."'";
			break;
		case 'group':
			$score = $curPoint + $group_game;
			$sql_query = "UPDATE tb_user_settings SET group_kills=".((int)($request['group_kills'])+1).", currentPoints=".$score." WHERE uid='".$request['killer_uid']."'";
			break;
		case 'secret':
			$score = $curPoint + rand($secret_min, $secret_max);
			$sql_query = "UPDATE tb_user_settings SET secret_kills=".((int)($request['secret_kills'])+1).", currentPoints=".$score." WHERE uid='".$request['killer_uid']."'";
			break;
		case 'pick':
			$sql_query = "SELECT currentPoints FROM tb_user_settings WHERE uid='".$request['victim_uid']."'";
			$res = $wpdb->get_results($sql_query);
			$half = (int)(((int)$res[0]->currentPoints)*$chosen_kill/100);
			$score = $curPoint + $half;
			$sql_query = "UPDATE tb_user_settings SET pick_kills=".((int)$request['pick_kills']+1).", currentPoints=".$score." WHERE uid='".$request['killer_uid']."'";
			break;
	}
	$res = $wpdb->query($sql_query);
	if($res != false){
		$sql_query = "SELECT * FROM tb_user_settings WHERE uid='".$request['killer_uid']."'";
		$res = $wpdb->get_results($sql_query);
		return json_encode($res[0]);
	}
	return json_encode($res);
}

function get_all_locations($request) {
	global $wpdb;
	$minLat = (float)$request['latitude']-0.01;
	$maxLat = (float)$request['latitude']+0.01;
	$minLon = (float)$request['longitude']-0.01;
	$maxLon = (float)$request['longitude']+0.01;
	$sql_query = "SELECT tb_user.uid, tb_user.latitude, tb_user.longitude, tb_user.name, tb_user.photoUrlFront, tb_user.status, tb_user_settings.currentPoints FROM tb_user INNER JOIN tb_user_settings ON tb_user.uid=tb_user_settings.uid WHERE latitude BETWEEN ".$minLat." AND ".$maxLat." AND longitude BETWEEN ".$minLon." AND ".$maxLon." AND tb_user.uid<>'".$request['uid']."' AND tb_user_settings.currentLives>0;";
	$result = $wpdb->get_results($sql_query);
	return json_encode($result);
}

function get_score_table($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_mission_score";
	$result = $wpdb->get_results($sql_query);
	return json_encode($result[0]);
}

function get_player_scores($request) {
	global $wpdb;
	$sql_query = "SELECT tb_user.uid, tb_user.photoUrlFront, tb_user_settings.currentPoints, tb_user.locationName FROM tb_user INNER JOIN tb_user_settings ON tb_user.uid=tb_user_settings.uid ORDER BY tb_user_settings.currentPoints DESC;";
	$result = $wpdb->get_results($sql_query);
	$rank = 0;
	$ind = 0;
	foreach($result as $member) {
		$ind++;
		$sql_query = "UPDATE tb_user_settings SET rank = ".$ind." WHERE uid = '".$member->uid."'";
		$wpdb->query($sql_query);
	}
	
	return json_encode($result);
}

function pick_a_target($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_user INNER JOIN tb_user_settings ON tb_user.uid=tb_user_settings.uid WHERE tb_user.uid='".$request['uid']."'";
	$result = $wpdb->get_results($sql_query);
	return json_encode($result);
}

function update_notify($request) {
	global $wpdb;
	$sql_query = "UPDATE tb_user SET notifications='".$request['notifications']."'";
	$result = $wpdb->query($sql_query);
	return $result;
}

function update_history($request) {
	global $wpdb;
	$logTime=time();
	$notification_uid=md5($logTime+$request['killerUid']);
	$sql_query = "INSERT INTO tb_score_history (notification_uid, notification_type, missionType, logTime, killerName, killerUid, victimName, victimUid, killerCurrentScore, isSeen) VALUES ('".$notification_uid."', 'killed', '".$request['mission_type']."', '".date("Y-m-d H:i:s",$logTime)."', '".$request['killerName']."', '".$request['killerUid']."', '".$request['victimName']."', '".$request['victimUid']."', '".$request['killerCurrentScore']."', 0)";
	$result = $wpdb->query($sql_query);
	return $result;
}

function get_notifications_($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_score_history WHERE isSeen=0 AND notification_uid='".$request['uid']."'";
	$result = $wpdb->get_results($sql_query);
// 	return $result;
	return json_encode($result);
}

function get_notifications($request) {
	global $wpdb;
	
// 	$sql_query = "select * from tb_notifications where LOCATE('".$request["uid"]."'),isSeen)=0";
	$sql_query = "select * from tb_notifications where (LOCATE('".$request["uid"]."',from_user_id)>0 or LOCATE('".$request["uid"]."',to_user_id)>0) and LOCATE('".$request["uid"]."',isDelete)=0";
			
	$result = $wpdb->get_results($sql_query);
	return json_encode($result);
}

function create_group($request) {
	global $wpdb;
	$logTime=time();
	$group_uid=md5($logTime.$request['groupName']);
	$sql_query = "INSERT INTO tb_group (groupCreator, groupName, createdTime, groupPlayers, startDate, endDate, startTime, endTime, group_uid, acceptedMembers, isOpened) VALUES ('".$request['groupCreator']."', '".$request['groupName']."', '".date("Y-m-d H:i:s", $logTime)."', '".json_encode($request['groupPlayers'])."', '".$request['startDate']."', '".$request['endDate']."', '".$request['startTime']."', '".$request['endTime']."', '".$group_uid."', '".json_encode($request['acceptedMembers'])."', 1)";
	$result = $wpdb->query($sql_query);
	if($result == 1){
		return json_encode($group_uid);
	}
	return $result;
}

function start_group_game($request) {
	global $wpdb;
	$sql_query = "UPDATE tb_user_settings SET isPlayingGroup=1, curGroupName='".$request['group_uid']."' WHERE uid='".$request['uid']."'";
	$result = $wpdb->query($sql_query);
	$sql_query = "SELECT acceptedMembers FROM tb_group WHERE group_uid='".$request['group_uid']."'";
	$result = $wpdb->get_results($sql_query);
	$accepted_members = json_decode($result[0]->acceptedMembers);
	$sql_query = "SELECT * FROM tb_user INNER JOIN tb_user_settings ON tb_user.uid=tb_user_settings.uid WHERE tb_user.uid='".$accepted_members[0]."'";
	foreach($accepted_members as $member) {
		$sql_query = $sql_query." OR tb_user.uid='".$member."'";
	}
	$result = $wpdb->get_results($sql_query);
	return json_encode($result);
}

function end_group_game($request) {
	global $wpdb;
	$sql_query = "UPDATE tb_user_settings SET isPlayingGroup=0, curGroupName='' WHERE uid='".$request['uid']."'";
	$result = $wpdb->query($sql_query);
	$sql_query = "UPDATE tb_group SET isOpened=0 WHERE group_uid='".$request['group_uid']."'";
	$result = $wpdb->query($sql_query);
	return $result;
}

function get_group_game_status($request) {
	global $wpdb;
	$sql_query = "SELECT * FROM tb_group WHERE group_uid='".$request['group_uid']."'";
	$result = $wpdb->get_results($sql_query);
	return json_encode($result[0]);
}
function register_notification($request) {
	global $wpdb;
	if ($request['fmsToken'] == '') return 400;
	$sql_query = "UPDATE tb_user_settings SET fmsToken = '".$request['fmsToken']."' WHERE uid ='".$request['uid']."'";
	$result = $wpdb->query($sql_query);
	return json_encode($result);
}
function send_notification($request) {
	global $wpdb;
	$message_id = $request['message_id'];
	$from_user_id = $request['from_user_id'];
	$to_user_id = $request['to_user_id'];
	$data = $request['data'];
	
	if($message_id == 'group_invite') {
		$group_uid = $data['group_uid'];
		$notification_uid = md5(time()+$message_id);
		$sql_query = "INSERT INTO tb_notifications (notification_uid, from_user_id, to_user_id, message_id, data, isSeen, isDelete) VALUES ('".$notification_uid."','".$from_user_id."', '".json_encode($to_user_id)."', '".$message_id."', '".json_encode($data)."', '', '')";
		$result = $wpdb->query($sql_query);
		$sql_query = "SELECT * FROM tb_group WHERE group_uid='".$group_uid."'";
		$result = $wpdb->get_results($sql_query);
		if($wpdb->num_rows == 0) {
			return json_encode(array('result' => -1));
		}

		$groupPlayers = json_decode($result[0]->groupPlayers);
		$send_data = array('message_data' => json_encode($data), 'message_id' => $message_id, 'notification_uid' => $notification_uid);
		$ret = send_push_notifications($groupPlayers, 'Notify', 'Group Game Invitation', $send_data);
		return $ret;
	} else if($message_id == 'accept_invitation') {
		$sender = $data['sender'];
		$send_data = array('message_data' => json_encode($data), 'message_id' => $message_id);
		$ret = send_push_notifications([$to_user_id],'Notify', '<'.$sender.'> Accepted Invitation', $send_data);
		return $ret;
	} else if($message_id == 'kill') {
		$killerName = $data['killerName'];
		$send_data = array('message_data' => json_encode($data), 'message_id' => $message_id);
		$ret = send_push_notifications([$to_user_id],'Notify', '<'.$killerName.'> Killed You!', $send_data);
		return $ret;
	}
	return "-2";
	
/*	if($message_id == 'group_invite') {
		if($result == 1) {
			return $notification_uid;
		}
		return $result;
		
	}*/
	

}

function set_notification_seen($request) {
	global $wpdb;
	$sql_query = "UPDATE tb_notifications SET isSeen=concat(isSeen, ',', '".$request['uid']."') WHERE notification_uid='".$request['notification_uid']."'";
	$result = $wpdb->query($sql_query);
	return $result;
}

function set_notification_delete($request) {
	global $wpdb;
	$sql_query = "UPDATE tb_notifications SET isDelete=concat(isDelete, ',', '".$request['uid']."') WHERE notification_uid='".$request['notification_uid']."'";
	$result = $wpdb->query($sql_query);
	return $result;
}

function add_to_acceptedMembers($request) {
	global $wpdb;
	$sql_query = "UPDATE tb_group SET acceptedMembers='".json_encode($request['acceptedMembers'])."' WHERE group_uid='".$request['group_uid']."'";
	$result = $wpdb->query($sql_query);
	return $result;
}

function create_secret_mission($request) {
	global $wpdb;
	$minLat = (float)$request['latitude']-0.01;
	$maxLat = (float)$request['latitude']+0.01;
	$minLon = (float)$request['longitude']-0.01;
	$maxLon = (float)$request['longitude']+0.01;
	$sql_query = "SELECT * FROM tb_user INNER JOIN tb_user_settings ON tb_user.uid=tb_user_settings.uid WHERE latitude BETWEEN ".$minLat." AND ".$maxLat." AND longitude BETWEEN ".$minLon." AND ".$maxLon." AND tb_user.uid<>'".$request['uid']."' AND tb_user_settings.currentLives>0;";
	$result = $wpdb->get_results($sql_query);
	$ind = rand(0, count($result)-1);
	return json_encode($result[$ind]);
}

function register_secret_opponent($request) {
	global $wpdb;
	$sql_query = "UPDATE tb_user_settings SET isPlayingSecret = 1, secretOpponent='".json_encode($request['opponent'])."' WHERE uid = '".$request['uid']."'";
	$result=$wpdb->query($sql_query);
	return $result;
}

function get_secret_opponent($request) {
	global $wpdb;
	$sql_query = "SELECT secretOpponent FROM tb_user_settings WHERE uid='".$request['uid']."'";
	$result = $wpdb->get_results($sql_query);
	return $result[0]->secretOpponent;
}

function test($request){
// 	$compareRes = file_get_contents("http://localhost:5000/compare?source_face=".$request['source_face']."&target_face=".$request['target_face']."");
// 	echo $compareRes;
	$device_token = ['cZORSjaH2ms:APA91bHDcdQqYDMIUknF-W3bogCdDFz8c7GD-2VpFzRV_H45FHTbI3Lzz_js-Ra2veCXIe6Yqv07gidQfYsEgR1UPMutHYS4nGpazK_JRg2a78ue1uKfIg56cXkh1xKJWSBcku2Ooc_d'];
	$title = '';
	$body = '';
	$ret = send_fms_push_notification($device_token, $title, $body);
	return $ret;
}

function send_push_notifications($uids, $title, $body, $data) {
	global $wpdb;
	$fmsTokenList = [];
	foreach($uids as $uid) {
		$sql_query = "SELECT fmsToken FROM tb_user_settings WHERE uid='".$uid."'";
		$result = $wpdb->get_results($sql_query);
		if($wpdb->num_rows == 0) continue;
		$fmsToken = $result[0]->fmsToken;
		if($fmsToken == '' || $fmsToken == null) continue;
		$ret = send_fms_push_notification([$fmsToken], $title, $body, $data);
		array_push($fmsTokenList, $fmsToken);
	}
	return $ret;
}
function send_fms_push_notification($device_token, $title, $body, $data)    {
	global $FIREBASE_API_KEY;
    if (!empty($device_token) && $device_token != 'NULL') {
	$device_token = json_decode(json_encode($device_token));
	$notification = array('title' => $title, 'body' => $body, 'sound' => 'default', 'badge' => '1');
	$fields = array('registration_ids' => $device_token, 'notification' => $notification, 'priority' => 'high', 'data' => $data);
	$args = array(
	  'timeout'   => 45,
	  'redirection' => 5,
	  'httpversion' => '1.1',
	  'method'    => 'POST',
	  'body'      => json_encode($fields),
	  'sslverify'     => false,
	  'headers'     => array(
		'Content-Type' => 'application/json',
		'Authorization' => 'key=' . $FIREBASE_API_KEY,
	  ),
	  'cookies'     => array()
	);

 	$response = wp_remote_post('https://fcm.googleapis.com/fcm/send', $args);

	return $response['response'];
  }
	return "Nothing";
}

add_action('rest_api_init', function () {
	register_rest_route( 'rest/v1', 'posts',array(
		'methods'  => 'POST',
		'callback' => 'get_latest_posts_by_category'
	));
	register_rest_route( 'rest/v1', 'register',array(
		'methods'  => 'POST',
		'callback' => 'register_user'
	));
	register_rest_route( 'rest/v1', 'login',array(
		'methods'  => 'POST',
		'callback' => 'login_user'
	));
	register_rest_route( 'rest/v1', 'gof_login',array(
		'methods'  => 'POST',
		'callback' => 'gof_login_user'
	));
	register_rest_route( 'rest/v1', 'resetPwd',array(
		'methods'  => 'POST',
		'callback' => 'resetPwd'
	));
	register_rest_route( 'rest/v1', 'payWithStripe',array(
		'methods'  => 'POST',
		'callback' => 'pay_with_stripe'
	));
	//register_rest_route( 'rest/v1', 'confirmPwd/data=(?P<data>[a-zA-Z0-9-]+)',array(
	register_rest_route( 'rest/v1', 'confirmPwd',array(
		'methods'  => 'POST',
		'callback' => 'confirmPwd'
	));
	register_rest_route( 'rest/v1', 'confirmPassword',array(
                'methods'  => 'GET',
                'callback' => 'confirmPassword'
      ));
	register_rest_route( 'rest/v1', 'upload',array(
		'methods'  => 'POST',
		'callback' => 'upload_image'
	));
	register_rest_route( 'rest/v1', 'update',array(
		'methods'  => 'POST',
		'callback' => 'update_profile'
	));
	register_rest_route( 'rest/v1', 'registerSettings',array(
		'methods'  => 'POST',
		'callback' => 'register_settings'
	));
	register_rest_route( 'rest/v1', 'getSettings',array(
		'methods'  => 'POST',
		'callback' => 'get_user_settings'
	));
	register_rest_route( 'rest/v1', 'updateSettings',array(
		'methods'  => 'POST',
		'callback' => 'update_user_settings'
	));
	register_rest_route( 'rest/v1', 'setLocation',array(
		'methods'  => 'POST',
		'callback' => 'set_location'
	));
	register_rest_route( 'rest/v1', 'uploadCompPhoto',array(
		'methods'  => 'POST',
		'callback' => 'upload_compare_photo'
	));
	register_rest_route( 'rest/v1', 'getAllLocations',array(
		'methods'  => 'POST',
		'callback' => 'get_all_locations'
	));
	register_rest_route( 'rest/v1', 'updateScore',array(
		'methods'  => 'POST',
		'callback' => 'update_score'
	));
	register_rest_route( 'rest/v1', 'getScoreTable',array(
		'methods'  => 'GET',
		'callback' => 'get_score_table'
	));
	register_rest_route( 'rest/v1', 'getPlayerScores',array(
		'methods'  => 'GET',
		'callback' => 'get_player_scores'
	));
	register_rest_route( 'rest/v1', 'PickTarget',array(
		'methods'  => 'POST',
		'callback' => 'pick_a_target'
	));
	register_rest_route( 'rest/v1', 'updateNotify',array(
		'methods'  => 'POST',
		'callback' => 'update_notify'
	));
	register_rest_route( 'rest/v1', 'updateHistory',array(
		'methods'  => 'POST',
		'callback' => 'update_history'
	));
	register_rest_route( 'rest/v1', 'registerNotification',array(
		'methods'  => 'POST',
		'callback' => 'register_notification'
	));
	register_rest_route( 'rest/v1', 'getAllNotifications',array(
		'methods'  => 'POST',
		'callback' => 'get_notifications'
	));
	register_rest_route( 'rest/v1', 'createGroup',array(
		'methods'  => 'POST',
		'callback' => 'create_group'
	));
	register_rest_route( 'rest/v1', 'startGroupGame',array(
		'methods'  => 'POST',
		'callback' => 'start_group_game'
	));
	register_rest_route( 'rest/v1', 'endGroupGame',array(
		'methods'  => 'POST',
		'callback' => 'end_group_game'
	));
	register_rest_route( 'rest/v1', 'getGroupGameStatus',array(
		'methods'  => 'POST',
		'callback' => 'get_group_game_status'
	));
	register_rest_route( 'rest/v1', 'sendNotification',array(
		'methods'  => 'POST',
		'callback' => 'send_notification'
	));
	register_rest_route( 'rest/v1', 'setNotificationSeen',array(
		'methods'  => 'POST',
		'callback' => 'set_notification_seen'
	));
	register_rest_route( 'rest/v1', 'setNotificationDelete',array(
		'methods'  => 'POST',
		'callback' => 'set_notification_delete'
	));
	register_rest_route( 'rest/v1', 'addToAcceptedMembers',array(
		'methods'  => 'POST',
		'callback' => 'add_to_acceptedMembers'
	));
	register_rest_route( 'rest/v1', 'createSecretMission',array(
		'methods'  => 'POST',
		'callback' => 'create_secret_mission'
	));
	register_rest_route( 'rest/v1', 'registerSecretOpponent',array(
		'methods'  => 'POST',
		'callback' => 'register_secret_opponent'
	));
	register_rest_route( 'rest/v1', 'getSecretOpponent',array(
		'methods'  => 'POST',
		'callback' => 'get_secret_opponent'
	));
	
	register_rest_route( 'rest/v1', 'test',array(
		'methods'  => 'GET',
		'callback' => 'test'
	));
  });
