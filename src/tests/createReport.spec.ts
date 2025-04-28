import {test} from "./fixture";

test('Reporting Page', async ({reportsPage}) => {
    await reportsPage.navigate();
    await reportsPage.assertTitle();
});
