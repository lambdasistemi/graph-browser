import { test, expect } from "@playwright/test";

const PREVIEW_URL =
  process.env.GRAPH_BROWSER_URL ||
  "https://graph-browser-012-expand-collapse-v10.surge.sh";

test("clicking a non-expandable, non-anchor node does NOT hide it", async ({
  page,
}) => {
  await page.goto(PREVIEW_URL);
  await page.waitForSelector("#cy canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);

  const pick = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    const leaf = cy.nodes().filter((n: any) => !n.hasClass("has-hidden"))[0];
    if (!leaf) return null;
    return {
      id: leaf.id(),
      nodeCountBefore: cy.nodes().length,
    };
  });
  if (!pick) {
    test.skip(true, "no non-expandable seed in the initial set");
    return;
  }

  await page.evaluate((id: string) => {
    (window as any).cy.getElementById(id).emit("tap");
  }, pick.id);
  await page.waitForTimeout(1500);

  const after = await page.evaluate((id: string) => {
    const cy: any = (window as any).cy;
    return {
      nodeCount: cy.nodes().length,
      stillPresent: cy.getElementById(id).nonempty(),
    };
  }, pick.id);

  // The node MUST still be there and the overall count unchanged.
  expect(after.stillPresent).toBe(true);
  expect(after.nodeCount).toBe(pick.nodeCountBefore);
});
