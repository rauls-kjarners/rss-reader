<?php

namespace App\Service;

use App\Throwable\Service\RegisterFeedException;

class RegisterFeed
{
    private CONST WORD_LIMIT = 10;

    /** @var \SimpleXMLElement feedEntries */
    private $feedEntries;

    /** @var CommonWords $commonWords */
    private $commonWords;

    /**
     * @param CommonWords $commonWords
     * @param string      $feedUrl
     */
    public function __construct(CommonWords $commonWords, string $feedUrl)
    {
        $this->commonWords = $commonWords;

        try {
            $this->feedEntries = simplexml_load_string(file_get_contents($feedUrl))->entry;
        } catch (\Throwable $exception) {
            throw new RegisterFeedException($exception->getMessage());
        }
    }

    /**
     * @param int $limit
     * @return array
     */
    public function getPopularWords(int $limit = self::WORD_LIMIT): array
    {
        $allTexts = '';
        foreach ($this->feedEntries as $entry) {
            $entry = (array) $entry;
            if (empty($entry['title']) || empty($entry['summary'])) {
                continue;
            }

            $author = (array) ($entry['author'] ?? []);

            $allTexts .= sprintf(
                '%s %s %s ',
                $entry['title'],
                strip_tags($entry['summary']),
                $author['name'] ?? ''
            );
        }

        $countedWords  = str_word_count(utf8_decode($allTexts), 1);
        $filteredWords = array_udiff($countedWords, $this->commonWords->getWords(), 'strcasecmp');
        $words         = array_count_values($filteredWords);

        arsort($words);

        return array_slice($words, 0, $limit);
    }

    /**
     * @return array
     * @throws \Exception
     */
    public function getEntries(): array
    {
        $formattedEntries = [];
        foreach ($this->feedEntries as $entry) {
            $entry = (array) $entry;
            if (empty($entry['title']) || empty($entry['summary']) || empty($entry['updated'])) {
                continue;
            }

            $author = (array) ($entry['author'] ?? []);
            $link   = (array) ($entry['link'] ?? []);

            $formattedEntries[] = [
                'updated'    => new \DateTime($entry['updated']),
                'authorName' => empty($author['name']) ? 'Anonymous' : $author['name'],
                'authorUri'  => $author['uri'] ?? null,
                'link'       => $link['@attributes']['href'] ?? null,
                'title'      => $entry['title'],
                'summary'    => strip_tags($entry['summary'])
            ];
        }

        return $formattedEntries;
    }
}
