# Asking for help and features
Though I am really happy to provide help, I am not your mom nor your instructor. Any request without enough detail and any bug report without a code example (live example is preferred) won't get any answer.

Be exhaustive, describe your needs, show what you tried, it's the best way to get a rapid answer/bug fix.

# How to contribute

## Core vs Plugins
I want to keep the core clean of extra (and certainly awesome) functionalities. That includes, but is not limited to, export/import plugins, visual aids, etc.

Check the doc about [creating plugins](http://mistic100.github.io/jQuery-QueryBuilder/dev/plugins.html).

I reserve the right to refuse any plugin I think is not useful for many people. Particularly, only import/export plugins for mainstream data storages will be intergated in the main repository. Others should be in a separated repository. But it's totally possible to add a link to your repository in the documentation.

## Unit tests
Any big feature must have it's own QUnit tests suite. Of course existing tests must still pass after changes.

I won't merge any branch not passing the TravisCI build (this include JShint compliance).

## dist files
Keep it simple, don't commit any files in the `dist` directory, I build these files only before a release.

## Translations
Source language files are plain JSON files which will be converted to executable JS files by the build task. The `__locale` key must be filled with the international name of the language + 2-chars code and the `__author` key can be used to give information about the translator.
