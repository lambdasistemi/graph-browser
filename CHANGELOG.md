# Changelog

## 1.0.0 (2026-04-05)


### Features

* bundle npm deps (cytoscape, fcose) via esbuild ([0140a02](https://github.com/lambdasistemi/graph-browser/commit/0140a026f7817b6307684d642f54b2a64cac19af))
* document.title from config + localStorage persistence ([9a3fb9d](https://github.com/lambdasistemi/graph-browser/commit/9a3fb9d73bbef66fc1426e043576abc0b4d39fdd))
* dual lib/app nix outputs and justfile recipes ([912e78c](https://github.com/lambdasistemi/graph-browser/commit/912e78c91a74f6b7491f3e8eeebfb903eb1f7966))
* generic graph browser with example data and README ([4eb9ed2](https://github.com/lambdasistemi/graph-browser/commit/4eb9ed2d02324ddc39b6d45fe1a00620b15bde60))
* nix build via mkSpagoDerivation + importNpmLock ([5aaf1de](https://github.com/lambdasistemi/graph-browser/commit/5aaf1de61b81738d00c1ac1e022b130f3f524fe5))
* repo discovery with manifest fetch and convention fallback ([07fdaac](https://github.com/lambdasistemi/graph-browser/commit/07fdaaca409b2c9a3dbc42080673ee84a270460b))
* repo manager panel with per-repo state persistence ([e0d16ec](https://github.com/lambdasistemi/graph-browser/commit/e0d16ec981ec12d0297701e916bd2d2fee1d2329))
* token encryption and authenticated fetch for private repos ([ba9a492](https://github.com/lambdasistemi/graph-browser/commit/ba9a4926abd89b7871428d6b2342fd0f53b44e8d))
* URL deep-linking with ?repo= parameter ([97d400e](https://github.com/lambdasistemi/graph-browser/commit/97d400ef7c56fea7dc2097b1135c6512cb2ad029))


### Bug Fixes

* add npm install to Pages deploy workflow ([8f40d29](https://github.com/lambdasistemi/graph-browser/commit/8f40d2962026cd30d93f053b67295f9ddfcd833e))
* include npm deps in nix build output ([29e10d8](https://github.com/lambdasistemi/graph-browser/commit/29e10d8330444d7d95482fc8572fd6d7c28d69a4))
* pages workflow only on main push, not PRs ([735e7bc](https://github.com/lambdasistemi/graph-browser/commit/735e7bc886730792b70f5c33461d808872cb12b8))
* pages workflow only on main push, not PRs ([82dba1b](https://github.com/lambdasistemi/graph-browser/commit/82dba1b641717cede5463ad9e7d7786b5a0b8db2))
* resolve tutorial file paths against remote base URL ([912e5f5](https://github.com/lambdasistemi/graph-browser/commit/912e5f5537f2b6693e24668d7909cbfb6c7d8b26))
* sticky tutorial nav bar at top of sidebar ([ce4e0b8](https://github.com/lambdasistemi/graph-browser/commit/ce4e0b8ff509acf396510fd54eb30cf17c89edb3))
* suppress console warnings (edge overlap, wheel sensitivity) ([02543d4](https://github.com/lambdasistemi/graph-browser/commit/02543d489785a82fe3b8cf428b31b773dee0c7bc))
* two-phase bundle — deps via esbuild, app via spago, concat ([2d7e2e7](https://github.com/lambdasistemi/graph-browser/commit/2d7e2e74130c579cc1eb6470ed32de9027ee4b27))
* use ubuntu-latest + setup-nix for CI (no nixos runner in org) ([7672e31](https://github.com/lambdasistemi/graph-browser/commit/7672e315c7c16a98249eedbe63ef0e2a6d380285))
* use ubuntu-latest + setup-nix for CI (no nixos runner in org) ([2f824cf](https://github.com/lambdasistemi/graph-browser/commit/2f824cf6036e75f5cb0f7a814eb6556b5cc125d9))
