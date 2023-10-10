<?php

namespace Controllers;

class Products
{
    public static function get_products(int $id = null) {
        $collection = \Models\Products::query();

        if($id){
            $collection->whereId($id);
        }

        return $collection->get();
    }

    public static function get_product(int $id)
    {
        return \Models\Products::query()->where("id", $id)->first();
    }
}