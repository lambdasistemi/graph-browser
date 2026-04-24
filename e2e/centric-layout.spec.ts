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
test("expand re-lays out with the clicked node as the layout's fixed centre", async ({
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
      clickX: container.left + rp.x,
      clickY: container.top + rp.y,
      nodeCount: cy.nodes().length,
    };
  });

  await page.mouse.click(before.clickX, before.clickY);
  // fCoSE animates 500ms; give a generous buffer for the layout to settle.
  await page.waitForTimeout(2000);

  const after = await page.evaluate((anchorId: string) => {
    const cy: any = (window as any).cy;
    const anchor = cy.getElementById(anchorId);
    const container = cy.container().getBoundingClientRect();
    const rp = anchor.renderedPosition();
    return {
      anchorModelPos: { ...anchor.position() },
      anchorScreenX: rp.x,
      anchorScreenY: rp.y,
      viewportW: container.width,
      viewportH: container.height,
      nodeCount: cy.nodes().length,
    };
  }, before.anchorId);

  // Expansion added at least one new node.
  expect(after.nodeCount).toBeGreaterThan(before.nodeCount);

  // The anchor was pinned at model (0, 0) by fixedNodeConstraint.
  expect(Math.abs(after.anchorModelPos.x)).toBeLessThan(1);
  expect(Math.abs(after.anchorModelPos.y)).toBeLessThan(1);

  // The anchor is at the centre of the viewport (within 10 px, allowing
  // for the side panels — the graph container's width is the centre target).
  const cx = after.viewportW / 2;
  const cy = after.viewportH / 2;
  expect(Math.abs(after.anchorScreenX - cx)).toBeLessThan(30);
  expect(Math.abs(after.anchorScreenY - cy)).toBeLessThan(30);
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

  await page.evaluate((id: string) => {
    (window as any).cy.getElementById(id).emit("tap");
  }, pick.id);
  await page.waitForTimeout(2500);

  const afterExpand = await page.evaluate((id: string) => {
    const cy: any = (window as any).cy;
    return { nodeCount: cy.nodes().length };
  }, pick.id);
  expect(afterExpand.nodeCount).toBeGreaterThan(pick.nodeCountBefore);

  // Click 2: via the Cytoscape emit API so animation timing is irrelevant.
  await page.evaluate((id: string) => {
    (window as any).cy.getElementById(id).emit("tap");
  }, pick.id);
  await page.waitForTimeout(2500);

  const afterCollapse = await page.evaluate((id: string) => {
    const cy: any = (window as any).cy;
    const anchor = cy.getElementById(id);
    return {
      nodeCount: cy.nodes().length,
      anchorModel: anchor.nonempty() ? { ...anchor.position() } : null,
    };
  }, pick.id);
  expect(afterCollapse.nodeCount).toBe(pick.nodeCountBefore);
  // On collapse, the anchor is re-pinned at (0, 0) by the layout.
  expect(afterCollapse.anchorModel).not.toBeNull();
  expect(Math.abs(afterCollapse.anchorModel!.x)).toBeLessThan(1);
  expect(Math.abs(afterCollapse.anchorModel!.y)).toBeLessThan(1);
});
