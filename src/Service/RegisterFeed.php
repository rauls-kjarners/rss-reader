<?php

namespace App\Service;

use App\Throwable\Service\RegisterFeedException;

// todo:: db, command to sync or cache, tests
class RegisterFeed
{
    private CONST FEED_URL   = 'https://www.theregister.co.uk/software/headlines.atom';
    private CONST WORD_LIMIT = 10;

    /** @var string|false $feed */
    private $feed;

    /** @var CommonWords $commonWords */
    private $commonWords;

    public function __construct(CommonWords $commonWords)
    {
        $this->feed        = simplexml_load_string(file_get_contents(self::FEED_URL));
        $this->commonWords = $commonWords;
    }

    /**
     * @param int $limit
     * @return array
     */
    public function getPopularWords(int $limit = self::WORD_LIMIT): array
    {
        $allTexts = '';
        foreach ($this->getEntriesXml() as $entry) {
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
        $filteredWords = array_diff($countedWords, $this->commonWords->getWords());
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
        $feedEntries = [];
        foreach ($this->getEntriesXml() as $entry) {
            $entry = (array) $entry;
            if (empty($entry['title']) || empty($entry['summary']) || empty($entry['updated'])) {
                continue;
            }

            $author = (array) ($entry['author'] ?? []);
            $link   = (array) ($entry['link'] ?? []);

            $feedEntries[] = [
                'updated'    => new \DateTime($entry['updated']),
                'authorName' => empty($author['name']) ? 'Anonymous' : $author['name'],
                'authorUri'  => $author['uri'] ?? null,
                'link'       => $link['@attributes']['href'] ?? null,
                'title'      => $entry['title'],
                'summary'    => strip_tags($entry['summary'])
            ];
        }

        return $feedEntries;
    }

    /**
     * @return \SimpleXMLElement
     */
    private function getEntriesXml(): \SimpleXMLElement
    {
        if (!$this->feed) {
            throw new RegisterFeedException();
        }

        return $this->feed->entry;
    }
}
