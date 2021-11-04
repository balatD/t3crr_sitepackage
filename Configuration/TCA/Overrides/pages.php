<?php

defined('TYPO3_MODE') || die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3crr_sitepackage',
    'Configuration/TSconfig/All.typoscript',
    'Template T3CRR :: Page config'
);
