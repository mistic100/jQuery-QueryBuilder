# How to contribute

## Core vs Modules
I want to keep the core clean of extra (and certainly awesome) functionalities. That includes, but is not limited to, export/import modules, visual aids, etc.

Check to doc about [creating plugins](http://mistic100.github.io/jQuery-QueryBuilder/plugins.html#creation)

## Unit tests
Any big feature must have it's own QUnit tests suite. Of course existing tests must still pass after changes.

I won't merge any branch not passing the TravisCI build (this include JShint compliance).

## `dist`
Keep it simple, don't commit any files in the `dist` directory, I build these files only before a release.

## Translation
Source language files are plain JSON files which will be converted to executable JS files by the build task. The `__copyright` key can be used to give information about the translator.
