// import {
//   COLLPSE_CHANGE,
//   TOGGLE_ALL,
//   COLLPSE_OPEN_DRAWER,
//   CHANGE_OPEN_KEYS,
//   CHANGE_CURRENT
// } from './types';

// export function getView(width) {
//   let newView = 'MobileView';
//   if (width > 1220) {
//     newView = 'DesktopView';
//   } else if (width > 767) {
//     newView = 'TabView';
//   }
//   return newView;
// }
// const actions = {
//   COLLPSE_CHANGE: 'COLLPSE_CHANGE',
//   COLLPSE_OPEN_DRAWER: 'COLLPSE_OPEN_DRAWER',
//   CHANGE_OPEN_KEYS: 'CHANGE_OPEN_KEYS',
//   TOGGLE_ALL: 'TOGGLE_ALL',
//   CHANGE_CURRENT: 'CHANGE_CURRENT',
//   toggleCollapsed: () => ({
//     type: actions.COLLPSE_CHANGE
//   }),
//   toggleAll: (width, height) => {
//     const view = getView(width);
//     const collapsed = view !== 'DesktopView';
//     return {
//       type: actions.TOGGLE_ALL,
//       collapsed,
//       view,
//       height
//     };
//   },
//   toggleOpenDrawer: () => ({
//     type: actions.COLLPSE_OPEN_DRAWER
//   }),
//   changeOpenKeys: openKeys => ({
//     type: actions.CHANGE_OPEN_KEYS,
//     openKeys
//   }),
//   changeCurrent: current => ({
//     type: actions.CHANGE_CURRENT,
//     current
//   })
// };
// export default actions;



import {
  COLLPSE_CHANGE,
  TOGGLE_ALL,
  COLLPSE_OPEN_DRAWER,
  CHANGE_OPEN_KEYS,
  CHANGE_CURRENT
} from './types';

export const getView = width => {
  let newView = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
};

export const toggleCollapsed = () => ({
  type: COLLPSE_CHANGE
});
export const toggleAll = (width, height) => {
  const view = getView(width);
  const collapsed = view !== 'DesktopView';
  return {
    type: TOGGLE_ALL,
    collapsed,
    view,
    height
  };
};
export const toggleOpenDrawer = () => ({
  type: COLLPSE_OPEN_DRAWER
});
export const changeOpenKeys = openKeys => ({
  type: CHANGE_OPEN_KEYS,
  openKeys
});
export const changeCurrent = current => ({
  type: CHANGE_CURRENT,
  current
});

