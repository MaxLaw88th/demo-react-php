<?php

require './bootstrap.php';

// Create Router instance
$router = new \Bramus\Router\Router();

$router->set404('(/.*)?', function () {
    header('HTTP/1.1 404 Not Found');
    header('Content-Type: application/json');

    $jsonArray = array();
    $jsonArray['status'] = "404";
    $jsonArray['status_text'] = "route not defined";

    echo json_encode($jsonArray);
});


$router->match('GET', '/api/products/{id}', function (int $id) {
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    $product = \Controllers\Products::get_product($id);
    echo json_encode($product);
});
$router->match('GET', '/api/products', function () {
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo json_encode(\Controllers\Products::get_products());
});
$router->match("GET","", function(){
    echo "ok";
});

// Run it!
$router->run();