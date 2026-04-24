import { test, expect } from "@playwright/test";

const PREVIEW_URL =
  process.env.GRAPH_BROWSER_URL ||
  "https://graph-browser-012-expand-collapse-v6.surge.sh";

/**
 * Centric layout contract:
 * - Clicked anchor keeps its model position.
 * - Non-anchor existing nodes are allowed to move (layout runs).
 * - Newly added nodes are placed around the anchor (not piled at origin).
 */
test("expand runs a centric relayout: anchor pinned, others move", async ({
  page,
}) => {
  await page.goto(PREVIEW_URL);
  await page.waitForSelector("#cy canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);

  const before = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    const hasHidden = cy.nodes(".has-hidden");
    const target = hasHidden.length > 0 ? hasHidden[0] : cy.nodes()[0];
    const container = cy.container().getBoundingClientRect();
    const rp = target.renderedPosition();
    return {
      anchorId: target.id(),
      anchorModelPos: { ...target.position() },
      clickX: container.left + rp.x,
      clickY: container.top + rp.y,
      nodes: cy.nodes().map((n: any) => ({
        id: n.id(),
        x: n.position("x"),
        y: n.position("y"),
      })),
    };
  });

  await page.mouse.click(before.clickX, before.clickY);
  // Layout animates 400ms; give a safe buffer.
  await page.waitForTimeout(1500);

  const after = await page.evaluate((anchorId: string) => {
    const cy: any = (window as any).cy;
    return {
      anchorModelPos: { ...cy.getElementById(anchorId).position() },
      nodes: cy.nodes().map((n: any) => ({
        id: n.id(),
        x: n.position("x"),
        y: n.position("y"),
      })),
      nodeCount: cy.nodes().length,
    };
  }, before.anchorId);

  // Anchor must stay pinned (model coordinates, allow sub-pixel jitter).
  expect(Math.abs(after.anchorModelPos.x - before.anchorModelPos.x)).toBeLessThan(
    0.5,
  );
  expect(Math.abs(after.anchorModelPos.y - before.anchorModelPos.y)).toBeLessThan(
    0.5,
  );

  // Expansion added at least one new node (confidence check).
  expect(after.nodeCount).toBeGreaterThan(before.nodes.length);

  // Some non-anchor existing node must have moved — proof the layout ran.
  const moved = before.nodes.filter((b) => {
    if (b.id === before.anchorId) return false;
    const a = after.nodes.find((n: any) => n.id === b.id);
    if (!a) return false;
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return dx > 2 || dy > 2;
  });
  expect(moved.length).toBeGreaterThan(0);
});

test("click same node again collapses and re-centres around it", async ({
  page,
}) => {
  await page.goto(PREVIEW_URL);
  await page.waitForSelector("#cy canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);

  const pick = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    const target = cy.nodes(".has-hidden")[0] || cy.nodes()[0];
    const container = cy.container().getBoundingClientRect();
    const rp = target.renderedPosition();
    return {
      id: target.id(),
      x: container.left + rp.x,
      y: container.top + rp.y,
      nodeCountBefore: cy.nodes().length,
    };
  });

  // Click 1: expand
  await page.mouse.click(pick.x, pick.y);
  await page.waitForTimeout(1500);

  const afterExpand = await page.evaluate((id: string) => {
    const cy: any = (window as any).cy;
    const container = cy.container().getBoundingClientRect();
    const rp = cy.getElementById(id).renderedPosition();
    return {
      nodeCount: cy.nodes().length,
      anchorModel: { ...cy.getElementById(id).position() },
      clickX: container.left + rp.x,
      clickY: container.top + rp.y,
    };
  }, pick.id);
  expect(afterExpand.nodeCount).toBeGreaterThan(pick.nodeCountBefore);

  // Click 2: collapse (same model node; rendered position may have
  // shifted because the viewport was centred on it).
  await page.mouse.click(afterExpand.clickX, afterExpand.clickY);
  await page.waitForTimeout(1500);

  const afterCollapse = await page.evaluate((id: string) => {
    const cy: any = (window as any).cy;
    return {
      nodeCount: cy.nodes().length,
      anchorModel: { ...cy.getElementById(id).position() },
    };
  }, pick.id);
  expect(afterCollapse.nodeCount).toBe(pick.nodeCountBefore);

  // Anchor model position stable across the whole cycle (pinned on both).
  expect(
    Math.abs(afterCollapse.anchorModel.x - afterExpand.anchorModel.x),
  ).toBeLessThan(0.5);
  expect(
    Math.abs(afterCollapse.anchorModel.y - afterExpand.anchorModel.y),
  ).toBeLessThan(0.5);
});
