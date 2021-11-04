<?php

defined('TYPO3_MODE') || die();

call_user_func(function () {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
        't3crr_sitepackage',
        'Configuration/TypoScript',
        'T3CRR Sitepackage'
    );
});
