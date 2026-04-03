build:
    spago build

bundle:
    spago bundle
    esbuild dist/index.js --bundle --outfile=dist/bundle.js --format=iife --platform=browser --minify
    mv dist/bundle.js dist/index.js

dev:
    spago build --watch

format:
    purs-tidy format-in-place src/**/*.purs

lint:
    purs-tidy check src/**/*.purs

ci: lint build bundle

# Serve the example graph locally
serve: bundle
    rm -rf dist/data
    cp -r example/data dist/data
    npx serve dist -p 10002

clean:
    rm -rf output/ dist/index.js dist/bundle.js dist/data
