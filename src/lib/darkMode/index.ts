import { getQueryVariable } from '../utils';
import store from 'store';
import BLOG from 'blog.config';

/**
 * 初始化主题 , 优先级 query > cookies > systemPrefer
 * @param isDarkMode
 * @description 读取cookie中存的用户主题
 */
export const initDarkMode = () => {
  // 查看用户设备浏览器是否深色模型
  let isDarkMode = isPreferDark();

  // 查看cookie中是否用户强制设置深色模式
  const storageDarkMode = loadDarkModeFromLocalStorage();
  if (storageDarkMode) {
    isDarkMode = JSON.parse(storageDarkMode);
  }

  // url查询条件中是否深色模式
  const queryMode = getQueryVariable('mode');
  if (queryMode) {
    isDarkMode = queryMode === 'dark';
  }

  return isDarkMode;
};

export const operateDarkMode = (isDarkMode: boolean) => {
  const htmlElement = document.getElementsByTagName('html')[0];
  htmlElement.classList.toggle('light', !isDarkMode);
  htmlElement.classList.toggle('dark', isDarkMode);
};

/**
 * 是否优先深色模式， 根据系统深色模式以及当前时间判断
 * @returns {*}
 */
export function isPreferDark() {
  if (BLOG.APPEARANCE === 'dark') {
    return true;
  }
  if (BLOG.APPEARANCE === 'auto') {
    // 系统深色模式或时间是夜间时，强行置为夜间模式
    const date = new Date();
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return (
      prefersDarkMode ||
      (BLOG.APPEARANCE_DARK_TIME &&
        (date.getHours() >= BLOG.APPEARANCE_DARK_TIME[0] ||
          date.getHours() < BLOG.APPEARANCE_DARK_TIME[1]))
    );
  }
  return false;
}

/**
 * 读取深色模式
 * @returns {*}
 */
export const loadDarkModeFromLocalStorage = () => {
  return store.get('isDarkMode');
};

/**
 * 保存深色模式
 * @param isDarkMode
 */
export const saveDarkModeToLocalStorage = (isDarkMode: boolean) => {
  store.set('isDarkMode', isDarkMode);
};
