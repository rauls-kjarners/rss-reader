<?php

namespace App\Service;

use Symfony\Component\DomCrawler\Crawler;

class CommonWords
{
    private CONST WORD_LIMIT     = 50;
    private CONST EXCLUDED_WORDS = [
        'the',
        'be',
        'to',
        'of',
        'and',
        'a',
        'in',
        'that',
        'have',
        'I',
        'it',
        'for',
        'not',
        'on',
        'with',
        'he',
        'as',
        'you',
        'do',
        'at',
        'this',
        'but',
        'his',
        'by',
        'from',
        'they',
        'we',
        'say',
        'her',
        'she',
        'or',
        'an',
        'will',
        'my',
        'one',
        'all',
        'would',
        'there',
        'their',
        'what',
        'so',
        'up',
        'out',
        'if',
        'about',
        'who',
        'get',
        'which',
        'go',
        'me'
    ];

    /** @var string feedUrl */
    private $feedUrl;

    /**
     * @param string $feedUrl
     */
    public function __construct(string $feedUrl)
    {
        $this->feedUrl = $feedUrl;
    }

    /**
     * @param int $limit
     * @return array
     */
    public function getWords(int $limit = self::WORD_LIMIT): array
    {
        try {
            $words = (new Crawler($this->feedUrl))
                ->filter('td')
                ->children('a.extiw')
                ->each(function (Crawler $node) {
                    return $node->text();
                });
        } catch (\Throwable $exception) {
            $words = self::EXCLUDED_WORDS;
        }

        if (empty($words)) {
            $words = self::EXCLUDED_WORDS;
        }

        return array_slice($words, 0, $limit);
    }
}
