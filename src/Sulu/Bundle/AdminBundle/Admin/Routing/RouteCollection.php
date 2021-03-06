<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\AdminBundle\Admin\Routing;

use Sulu\Bundle\AdminBundle\Exception\RouteNotFoundException;

class RouteCollection
{
    /**
     * @var RouteBuilderInterface[]
     */
    private $routes = [];

    public function add(RouteBuilderInterface $routeBuilder): void
    {
        $this->routes[$routeBuilder->getName()] = $routeBuilder;
    }

    public function get(string $routeName): RouteBuilderInterface
    {
        if (!array_key_exists($routeName, $this->routes)) {
            throw new RouteNotFoundException($routeName);
        }

        return $this->routes[$routeName];
    }

    public function has(string $routeName): bool
    {
        return array_key_exists($routeName, $this->routes);
    }

    /**
     * @return RouteBuilderInterface[]
     */
    public function all(): array
    {
        return $this->routes;
    }
}
