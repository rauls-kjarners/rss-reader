<?php

namespace App\Throwable\Service;

class RegisterFeedException extends \RuntimeException
{
    public function __construct()
    {
        parent::__construct('Could not read the registry feed');
    }
}
