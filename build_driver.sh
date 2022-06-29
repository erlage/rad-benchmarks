# clone repo
rm -rf js-framework-benchmark
git clone https://github.com/erlage/js-framework-benchmark
# forked rather than pining on https://github.com/krausest/js-framework-benchmark/

# extend bench  driver
cp -fr puppetter/* js-framework-benchmark/webdriver-ts/src/

# install
cd js-framework-benchmark
npm ci

# compile bench driver
cd webdriver-ts
npm ci 
npm run compile

# compile results driver
cd ../webdriver-ts-results
npm ci

# move to root
cd ../../
