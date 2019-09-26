<?php

namespace App\Throwable\Service;

class RegisterFeedException extends \RuntimeException
{
    /**
     * @param string $reason
     */
    public function __construct(string $reason)
    {
        parent::__construct(sprintf('Could not read the registry feed because %s', $reason));
    }
}
