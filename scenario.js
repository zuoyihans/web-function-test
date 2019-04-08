module.exports.testdata = [
  {
    description: 'samplecase',
    scenarios: [
      {
        description: 'open url',
        actions: [
          {
            action: 'openUrl',
            param: 'P_BaiduUrl'
          }
        ]
      },
      // {
      //   description: 'search',
      //   actions: [
      //     {
      //       action: 'input',
      //       object: 'P_searchInput',
      //       param: 'P_searchKey',
      //     },
      //     {
      //       action: 'click',
      //       object: 'P_searchButton',
      //     },
      //   ]
      // },
    ]
  }
]