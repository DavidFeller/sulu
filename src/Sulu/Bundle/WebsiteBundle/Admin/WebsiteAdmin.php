<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\WebsiteBundle\Admin;

use Sulu\Bundle\AdminBundle\Admin\Admin;
use Sulu\Bundle\AdminBundle\Admin\Routing\RouteBuilderFactoryInterface;
use Sulu\Bundle\AdminBundle\Admin\Routing\RouteCollection;
use Sulu\Bundle\PageBundle\Admin\PageAdmin;
use Sulu\Component\Security\Authorization\PermissionTypes;
use Sulu\Component\Security\Authorization\SecurityCheckerInterface;
use Sulu\Component\Webspace\Manager\WebspaceManagerInterface;
use Sulu\Component\Webspace\Webspace;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class WebsiteAdmin extends Admin
{
    /**
     * Returns security context for analytics in given webspace.
     *
     * @param string $webspaceKey
     *
     * @return string
     */
    public static function getAnalyticsSecurityContext($webspaceKey)
    {
        return sprintf('%s%s.%s', PageAdmin::SECURITY_CONTEXT_PREFIX, $webspaceKey, 'analytics');
    }

    /**
     * @var RouteBuilderFactoryInterface
     */
    private $routeBuilderFactory;

    /**
     * @var WebspaceManagerInterface
     */
    private $webspaceManager;

    /**
     * @var SecurityCheckerInterface
     */
    private $securityChecker;

    /**
     * @var UrlGeneratorInterface
     */
    private $urlGenerator;

    public function __construct(
        RouteBuilderFactoryInterface $routeBuilderFactory,
        WebspaceManagerInterface $webspaceManager,
        SecurityCheckerInterface $securityChecker,
        UrlGeneratorInterface $urlGenerator
    ) {
        $this->routeBuilderFactory = $routeBuilderFactory;
        $this->webspaceManager = $webspaceManager;
        $this->securityChecker = $securityChecker;
        $this->urlGenerator = $urlGenerator;
    }

    public function configureRoutes(RouteCollection $routeCollection): void
    {
        $listToolbarActions = [
            'sulu_admin.add',
            'sulu_admin.delete',
        ];

        if ($this->hasSomeWebspaceAnalyticsPermission()) {
            $routeCollection->add(
                $this->routeBuilderFactory
                    ->createFormOverlayListRouteBuilder('sulu_webspace.analytics_list', '/analytics')
                    ->setResourceKey('analytics')
                    ->setListKey('analytics')
                    ->addListAdapters(['table_light'])
                    ->addRouterAttributesToListStore(['webspace'])
                    ->addRouterAttributesToFormStore(['webspace'])
                    ->disableSearching()
                    ->setFormKey('analytic_details')
                    ->setTabTitle('sulu_website.analytics')
                    ->setTabOrder(2048)
                    ->addToolbarActions($listToolbarActions)
                    ->setParent(PageAdmin::WEBSPACE_TABS_ROUTE)
                    ->addRerenderAttribute('webspace')
            );
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getSecurityContexts()
    {
        $webspaceContexts = [];
        /* @var Webspace $webspace */
        foreach ($this->webspaceManager->getWebspaceCollection() as $webspace) {
            $securityContextKey = self::getAnalyticsSecurityContext($webspace->getKey());
            $webspaceContexts[$securityContextKey] = $this->getSecurityContextPermissions();
        }

        return [
            'Sulu' => [
                'Webspaces' => $webspaceContexts,
            ],
        ];
    }

    public function getSecurityContextsWithPlaceholder()
    {
        return [
            'Sulu' => [
                'Webspaces' => [
                    self::getAnalyticsSecurityContext('#webspace#') => $this->getSecurityContextPermissions(),
                ],
            ],
        ];
    }

    private function getSecurityContextPermissions()
    {
        return [
            PermissionTypes::VIEW,
            PermissionTypes::ADD,
            PermissionTypes::EDIT,
            PermissionTypes::DELETE,
        ];
    }

    public function getConfigKey(): ?string
    {
        return 'sulu_website';
    }

    public function getConfig(): ?array
    {
        return [
            'endpoints' => [
                'clearCache' => $this->urlGenerator->generate('sulu_website.cache.remove'),
            ],
        ];
    }

    private function hasSomeWebspaceAnalyticsPermission(): bool
    {
        foreach ($this->webspaceManager->getWebspaceCollection()->getWebspaces() as $webspace) {
            $hasWebspaceAnalyticsPermission = $this->securityChecker->hasPermission(
                self::getAnalyticsSecurityContext($webspace->getKey()),
                PermissionTypes::EDIT
            );

            if ($hasWebspaceAnalyticsPermission) {
                return true;
            }
        }

        return false;
    }
}
