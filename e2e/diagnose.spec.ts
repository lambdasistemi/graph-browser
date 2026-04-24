import { test, expect } from "@playwright/test";

const PREVIEW_URL =
  process.env.GRAPH_BROWSER_URL || "http://localhost:10007/";

test("diagnose edges after expand on a real node", async ({ page }) => {
  await page.goto(PREVIEW_URL);
  await page.waitForSelector("#cy canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "/tmp/before-expand.png", fullPage: false });

  // Pick a node that has hidden neighbors (class has-hidden is applied
  // after Initialize's renderGraph). Get its rendered position.
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
      visibleNodes: cy.nodes().length,
      visibleEdges: cy.edges().length,
      hasHiddenCount: hasHidden.length,
    };
  });
  console.log("PICK:", JSON.stringify(pick, null, 2));
  if (!pick) throw new Error("no node");

  // Right-click on the picked node.
  await page.mouse.click(pick.x, pick.y, { button: "right" });
  await page.waitForTimeout(500);
  const expandBtn = page.locator(".node-context-menu button", {
    hasText: "Expand",
  });
  await expect(expandBtn).toBeVisible({ timeout: 3000 });
  await expandBtn.click();
  await page.waitForTimeout(1500);

  await page.screenshot({ path: "/tmp/after-expand.png", fullPage: false });

  const after = await page.evaluate(() => {
    const cy: any = (window as any).cy;
    // check an already-visible edge's style
    const edges = cy.edges().map((e: any) => ({
      id: e.id(),
      s: e.data("source"),
      t: e.data("target"),
      renderedWidth: e.renderedStyle("width"),
      lineColor: e.renderedStyle("line-color"),
      opacity: e.renderedStyle("opacity"),
      sourcePresent: cy.getElementById(e.data("source")).nonempty(),
      targetPresent: cy.getElementById(e.data("target")).nonempty(),
    }));
    return {
      nodeCount: cy.nodes().length,
      edgeCount: cy.edges().length,
      sampleEdges: edges.slice(0, 5),
      orphanEdges: edges.filter((e: any) => !e.sourcePresent || !e.targetPresent).length,
    };
  });
  console.log("AFTER:", JSON.stringify(after, null, 2));
  expect(after.nodeCount).toBeGreaterThan(pick!.visibleNodes);
});
