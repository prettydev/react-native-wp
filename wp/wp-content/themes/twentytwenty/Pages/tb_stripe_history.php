<?php require '../../../../wp-load.php'; ?>

<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>RPGAssassin Backend Admin Panel</title>
    <meta name="description" content="RPGAssassin Backend Admin Panel">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pixeden-stroke-7-icon@1.2.3/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/css/flag-icon.min.css">

    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables.css">

    <!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/html5shiv/3.7.3/html5shiv.min.js"></script> -->
	
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style>
		body {
			font-family: "Lato", sans-serif;
		}

		.sidenav {
			height: 100%;
			width: 200px;
			position: fixed;
			z-index: 1;
			top: 0;
			left: 0;
			background-color: #111;
			overflow-x: hidden;
			padding-top: 20px;
		}

		.sidenav a {
			padding: 6px 6px 6px 32px;
			text-decoration: none;
			font-size: 25px;
			color: #818181;
			display: block;
		}

		.sidenav a:hover {
			color: #f1f1f1;
		}

		.main {
			margin-left: 230px; /* Same as the width of the sidenav */
		}

		@media screen and (max-height: 450px) {
			.sidenav {padding-top: 15px;}
			.sidenav a {font-size: 18px;}
		}
	</style>
	
	<style>
		img.rounded-circle {
			width: 45px;
			height: 45px;
			border-radius: 50%!important;
			vertical-align: middle;
		}
		.table td, .table th {
			vertical-align: middle;
			height: 55px;
		}
		table.dataTable td {
			padding: 3px 5px;
		}
		.round-img {
			text-align: center;
		}
	</style>

</head>
<body>
    <!-- Side Panel -->
	<div class="sidenav">
		<a href="/wp-content/themes/twentytwenty/Pages/tb_users.php">Users</a>
		<a href="/wp-content/themes/twentytwenty/Pages/tb_user_settings.php">User Settings</a>
		<a href="/wp-content/themes/twentytwenty/Pages/tb_group.php">Group</a>
		<a href="/wp-content/themes/twentytwenty/Pages/tb_score_history.php">History</a>
		<a href="/wp-content/themes/twentytwenty/Pages/tb_stripe_history.php">Payment</a>
	</div>
    <!-- Side Panel -->
	

    <!-- Right Panel -->

    <div id="right-panel" class="right-panel main">

        

        <div class="breadcrumbs">
            <div class="breadcrumbs-inner">
                <div class="row m-0">
                    <div class="col-sm-4">
                        <div class="page-header float-left">
                            <div class="page-title">
                                <h1>Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="animated fadeIn">
                <div class="row">
					
					<!-- tb_user_settings -->
					<div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Payment History Table</strong>
                            </div>
                            <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                <table class="table " id="user_setting_table">
                                    <thead>
                                        <tr>
                                            <th class="serial">#</th>
                                            <th class="avatar">Avatar</th>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Lives</th>
                                            <th>Date</th>
                                            <th>Last 4Digit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
										<?php
											global $wpdb;
											$sql_query = "SELECT
															tb_stripe_history.id,
															tb_stripe_history.uid,
															tb_stripe_history.pay_date,
															tb_stripe_history.pay_amount,
															tb_stripe_history.pay_fee,
															tb_stripe_history.pay_currency,
															tb_stripe_history.lives,
															tb_stripe_history.stripe_created,
															tb_stripe_history.stripe_payment_card_last4,
															tb_user.`name`,
															tb_user.screenName,
															tb_user.photoUrlFront
														FROM
															tb_stripe_history
														LEFT JOIN tb_user ON tb_user.uid = tb_stripe_history.uid ORDER BY tb_stripe_history.id DESC";
											$result = $wpdb->get_results($sql_query);
											for($i=0;$i<count($result);$i++){
												$name = $result[$i]->name;
												$avatarUrl = $result[$i]->photoUrlFront;
												$amount = number_format((float)$result[$i]->pay_amount / 100, 2, '.', '');;
												$currency = $result[$i]->pay_currency;
												$lives = $result[$i]->lives;
												$date = $result[$i]->pay_date;
												$last4digit = $result[$i]->stripe_payment_card_last4;
												
										?>
												<tr>
													<td class="serial"><?php echo $i+1; ?></td>
													<td class="avatar">
														<div class="round-img">
															<a href="#"><img class="rounded-circle" src="<?php echo $avatarUrl; ?>" alt=""></a>
														</div>
													</td>
													<td> <?php echo $name; ?> </td>
													<td> <?php echo $amount; ?> </td>
													<td> <?php echo $currency; ?> </td>
													<td> <?php echo $lives; ?> </td>
													<td> <?php echo $date; ?> </td>
													<td> <?php echo $last4digit; ?> </td>
												</tr>
										<?php
											}
										?>
                                    </tbody>
                                </table>
                            </div> <!-- /.table-stats -->
                        </div>
                    </div>
					<!-- tb_user_settings -->
					
            
        </div>
    </div><!-- .animated -->
</div><!-- .content -->


</div><!-- /#right-panel -->

<!-- Right Panel -->

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.4/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-match-height@0.7.2/dist/jquery.matchHeight.min.js"></script>
<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"></script>
<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js"></script>
	
	<script>
		$(function(){
			$("#user_setting_table").dataTable();
		})
	</script>

</body>
</html>
