import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',

    // Removed global setup to prevent shared authentication
    globalSetup: require.resolve('./global-setup'),

    fullyParallel: false,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : 1,

    reporter: 'html',

    use: {
        baseURL: 'https://ideas.ideascale.me',
        httpCredentials: {
            username: 'superuser@ideascale.me',
            password: 'brewski01',
        },
        trace: 'on-first-retry',
    },

    projects: [
        // {
        //     name: 'setup',
        //     use: {
        //         ...devices['Desktop Chrome'],
        //     },
        //     testMatch: /.*\.setup\.ts/,
        // },
        {
            name: 'large device',
            use: {
                ...devices['Desktop Chrome'],
                 storageState: '.auth/user.json',
            },
            // dependencies: ['setup'],
        },
        // {
        //     name: 'small device',
        //     use: {
        //         ...devices['Desktop Chrome'],
        //         viewport: {width: 576, height: 720},
        //         storageState: '.auth/user.json',
        //     },
        //     dependencies: ['setup'],
        // },
    ],
});
