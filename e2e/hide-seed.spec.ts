import { test, expect } from "@playwright/test";

const PREVIEW_URL =
  process.env.GRAPH_BROWSER_URL ||
  "https://graph-browser-012-expand-collapse-v8.surge.sh";

test("clicking a seed node with nothing to expand hides it", async ({
  page,
}) => {
  await page.goto(PREVIEW_URL);
  await page.waitForSelector("#cy canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);

  // Find a seed node that has no has-hidden class (nothing to expand).
  const pick = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    const leaf = cy.nodes().filter((n: any) => !n.hasClass("has-hidden"))[0];
    if (!leaf) return null;
    const container = cy.container().getBoundingClientRect();
    const rp = leaf.renderedPosition();
    return {
      id: leaf.id(),
      x: container.left + rp.x,
      y: container.top + rp.y,
      nodeCountBefore: cy.nodes().length,
    };
  });
  if (!pick) {
    // No such node present (all initial seeds happen to be expandable);
    // then the feature trivially does not apply — skip.
    test.skip(true, "no leaf-like seed in the initial set");
    return;
  }
  console.log("HIDE pick", JSON.stringify(pick, null, 2));

  await page.mouse.click(pick.x, pick.y);
  await page.waitForTimeout(800);

  const after = await page.evaluate((id: string) => {
    const cy: any = (window as any).cy;
    return {
      nodeCount: cy.nodes().length,
      stillPresent: cy.getElementById(id).nonempty(),
    };
  }, pick.id);
  expect(after.stillPresent).toBe(false);
  expect(after.nodeCount).toBeLessThan(pick.nodeCountBefore);
});
