import {
  DateFormatController,
  ProgressLoaderController,
  TranslationController,
  registerIconLibrary,
  unregisterIconLibrary
} from '@freshworks/crayons/react';

export function pulseOpsControllers() {
  registerIconLibrary('pulseops', {
    resolver: function (name) {
      return '/assets/icons/' + name + '.svg';
    },
    mutator: function (svg) {
      return svg.replace('<svg', '<svg fill="currentColor"');
    }
  });

  return {
    dateFormat: typeof DateFormatController.setLocale === 'function',
    progressLoader: typeof ProgressLoaderController.start === 'function',
    translation: typeof TranslationController.register === 'function',
    iconLibrary: typeof unregisterIconLibrary === 'function'
  };
}
