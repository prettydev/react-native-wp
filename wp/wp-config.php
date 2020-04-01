<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress_db' );

/** MySQL database username */
define( 'DB_USER', 'wordpress_user' );

/** MySQL database password */
define( 'DB_PASSWORD', 'PASSWORD' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'FMub@hu(Any)4d65KN]bMl!2Ab@]CLwI, Td[QDcPvWJr8*}Nhy>(tI>`$dYvDaA' );
define( 'SECURE_AUTH_KEY',  'Fy27Nqxm.csxk-e.11~;82{gCac>ER1;0N}1hFU?c-q[U =ZRPN5><${u{0W{Mf*' );
define( 'LOGGED_IN_KEY',    '}Si2IgCB1^npWoN~}pMl)$|4-gpv,C4sD5NC%>b94H~n,3CD#pJR^a/[>#;M,1u&' );
define( 'NONCE_KEY',        '*hECaek<wl/h~:st>quT<z%w9/jAGezLVL>M6-B>h^e#!5zF]Kwp67jrAk2zA=@}' );
define( 'AUTH_SALT',        '`@hNVC6qDzTr.:VS>qu6&3{J]1;iu&#a#~Xv tgOjxcI/,D<Hv]6tGFLtJG+#NDX' );
define( 'SECURE_AUTH_SALT', '@Phv,FuM4% vPvaO=Y6u0l`oDS&KFLAFOmzy U7g#-+#5^dZ7O8OGJl<]Vx@b9qd' );
define( 'LOGGED_IN_SALT',   'tZ~v.~I,NdrN}{P`#m 5Tn<&+8{FY^2(;ke$s)80 R~$tY&{kGn(%a bZH8amOsb' );
define( 'NONCE_SALT',       'y~O4<MoTb;V_8yr8THQwog3(vq^G`,|yH<%JY=;bys!m3?/Qw3pEh}qAO&[&nG%2' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
