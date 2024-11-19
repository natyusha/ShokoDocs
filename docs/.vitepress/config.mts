import { defineConfig } from 'vitepress';
import lightbox from 'vitepress-plugin-lightbox';
import container from 'markdown-it-container';
import taskLists from 'markdown-it-task-lists';

export default defineConfig({
  title: 'Shoko Docs',
  description: 'Resource Center for  the Shoko Suite',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: '/images/logo.svg',
    outline: [2, 3],
    editLink: {
      pattern: 'https://github.com/ShokoAnime/ShokoDocs/edit/master/docs/:path',
    },
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Latest News', link: 'https://shokoanime.com/blog' },
      { text: 'Downloads', link: 'https://shokoanime.com/downloads' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Installing Shoko Server', link: '/getting-started/installing-shoko-server' },
          { text: 'Running Shoko Server', link: '/getting-started/running-shoko-server' },
          { text: 'Available Programs & Plugins', link: '/getting-started/available-programs-plugins' },
        ],
      },
      {
        text: 'Shoko Server',
        collapsed: true,
        items: [
          { text: 'Dashboard', link: '/shoko-server/dashboard' },
          { text: 'Logs', link: '/shoko-server/logs' },
          { text: 'Actions', link: '/shoko-server/actions' },
          { text: 'Settings', link: '/shoko-server/settings' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              { text: 'Unrecognized Files', link: '/shoko-server/unrecognized-files' },
              { text: 'Release Management', link: '/shoko-server/release-management' },
              { text: 'Series Without Files', link: '/shoko-server/series-without-files' },
              { text: 'File Search', link: '/shoko-server/file-search' },
              { text: 'File Rename', link: '/shoko-server/file-rename' },
            ],
          },
          {
            text: 'Misc',
            collapsed: true,
            items: [
              { text: 'Understanding AniDB Ban', link: '/shoko-server/understanding-anidb-ban' },
              { text: 'WebUI Themes', link: '/shoko-server/webui-themes' },
            ],
          },
        ],
      },
      {
        text: 'Plex Integration',
        collapsed: true,
        items: [
          { text: 'Installing Agents & Scanners', link: '/plex/installing-agents-scanners' },
          { text: 'Configuring Shoko Metadata', link: '/plex/configuring-shoko-metadata' },
          { text: 'Configuring Shoko Relay', link: '/plex/configuring-shoko-relay' },
          { text: 'Shoko Relay Utility Scripts', link: '/plex/shoko-relay-utility-scripts' },
          { text: 'Syncing Watched States', link: '/plex/syncing-watched-states' },
        ],
      },
      {
        text: 'Jellyfin Integration',
        collapsed: true,
        items: [
          { text: 'Installing Shokofin', link: '/jellyfin/installing-shokofin' },
          { text: 'Configuring Shokofin', link: '/jellyfin/configuring-shokofin' },
          { text: 'Recommendations', link: '/jellyfin/recommendations' },
          { text: 'Scheduled Tasks', link: '/jellyfin/scheduled-tasks' },
        ],
      },
      {
        text: 'Kodi Integration',
        collapsed: true,
        items: [
          { text: 'Installing Shokodi', link: '/kodi/installing-shokodi' },
          { text: 'Configuring Shokodi', link: '/kodi/configuring-shokodi' },
        ],
      },

      {
        text: 'Renaming Plugins',
        collapsed: true,
        items: [
          { text: 'Available Renamers', link: '/renamer-plugins/available-renamers' },
          {
            text: 'WebAOM',
            collapsed: true,
            items: [
              { text: 'Getting Started', link: '/renamer-plugins/webaom/getting-started' },
              { text: 'Renaming', link: '/renamer-plugins/webaom/renaming' },
              { text: 'Moving', link: '/renamer-plugins/webaom/moving' },
            ],
          },
          {
            text: 'Lua Renamer',
            collapsed: true,
            items: [
              { text: 'Getting Started', link: '/renamer-plugins/lua/getting-started' },
              { text: 'Script Authoring', link: '/renamer-plugins/lua/script-authoring' },
              { text: 'FAQ', link: '/renamer-plugins/lua/faq' },
            ],
          },
        ],
      },
      {
        text: 'Changelog',
        collapsed: true,
        items: [
          { text: 'Shoko Server', link: '/changelog/shoko-server' },
          { text: 'Shoko WebUI', link: '/changelog/shoko-webui' },
          { text: 'Shoko Desktop', link: '/changelog/shoko-desktop' },
          { text: 'Shoko Metadata', link: '/changelog/shoko-metadata' },
          { text: 'Shoko Relay', link: '/changelog/shoko-relay' },
          { text: 'Shokofin', link: '/changelog/shokofin' },
          { text: 'My Anime 3', link: '/changelog/my-anime-3' },
        ],
      },
      { text: 'FAQ', link: '/faq' },
      { text: 'Contribute', link: '/contribute' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ShokoAnime/' },
      { icon: 'discord', link: 'https://discord.gg/vpeHDsg' },
    ],
  },
  markdown:
      {
        config: (md) => {
          md.use(lightbox, {});
          md.use(taskLists);
          md.use(container, 'important', {
            render(tokens, idx) {
              const token = tokens[idx];
              const title = token.info.trim().slice('important'.length).trim();
              if (token.nesting === 1) {
                return `<div class="important custom-block"><p class="custom-block-title">${title ? title : 'Important'}</p>\n`;
              } else {
                return '</div>\n';
              }
            },
          });
        },
        container: {
          tipLabel: 'Tip',
          warningLabel: 'Warning',
          dangerLabel: 'Danger',
          infoLabel: 'Note',
          detailsLabel: 'Details',
        },
      },
  transformHead({ pageData }) {
    const title = pageData.frontmatter.title || 'Shoko';
    const description = pageData.frontmatter.description || 'Anime Management System';
    const ogImageUrl = `/images/og.png?title=${encodeURIComponent(title,)}&description=${encodeURIComponent(description)}`;
    const url = `https://docs.shokoanime.com/${pageData.relativePath.replace(/\.md$/, '',)}`;

    return [
      ['meta', { name: 'og:title', content: title }],
      ['meta', { name: 'og:description', content: description }],
      ['meta', { name: 'og:image', content: ogImageUrl }],
      ['meta', { name: 'og:url', content: url }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: ogImageUrl }],
    ];
  },
});
