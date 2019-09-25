<?php

namespace App\Controller;

use App\Service\RegisterFeed;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class RssFeedController extends AbstractController
{
    /**
     * @Route("/", methods={"GET"}, name="app_rss")
     * @Cache(smaxage="3600")
     * @param RegisterFeed $registerFeed
     * @return Response
     * @throws \Exception
     */
    public function index(RegisterFeed $registerFeed): Response
    {
        return $this->render('feed/feed.html.twig', [
            'popularWords' => $registerFeed->getPopularWords(),
            'entries'      => $registerFeed->getEntries(),
        ]);
    }
}
