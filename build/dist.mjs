import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import * as sass from 'sass';
import pkg from '../package.json' assert { type: 'json' };

const DEV = process.argv[2] === '--dev';

const DIST = 'dist/';

const CORE_JS = [
    'src/main.js',
    'src/defaults.js',
    'src/plugins.js',
    'src/core.js',
    'src/public.js',
    'src/data.js',
    'src/template.js',
    'src/utils.js',
    'src/model.js',
    'src/jquery.js',
];

const CORE_SASS = [
    'src/scss/dark.scss',
    'src/scss/default.scss',
];

const STANDALONE_JS = {
    'jquery-extendext': 'node_modules/jquery-extendext/jquery-extendext.js',
    'query-builder': `${DIST}js/query-builder.js`,
};

const BANNER = () => `/*!
 * jQuery QueryBuilder ${pkg.version}
 * Copyright 2014-${new Date().getFullYear()} Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */`;

const LANG_BANNER = (locale, author) => `/*!
 * jQuery QueryBuilder ${pkg.version}
 * Locale: ${locale}
 * Author: ${author}
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */`;

const ALL_PLUGINS_JS = glob('src/plugins/*/plugin.js')
    .sort()
    .reduce((all, p) => {
        const n = p.split('/')[2];
        all[n] = p;
        return all;
    }, {});

const ALL_PLUGINS_SASS = glob('src/plugins/*/plugin.scss')
    .sort()
    .reduce((all, p) => {
        const n = p.split('/')[2];
        all[n] = p;
        return all;
    }, {});

const ALL_LANGS = glob('src/i18n/*.json')
    .map(p => p.split(/[\/\.]/)[2])
    .sort();

function glob(pattern) {
    return globSync(pattern)
        .map(p => p.split(path.sep).join('/'));
}

/**
 * Build lang files
 */
function buildLangs() {
    const wrapper = fs.readFileSync('src/i18n/.wrapper.js', { encoding: 'utf8' })
        .split('@@js\n');

    ALL_LANGS.forEach(lang => {
        const outpath = `${DIST}i18n/query-builder.${lang}.js`;
        console.log(`LANG ${lang} (${outpath})`);
        fs.writeFileSync(outpath, getLang(lang, wrapper));
    });
}

/**
 * Get the content of a single lang
 */
function getLang(lang, wrapper = ['', '']) {
    const corepath = `src/i18n/${lang}.json`;
    const content = JSON.parse(fs.readFileSync(corepath, { encoding: 'utf8' }));

    Object.keys(ALL_PLUGINS_JS).forEach(plugin => {
        const pluginpath = `src/plugins/${plugin}/i18n/${lang}.json`;
        try {
            const plugincontent = JSON.parse(fs.readFileSync(pluginpath, { encoding: 'utf8' }));
            Object.assign(content, plugincontent);
        } catch { }
    });

    return LANG_BANNER(content.__locale || lang, content.__author || '')
        + '\n\n'
        + wrapper[0]
        + `QueryBuilder.regional['${lang}'] = `
        + JSON.stringify(content, null, 2)
        + ';\n\n'
        + `QueryBuilder.defaults({ lang_code: '${lang}' });`
        + wrapper[1];
}

/**
 * Build main JS file
 */
function buildMain() {
    const wrapper = fs.readFileSync('src/.wrapper.js', { encoding: 'utf8' })
        .split('@@js\n');

    const files_to_load = [
        ...CORE_JS,
        ...Object.values(ALL_PLUGINS_JS),
    ];

    const output = BANNER()
        + '\n\n'
        + wrapper[0]
        + files_to_load.map(f => fs.readFileSync(f, { encoding: 'utf8' })).join('\n\n')
        + '\n\n'
        + getLang('en')
        + wrapper[1];

    const outpath = `${DIST}js/query-builder.js`;
    console.log(`MAIN (${outpath})`);
    fs.writeFileSync(outpath, output);
}

/**
 * Build standalone JS file
 */
function buildStandalone() {
    const output = Object.entries(STANDALONE_JS)
        .map(([name, file]) => {
            return fs.readFileSync(file, { encoding: 'utf8' })
                .replace(/define\((.*?)\);/, `define('${name}', $1);`);
        })
        .join('\n\n');

    const outpath = `${DIST}js/query-builder.standalone.js`;
    console.log(`STANDALONE (${outpath})`);
    fs.writeFileSync(outpath, output);
}

/**
 * Copy SASS files
 */
function copySass() {
    Object.entries(ALL_PLUGINS_SASS).forEach(([plugin, path]) => {
        const outpath = `${DIST}scss/plugins/${plugin}.scss`;
        console.log(`SASS ${plugin} (${path})`);
        fs.copyFileSync(path, outpath);
    });

    CORE_SASS.forEach(path => {
        const name = path.split('/').pop();

        const content = fs.readFileSync(path, { encoding: 'utf8' });

        let output = BANNER()
            + '\n'
            + content;
        if (name === 'default.scss') {
            output += '\n'
                + Object.keys(ALL_PLUGINS_SASS).map(p => `@import "plugins/${p}";`).join('\n');
        }

        const outpath = `${DIST}scss/${name}`;
        console.log(`SASS (${path})`);
        fs.writeFileSync(outpath, output);
    });
}

/**
 * Build CSS files
 */
function buildCss() {
    CORE_SASS.forEach(p => {
        const path = p.replace('src/', DIST);
        const name = path.split('/').pop();

        const output = sass.compile(path);

        const outpath = `${DIST}css/query-builder.${name.split('.').shift()}.css`;
        console.log(`CSS (${path})`);
        fs.writeFileSync(outpath, output.css);
    });
}

if (!DEV) {
    fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST + 'css', { recursive: true });
fs.mkdirSync(DIST + 'i18n', { recursive: true });
fs.mkdirSync(DIST + 'js', { recursive: true });
fs.mkdirSync(DIST + 'scss', { recursive: true });
fs.mkdirSync(DIST + 'scss/plugins', { recursive: true });

buildLangs();
buildMain();
buildStandalone();
copySass();
buildCss();
