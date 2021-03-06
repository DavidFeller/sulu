<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\PreviewBundle\Preview\Exception;

use Twig\Error\Error;

/**
 * This exception will be thrown when preview rendering fails.
 */
class TwigException extends PreviewRendererException
{
    /**
     * @param int $object
     * @param mixed $id
     * @param string $webspaceKey
     * @param string $locale
     */
    public function __construct(Error $exception, $object, $id, $webspaceKey, $locale)
    {
        parent::__construct(
            $exception->getMessage(),
            self::BASE_CODE + 3,
            $object,
            $id,
            $webspaceKey,
            $locale,
            $exception
        );
    }
}
