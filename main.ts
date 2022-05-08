// ==UserScript==
// @name         网易云封面旋转
// @namespace    https://gplane.win/
// @version      0.1.0
// @description  在播放当前页面对应的歌曲时旋转封面。
// @author       Pig Fang <g-plane@hotmail.com>
// @license      MIT
// @copyright    2022-present, Pig Fang
// @create       2022-05-08
// @lastmodified 2022-05-08
// @supportURL   https://github.com/g-plane/netease-music-cover-rotation
// @match        https://music.163.com/
// @grant        none
// ==/UserScript==

;(() => {
  function isCurrentSong() {
    const linkToCurrent =
      document.querySelector('.m-playbar a.name')?.href ?? ''
    return linkToCurrent.endsWith(location.hash.replace('#', ''))
  }

  const style = document.createElement('style')
  style.textContent = `
  @keyframes cover-rotation {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .u-cover img {
    animation: 36s linear 0s infinite normal none paused cover-rotation;
  }
`

  const button = document.querySelector('a.ply')!

  setTimeout(() => {
    document.querySelector('iframe')?.contentDocument?.head.appendChild(style)
  }, 900)

  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      document.querySelector('iframe')?.contentDocument?.head.appendChild(style)
      if (isCurrentSong() && button.dataset.action === 'pause') {
        const cover = document
          .querySelector('iframe')!
          .contentDocument!.body.querySelector('.u-cover img')!
        cover.style.animationPlayState = 'running'
      }
    }, 900)
  })

  button.addEventListener('click', () => {
    if (!isCurrentSong()) {
      return
    }

    const cover = document
      .querySelector('iframe')!
      .contentDocument!.body.querySelector('.u-cover img')!
    if (button.dataset.action === 'play') {
      cover.style.animationPlayState = 'running'
    } else {
      cover.style.animationPlayState = 'paused'
    }
  })
})()
