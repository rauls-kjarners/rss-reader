<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

final class TestController extends AbstractController
{
    /**
     * @Route("api/ping", methods={"GET"}, name="app_ping")
     * @return JsonResponse
     */
    public function pingAction(): JsonResponse
    {
        return JsonResponse::create('pong');
    }
}
