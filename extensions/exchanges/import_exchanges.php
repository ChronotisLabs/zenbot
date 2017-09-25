<?php

	$pdo = new PDO('mysql:dbname=tombola',"tombola", "Q6l8aH3dLpeVuFLq"); 

	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);	
	if ($handle = opendir(".")) {
    	while (false !== ($file = readdir($handle))) {
        	if ('.' === $file) continue;
        	if ('..' === $file) continue;


		if (is_dir($file))
		{
			$arr = json_decode(file_get_contents($file."/products.json"));
			foreach($arr as $ex)
			{

				$common = explode("/",$ex->label);


				$query ="REPLACE INTO exchange_asset_aliases (exchange,exchange_asset,common_asset) VALUES('".$file."','".$ex->asset."','".$common[0]."')";
				try{
					$pdo->query($query);
				}catch(PDOException $ex)
				{
					echo $ex->getMessage();

					echo "\n". $query."\n";
					exit;
				}
				$query ="REPLACE INTO exchange_asset_aliases (exchange,exchange_asset,common_asset) VALUES('".$file."','".$ex->currency."','".$common[1]."')";
				try{
					$pdo->query($query);
				}catch(PDOException $ex)
				{
					echo $ex->getMessage();

					echo "\n". $query."\n";
					exit;
				}
			}
		}
	}
    	closedir($handle);
	}
?>
