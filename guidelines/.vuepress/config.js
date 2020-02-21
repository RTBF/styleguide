module.exports = {
  title: 'Digital guidelines',
  description: 'Just playing around',
  head: [
    ['link', {
      rel: 'icon',
      href: '/assets/img/favicon-rtbf.png'
    }]
  ],
  themeConfig: {
    lastUpdated: 'Dernière mise à jour', // string | boolean
    nav: [
      { text: 'RTBF', link: 'https://www.rtbf.be/' },
      { text: 'Auvio', link: 'https://www.rtbf.be/auvio/' }
    ],
    logo: '/assets/img/favicon-rtbf.png',
    smoothScroll: true,
    sidebar: [
      {
        title: 'À propos',
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          'a-propos/',
          'a-propos/comment',
          'a-propos/impartialite',
          'a-propos/privacy',
          'a-propos/content'
        ]
      },
      {
        title: 'Guidelines',
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          'guidelines/'
        ]
      },
      {
        title: 'Archive',
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          'old/',
          'old/classname-generator',
          'old/styleguide'
        ]
      }
    ]
  }
}
