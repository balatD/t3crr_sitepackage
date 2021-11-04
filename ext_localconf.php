<?php

defined('TYPO3_MODE') || die('Access denied.');

call_user_func(function () {
    $GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['t3crr_sitepackage'] =
        'EXT:t3crr_sitepackage/Configuration/Yaml/Presets.yaml';

    /** @var \TYPO3\CMS\Core\Imaging\IconRegistry $iconRegistry */
    $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \TYPO3\CMS\Core\Imaging\IconRegistry::class
    );
    $iconRegistry->registerIcon(
        'extension',
        \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
        ['source' => 'EXT:t3crr_sitepackage/Resources/Public/Icons/Extension.png']
    );
    $iconRegistry->registerIcon(
        'content-element',
        \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
        ['source' => 'EXT:t3crr_sitepackage/Resources/Public/Icons/ContentElement.png']
    );
});
