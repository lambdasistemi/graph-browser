build:
    spago build

bundle:
    spago bundle

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
    rm -rf output/ dist/index.js dist/data
