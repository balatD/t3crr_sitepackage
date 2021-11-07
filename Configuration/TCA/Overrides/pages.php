<?php

defined('TYPO3_MODE') || die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    't3crr_sitepackage',
    'Configuration/TSconfig/All.tsconfig',
    'Template T3CRR :: Page config'
);
