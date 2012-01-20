<!doctype html>
<html>
	<head>
		<meta charset="utf-8">

		<title>Gateway to API</title>

		<style>
			@import url(http://fonts.googleapis.com/css?family=Ubuntu);

			body {
				background: #eee;
				color: #6d6d6d;
				font: normal normal normal 14px/1.253 Ubuntu, sans-serif;
				margin: 0 0 25px 0;
				min-width: 800px;
				padding: 0;
			}

			#main {
				background-clip: padding-box;
				background-color: #fff;
				border:1px solid #ccc;
				border-radius: 5px;
				box-shadow: 0 0 10px #cdcdcd;
				margin: 25px auto 0;
				padding: 30px;
				width: 700px;
				position: relative;
			}

			#main h1 {
				font-family: 'Ubuntu';
				font-size: 38px;
				letter-spacing: 2px;
				margin: 0 0 10px 0;
				padding: 0;
			}

			#main h2 {
				color: #999;
				font-size: 18px;
				letter-spacing: 3px;
				margin: 0 0 25px 0;
				padding: 0 0 0 0;
			}

			#main h3 {
				color: #999;
				margin-top: 24px;
				padding: 0 0 0 0;
			}

			#main h3 {
				font-size: 18px;
			}

			#main p {
				line-height: 25px;
				margin: 10px 0;
			}

			#main pre {
				background-color: #333;
				border-left: 1px solid #d8d8d8;
				border-top: 1px solid #d8d8d8;
				border-radius: 5px;
				color: #eee;
				padding: 10px;
			}

			#main ul {
				margin: 10px 0;
				padding: 0 30px;
			}

			#main li {
				margin: 5px 0;
			}
		</style>
	</head>
	<body>
		<div id="main">
			<h1>What are you doing here?</h1>

			<h2>Are you lost?</h2>

			<p>
				You must be interested in the application architecture. I curl requests to a RESTful API that returns json.
			</p>

			<p>
				The APP and the API both use Laravel which is HIGHLY recommended if you are interested in developing PHP web applications of any kind:
			</p>

			<ul>
				<li><a href="http://laravel.com">Official Website</a></li>
				<li><a href="http://forums.laravel.com">Laravel Forums</a></li>
				<li><a href="http://github.com/laravel/laravel">GitHub Repository</a></li>
			</ul>
			
			<p>GET</p>
			<?php
				echo Form::open('curl', 'GET');
				echo Form::text('controller');
				echo Form::close();
			?>
			
			<p>POST</p>
			<?php
				echo Form::open('curl');
				echo Form::text('controller');
				echo Form::close();
			?>
			
			<br/>
			
			<p>PUT</p>
			<?php
				echo Form::open('curl', 'PUT');
				echo Form::text('controller');
				echo Form::close();
			?>
			
			<br/>
			
			<p>DELETE</p>
			<?php
				echo Form::open('curl', 'DELETE');
				echo Form::text('controller');
				echo Form::close();
			?>

		</div>
	</body>
</html>