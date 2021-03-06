<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\AdminBundle\Admin;

use Sulu\Bundle\AdminBundle\Admin\Navigation\NavigationItemCollection;
use Sulu\Bundle\AdminBundle\Admin\Navigation\NavigationProviderInterface;
use Sulu\Bundle\AdminBundle\Admin\Routing\RouteCollection;
use Sulu\Bundle\AdminBundle\Admin\Routing\RouteProviderInterface;

/**
 * Defines all the required information from a bundle's admin class.
 */
abstract class Admin implements RouteProviderInterface, NavigationProviderInterface
{
    const SETTINGS_NAVIGATION_ITEM = 'sulu_admin.settings';

    public function configureRoutes(RouteCollection $routeCollection): void
    {
    }

    public function configureNavigationItems(NavigationItemCollection $navigationItemCollection): void
    {
    }

    /**
     * Returns all the security contexts, which are available in the concrete bundle.
     *
     * @return array
     */
    public function getSecurityContexts()
    {
        return [];
    }

    /**
     * Returns all the security contexts, which are available in the concrete bundle.
     *
     * @return array
     */
    public function getSecurityContextsWithPlaceholder()
    {
        return $this->getSecurityContexts();
    }

    public function getConfig(): ?array
    {
        return null;
    }

    public function getConfigKey(): ?string
    {
        return null;
    }
}
