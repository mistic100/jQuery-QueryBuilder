import liveServer from 'alive-server';
import path from 'path';

const rootDir = process.cwd();

const EXAMPLES_DIR = 'examples';
const DIST_DIR = 'dist';

liveServer.start({
    open: true,
    root: path.join(rootDir, EXAMPLES_DIR),
    watch: [
        path.join(rootDir, EXAMPLES_DIR),
        path.join(rootDir, DIST_DIR),
    ],
    mount: [
        ['/node_modules', path.join(rootDir, 'node_modules')],
        ['/dist', path.join(rootDir, DIST_DIR)],
    ],
});
