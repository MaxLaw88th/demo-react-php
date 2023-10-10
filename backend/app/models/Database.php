<?php
namespace Models;
use Illuminate\Database\Capsule\Manager as Capsule;

class Database {
    private $capsule;

    public function __construct()
    {
        $this->capsule = new Capsule;
        $this->capsule->addConnection([
            'driver' => DB_CONNECTION,
            'host' => 'localhost',
            'database' => DB_DATABASE,
//            'username' => DBUSER,
//            'password' => DBPASS,
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
        ]);
        $this->capsule->setAsGlobal();
        // Setup the Eloquent ORM…
        $this->capsule->bootEloquent();

    }
}