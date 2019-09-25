<?php

namespace App\Service;

use Symfony\Component\DomCrawler\Crawler;

// todo:: db, command to sync or cache, tests
class CommonWords
{
    private CONST FEED_URL       = 'https://en.wikipedia.org/wiki/Most_common_words_in_English';
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

    /** @var string|false $feed */
    private $feed;

    public function __construct()
    {
        $this->feed = file_get_contents(self::FEED_URL);
    }

    /**
     * @param int $limit
     * @return array
     */
    public function getWords(int $limit = self::WORD_LIMIT): array
    {
        if (!$this->feed) {
            return $this->getDeafultExcludedWords($limit);
        }

        try {
            $words = (new Crawler($this->feed))
                ->filter('td')
                ->children('a.extiw')
                ->slice(0, $limit)
                ->each(function (Crawler $node) {
                    return $node->text();
                });
        } catch (\Throwable $exception) {
            return $this->getDeafultExcludedWords($limit);
        }

        return empty($words) ? $this->getDeafultExcludedWords($limit) : $words;
    }

    /**
     * @param int $limit
     * @return array
     */
    private function getDeafultExcludedWords(int $limit): array
    {
        if ($limit < 50) {
            return array_slice(self::EXCLUDED_WORDS, 0, $limit);
        }

        return self::EXCLUDED_WORDS;
    }
}
