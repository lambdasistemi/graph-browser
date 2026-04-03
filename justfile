build:
    spago build

bundle:
    # 1. Bundle npm deps into a single file
    esbuild src/bootstrap.js --bundle --outfile=dist/deps.js --format=iife --platform=browser --minify
    # 2. Bundle PureScript app (uses cytoscape as global)
    spago bundle
    # 3. Concatenate: deps first, then app
    cat dist/deps.js dist/index.js > dist/bundle.js
    mv dist/bundle.js dist/index.js
    rm dist/deps.js

dev:
    spago build --watch

format:
    purs-tidy format-in-place src/**/*.purs

lint:
    purs-tidy check src/**/*.purs

install:
    npm ci

ci: install lint build bundle

# Serve the example graph locally
serve: bundle
    rm -rf dist/data
    cp -r example/data dist/data
    npx serve dist -p 10002

clean:
    rm -rf output/ dist/index.js dist/deps.js dist/bundle.js dist/data
