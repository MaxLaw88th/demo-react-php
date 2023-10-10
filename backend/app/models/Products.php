<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $table = "products";

    protected $fillable = [
        "id",
        "title",
        "description",
        "price",
        "discountPercentage",
        "rating",
        "stock",
        "brand",
        "category",
        "thumbnail",
        "images0",
        "images1",
        "images2",
        "images3",
        "images4",
        "images5",
    ];
}