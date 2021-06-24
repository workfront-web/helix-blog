/**
 * sets marketing tech context
 */

function setMarTechContext() {
  var env='dev';
  var hostname=window.location.hostname;
  if (hostname.includes('staging')) env='stage';
  if (hostname == 'blog.adobe.com') env='production';

  var isDX=false;
  document.querySelectorAll('main>div:last-of-type>p').forEach(($p) => {
    if ($p.innerHTML.includes('Products:') || $p.innerHTML.includes('Topics:')) {
      if (checkDX($p.innerHTML.split(':')[1])) {
        isDX=true;
      }
    }
  });

  var accounts='';
  if (isDX) {
    if (env == 'production') {
      accounts='adbadobedxprod';
    }
    if (env == 'stage') {
      accounts='adbadobedxqa';
    }
  }

  window.marketingtech = {
    adobe: {
      launch: {
        property: 'global',
        environment: env  // “production” for prod/live site or “stage” for qa/staging site
      },
      analytics: {
        additionalAccounts: accounts // additional report suites to send data to “,” separated  Ex: 'RS1,RS2'
      },
      target: true,    // if target needs to be enabled else false
      audienceManager: true    // if audience manager needs to be enabled else false
    }
  };
  console.log(window.marketingtech)
  console.log("HELLO WORLD")
}

/**
 * sets digital data
 */

function setDigitalData() {
  var langMap={'en': 'en-US'};
  var lang=window.blog.language;
  if (langMap[lang]) lang=langMap[lang];
  digitalData._set('page.pageInfo.language', lang);
}

setMarTechContext();

window.targetGlobalSettings = {
  bodyHidingEnabled: false,
};

loadScript('https://www.adobe.com/marketingtech/main.min.js', () => {
  setDigitalData();
});
