<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\RegisterFeed;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        return $this->render('feed/feed.html.twig', [
            'popularWords' => $registerFeed->getPopularWords(),
            'entries'      => $registerFeed->getEntries(),
        ]);
    }

    /**
     * @Route("api/user/check-email", methods={"POST"}, name="app_user_check_email")
     * @param Request        $request
     * @param UserRepository $userRepository
     * @return JsonResponse
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function checkUserEmail(Request $request, UserRepository $userRepository): JsonResponse
    {
        if (!$request->isXmlHttpRequest()) {
            return $this->json(null);
        }

        $email = trim($request->request->get('email' ?? ''));

        // skip too short strings
        if (strlen($email) < 3) {
            return $this->json(null);
        }

        $user = $userRepository->findOneByEmail($email);

        return $this->json($user ? $user->getUsername() : null);
    }
}
