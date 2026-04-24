import { test, expect } from "@playwright/test";

const PREVIEW_URL =
  process.env.GRAPH_BROWSER_URL ||
  "https://graph-browser-012-expand-collapse-v5.surge.sh";

test("left-click toggles expand/collapse", async ({ page }) => {
  await page.goto(PREVIEW_URL);
  await page.waitForSelector("#cy canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);

  // Pick an expandable (has-hidden) node and capture its rendered position.
  const pick = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    if (!cy) return null;
    const hasHidden = cy.nodes(".has-hidden");
    const target = hasHidden.length > 0 ? hasHidden[0] : cy.nodes()[0];
    if (!target) return null;
    const pos = target.renderedPosition();
    const container = cy.container().getBoundingClientRect();
    return {
      id: target.id(),
      x: container.left + pos.x,
      y: container.top + pos.y,
      nodeCountBefore: cy.nodes().length,
      edgeCountBefore: cy.edges().length,
      hasHidden: target.hasClass("has-hidden"),
    };
  });
  if (!pick) throw new Error("no node");
  console.log("PICK", JSON.stringify(pick, null, 2));

  // Expect the picked node to currently be expandable.
  expect(pick.hasHidden).toBe(true);

  // Left-click → should expand. We trigger via Cytoscape's own event
  // system so we do not depend on pixel-perfect positioning after
  // fCoSE's animated layout centres the node on screen.
  await page.evaluate((id: string) => {
    const cy: any = (window as any).cy;
    cy.getElementById(id).emit("tap");
  }, pick.id);
  await page.waitForTimeout(2500);

  const afterExpand = await page.evaluate((pickedId: string) => {
    const cy: any = (window as any).cy;
    return {
      nodeCount: cy.nodes().length,
      edgeCount: cy.edges().length,
      targetStillExpandable: cy.getElementById(pickedId).hasClass("has-hidden"),
    };
  }, pick.id);
  console.log("AFTER EXPAND", JSON.stringify(afterExpand, null, 2));

  expect(afterExpand.nodeCount).toBeGreaterThan(pick.nodeCountBefore);
  expect(afterExpand.edgeCount).toBeGreaterThanOrEqual(pick.edgeCountBefore);

  // Click the SAME node again → should collapse. Same trigger path.
  await page.evaluate((id: string) => {
    const cy: any = (window as any).cy;
    cy.getElementById(id).emit("tap");
  }, pick.id);
  await page.waitForTimeout(2500);

  const afterCollapse = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    return { nodeCount: cy.nodes().length, edgeCount: cy.edges().length };
  });
  console.log("AFTER COLLAPSE", JSON.stringify(afterCollapse, null, 2));

  // Node count should be back to (or near) the original.
  expect(afterCollapse.nodeCount).toBeLessThan(afterExpand.nodeCount);
  expect(afterCollapse.nodeCount).toBe(pick.nodeCountBefore);
});

test("edges are visible from first paint (not just on click)", async ({
  page,
}) => {
  await page.goto(PREVIEW_URL);
  await page.waitForSelector("#cy canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "/tmp/first-paint.png" });

  const style = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    const edges = cy.edges().slice(0, 10);
    return Array.from(edges).map((e: any) => ({
      width: e.renderedStyle("width"),
      opacity: e.renderedStyle("opacity"),
    }));
  });
  console.log("EDGE STYLES FIRST PAINT", JSON.stringify(style, null, 2));
  for (const s of style) {
    // Edges should be clearly visible. Previous builds let them render at
    // 0.5 px width / 0.36 opacity after fCoSE fit-to-padding, which users
    // perceived as "no edges". Hold at sensibly prominent thresholds.
    expect(parseFloat(s.width)).toBeGreaterThanOrEqual(1.5);
    expect(parseFloat(s.opacity)).toBeGreaterThanOrEqual(0.65);
  }
});

test("no context menu appears on right-click", async ({ page }) => {
  await page.goto(PREVIEW_URL);
  await page.waitForSelector("#cy canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);
  const pick = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    const target = cy.nodes()[0];
    if (!target) return null;
    const pos = target.renderedPosition();
    const container = cy.container().getBoundingClientRect();
    return { x: container.left + pos.x, y: container.top + pos.y };
  });
  if (!pick) throw new Error("no node");
  await page.mouse.click(pick.x, pick.y, { button: "right" });
  await page.waitForTimeout(400);
  const menu = page.locator(".node-context-menu");
  expect(await menu.count()).toBe(0);
});
