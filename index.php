<!doctype html>
<html>
	<head>
		<title>Collatz Conjecture</title>
		<meta charset="UTF-8">
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<link rel="stylesheet" href="./styles.css?v=<?php echo date( "U" );?>">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Turret+Road&display=swap">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap">
		<script src="./script.js?v=<?php echo date( "U" );?>"></script>
	</head>
	<body>
		<div id="main">
			<span id="title">Collatz Conjecture</span>
			<input id="numberField" type="number" min="0" max="9999999999" placeholder="positive integer">
			<div id="stepList">
				
			</div>
		</div>
		
		
		<script>/*global c*/window.addEventListener("load", c.initialize)</script>
	</body>
</html>