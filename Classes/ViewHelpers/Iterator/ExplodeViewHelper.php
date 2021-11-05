<?php

namespace Db\T3CRRSitepackage\ViewHelpers\Iterator;

/*
 * This file is part of the FluidTYPO3/Vhs project under GPLv2 or later.
 *
 * For the full copyright and license information, please read the
 * LICENSE.md file that was distributed with this source code.
 */

use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;

/**
 * Explode ViewHelper
 *
 * Explodes a string by $glue.
 *
 * {data.header -> cp:iterator.explode(glue: 'constant:LF')}
 *
 * <t3crr:iterator.explode content="{data.header}" as="as" glue="constant:LF">
 * <span>{as}</span>
 * </t3crr:iterator.explode>
 */
class ExplodeViewHelper extends AbstractViewHelper
{
    use CompileWithRenderStatic;

    protected static string $method = 'explode';

    public function initializeArguments()
    {
        $this->registerArgument(
            'as',
            'string',
            'Template variable name to assign; if not specified the ViewHelper returns the variable instead.'
        );
        $this->registerArgument('content', 'string', 'String to be exploded by glue');
        $this->registerArgument(
            'glue',
            'string',
            'String used as glue in the string to be exploded. Use glue value of "constant:NAMEOFCONSTANT" ' .
            '(fx "constant:LF" for linefeed as glue)',
            false,
            ','
        );
    }

    /**
     * Render method
     *
     * @return string|array
     */
    public static function renderStatic(
        array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext
    ) {
        $content = $arguments['content'] ?? $renderChildrenClosure();
        $glue = static::resolveGlue($arguments);
        $content = call_user_func_array(static::$method, [$glue, $content]);

        $as = $arguments['as'];
        if (true === empty($as)) {
            $output = $content;
        } else {
            $templateVariableContainer = $renderingContext->getVariableProvider();
            $templateVariableContainer->add($as, $content);
            $output = $renderChildrenClosure();
            $templateVariableContainer->remove($as);
        }
        return $output;
    }

    protected static function resolveGlue(array $arguments): string
    {
        $glue = $arguments['glue'];
        if (false !== strpos($glue, ':') && 1 < strlen($glue)) {
            // glue contains a special type identifier, resolve the actual glue
            list ($type, $value) = explode(':', $glue);
            switch ($type) {
                case 'constant':
                    $glue = constant($value);
                    break;
                default:
                    $glue = $value;
            }
        }
        return $glue;
    }
}
