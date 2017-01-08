# Guidelines for contributing

## Work on `dev`
Any merge request should be created from and issued to the `dev` branch.

## Core vs Plugins
I want to keep the core clean of extra (and certainly awesome) functionalities. That includes, but is not limited to, export/import plugins, visual aids, etc.

Check the doc about [creating plugins](http://querybuilder.js.org/dev/plugins.html) and [use events](http://querybuilder.js.org/dev/events.html).

I reserve the right to refuse any plugin I think is not useful for many people. Particularly, only import/export plugins for mainstream data storages will be integrated in the main repository. Others should be in a separated repository. But it's totally possible to add a link to your repository in the documentation.

## Unit tests
Any big feature must have it's own QUnit tests suite. Of course existing tests must still pass after changes.

I won't merge any branch not passing the TravisCI build, including JShint/JSCS/SCSSlint compliance.

## Translations
Source language files are plain JSON files which will be converted to executable JS files by the build task. The `__locale` key must be filled with the international name of the language + 2-chars code and the `__author` key can be used to give information about the translator.
