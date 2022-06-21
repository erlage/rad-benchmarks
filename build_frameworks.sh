cd js-framework-benchmark/frameworks/keyed/react

cd ../react && npm ci && npm run build-prod
cd ../angular && npm ci && npm run build-prod
cd ../rad && npm ci && npm run build-prod

cd ../../../../

cd js-framework-benchmark/frameworks/non-keyed/react

cd ../react && npm ci && npm run build-prod
cd ../rad && npm ci && npm run build-prod

cd ../../
