MAIN_CSS = normalize.css black_leaves.css prettify.css

%.css: %.scss
	sass --compass --style expanded --no-cache $< $@

all: main.min.css iphone.min.css ie-fixes.css

main.min.css: $(MAIN_CSS)
	(echo '@charset "UTF-8";'; echo; grep -hvF '@charset' $(MAIN_CSS) | yuicompressor --type=css --charset UTF-8) > main.min.css

iphone.min.css: $(MAIN_CSS)
	yuicompressor --type=css --charset UTF-8 -o iphone.min.css iphone.css

ie-fixes.css: black_leaves_iefixes.css
	yuicompressor --type=css --charset UTF-8 -o ie-fixes.css black_leaves_iefixes.css

clean:
	rm -f main.min.css iphone.min.css ie-fixes.css
	find *.scss | sed -e 's/.scss/.css/' | xargs rm -f
