const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ 
    toMatchImageSnapshot(received, options) {
        const customConfig = {
            customSnapshotsDir: `${__dirname}/../results`,
                ...options,
            };
        return toMatchImageSnapshot.call(this, received, customConfig);
    } 
});
