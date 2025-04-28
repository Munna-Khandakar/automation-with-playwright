import {test} from "./fixture";

test('Reporting Page', async ({reportsPage}) => {
    await reportsPage.goto();
    await reportsPage.assertTitle();
});
