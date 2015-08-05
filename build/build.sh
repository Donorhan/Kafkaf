# Build entity system dependencies.
../libs/closure-library/closure/bin/build/depswriter.py  --root_with_prefix="../libs/JS-EntitySystem/src/ ../../../../libs/JS-EntitySystem/src/" > ../libs/JS-EntitySystem-deps.js

# Build game dependencies.
../libs/closure-library/closure/bin/build/depswriter.py  --root_with_prefix="../src/ ../../../../src/" > ./deps.js

java -jar ../libs/closure-compiler.jar \
	--compilation_level SIMPLE_OPTIMIZATIONS \
	--language_in=ECMASCRIPT5_STRICT \
	--warning_level VERBOSE \
	--only_closure_dependencies\
	--summary_detail_level 3 \
	--process_closure_primitives true \
	--closure_entry_point="Kafkaf.Main"\
    --js='../src/**.js' \
    --js='../libs/JS-EntitySystem/src/**.js' \
    --js='../libs/closure-library/**.js' \
    --js='!../libs/closure-library/**_test.js' \
    --js='!../libs/closure-library/**_test.js' \
    --externs='../libs/Box2D_externs.js' \
	--js_output_file Kafkaf.js
