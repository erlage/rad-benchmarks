# # # # # # # # # # # # # # # # # # # # # # # # # # # # 

BASE_URL="https://github.com/erlage/rad"
BASE_PATH="packages/rad"
BASE_REF="1ca373285605d22d54ca59c0abd115e39ce8c80b" # 1.0.1

HEAD_URL="https://github.com/erlage/rad"
HEAD_PATH="packages/rad"
HEAD_REF="some-ref-to-compare-against" 

# # # # # # # # # # # # # # # # # # # # # # # # # # # # 

# create tmp
rm -rf tmp
mkdir tmp

# create frameworks
cp -fr frameworks tmp/
rm -rf tmp/frameworks/keyed/angular
rm -rf tmp/frameworks/keyed/react
rm -rf tmp/frameworks/non-keyed/react

cp -rf tmp/frameworks/keyed/rad tmp/frameworks/keyed/rad-head
mv tmp/frameworks/keyed/rad tmp/frameworks/keyed/rad-base
cp -rf tmp/frameworks/non-keyed/rad tmp/frameworks/non-keyed/rad-head
mv tmp/frameworks/non-keyed/rad tmp/frameworks/non-keyed/rad-base

sed -i 's/"frameworkVersion": "DART"/"frameworkVersion": "BASE"/g' tmp/frameworks/keyed/rad-base/package.json
sed -i 's/"frameworkVersion": "DART"/"frameworkVersion": "HEAD"/g' tmp/frameworks/keyed/rad-head/package.json
sed -i 's/"frameworkVersion": "DART"/"frameworkVersion": "BASE"/g' tmp/frameworks/non-keyed/rad-base/package.json
sed -i 's/"frameworkVersion": "DART"/"frameworkVersion": "HEAD"/g' tmp/frameworks/non-keyed/rad-head/package.json

# build 

cd tmp/frameworks/keyed/rad-base

cd ../../keyed/rad-base
npm i
dart pub remove rad
dart pub add rad --git-url=${BASE_URL} --git-path=${BASE_PATH} --git-ref=${BASE_REF}
npm run build-prod

cd ../../keyed/rad-head
npm i
dart pub remove rad
dart pub add rad --git-url=${HEAD_URL} --git-path=${HEAD_PATH} --git-ref=${HEAD_REF}
npm run build-prod

cd ../../non-keyed/rad-base
npm i
dart pub remove rad
dart pub add rad --git-url=${BASE_URL} --git-path=${BASE_PATH} --git-ref=${BASE_REF}
npm run build-prod

cd ../../non-keyed/rad-head
npm i
dart pub remove rad
dart pub add rad --git-url=${HEAD_URL} --git-path=${HEAD_PATH} --git-ref=${HEAD_REF}
npm run build-prod

cd ../../../../

# move frameworks

rm -rf js-framework-benchmark/frameworks
cp -fr tmp/frameworks js-framework-benchmark/

# bench

cd js-framework-benchmark/webdriver-ts/

clear
npm run bench keyed/rad-base
clear
npm run bench keyed/rad-head
clear
npm run bench non-keyed/rad-base
clear
npm run bench non-keyed/rad-head
clear

cd ../../

# build results

sh build_results.sh
rm -rf tmp
mkdir tmp
cp -rf js-framework-benchmark/webdriver-ts-results/dist tmp/
