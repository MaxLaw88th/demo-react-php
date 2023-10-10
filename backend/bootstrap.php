<?php
use Illuminate\Database\Capsule\Manager as Capsule;

require './config.php';
require './vendor/autoload.php';

use Models\Database;

// initialize Illuminate database connection
$db = new Database();