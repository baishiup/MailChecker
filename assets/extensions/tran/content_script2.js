console.log('contentscrut2');

const setDefaultUserConfig = () => {
  const defaultConfig = {
    userConfig: {
      interfaceLanguage: 'zh-CN', // 插件界面中文
      translationUrlPattern: {
        excludeMatches: [],
        // 总是翻译的网址
        matches: [
          'twitter.com',
          'x.com/*',
          'x.com',
          'www.reddit.com',
          'www.kadaza.com',
          'en.wikipedia.org',
          '*.medium.com',
          'news.ycombinator.com',
          '*.playstation.com/*',
          '*.telegram.org/*',
          '*.github.com/*', // 有一级和二级域名都要配
          'github.com/*',
        ],
      },
      pcFloatBall: {
        enable: false, // 关闭悬浮球显示
      },
      enableInputTranslation: true, // 空格3次翻译
      isShowInputTranslationConsent: false, // 不显示空格翻译提示框
    },
  };
  chrome.storage.sync.set(defaultConfig, function () {
    console.log('Data saved.', defaultConfig);
  });
  // if (count > 10) {
  //   console.log('more count', count);
  //   return;
  // }
  // console.log('setDefaultUserConfig count', count);

  // chrome.storage.sync.get(['userConfig'], function (result) {
  //   const cloneData = JSON.parse(JSON.stringify(result));
  //   console.log('All data:', cloneData);
  //   if (!Object.keys(cloneData).length) {
  //     setTimeout(() => {
  //       setDefaultUserConfig(count + 1);
  //     }, 1000);
  //   }
  // });
};

setDefaultUserConfig();
// userConfig

// interfaceLanguage: "zh-CN"
