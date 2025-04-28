import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    fullyParallel: false,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: 'html',

    use: {
        baseURL: 'https://ideas.ideascale.me',
        httpCredentials: {
            username: 'user',
            password: 'pass',
        },
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'setup',
            use: {
                ...devices['Desktop Chrome'],
            },
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/user.json',
            },
            dependencies: ['setup'],
        },
        {
            name: 'small device',
            use: {
                ...devices['Desktop Chrome'],
                viewport: {width: 576, height: 720},
                storageState: '.auth/user.json',
            },
            dependencies: ['setup'],
        },
    ],
});
