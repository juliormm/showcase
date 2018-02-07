// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8888/db/public/',
  PREVIEWS_URL: ' http://quicktransmit.com/api/campaigns/_previews/',
  SHOWCASE_IMAGES: 'http://localhost:8888/db/public/images/showcase/',
  
  ASSETS_QT_URL: 'http://quicktransmit.com/api/campaigns/_previews/',
  ASSETS_PREVIEW_URL: 'http://previews.quicktransmit.com/_revs/'
};
