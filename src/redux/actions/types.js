
/**
 * AUTH
 */
export const APP_SET_AUTH_STATE = 'app/setAuthState';
export const UPDATE_APP_MESSAGE = 'app/updateMessage';
export const APP_SAVE_LOGGED_USER = 'app/saveLoggedUser';
export const APP_REMOVE_LOGGED_USER = 'app/removeLoggedUser';
export const APP_SAVE_REFRESH_TOKEN = 'app/saveRefreshToken';
export const APP_SAVE_SOCIAL_TYPE = 'app/saveSocialType';
export const APP_WIPE_DATA = 'app/wipeData';
export const APP_LOGIN = 'app/login';
export const APP_LOGOUT = 'app/logout';
export const APP_REGISTER = 'app/register';
export const APP_VERIFY_TOKEN = 'app/verifyToken';

/**
 * ACCOUNT
 */
export const ACC_GET_PROFILE = 'app/getProfile';
export const ACC_REPLACE_PROFILE = 'app/replaceProfile';
export const ACC_UPDATE_PROFILE = 'app/updateProfile';
export const ACC_SEARCH_PROFILE = 'app/searchProfile';
export const ACC_GET_USER_INFO = 'app/getUserInfo';

/**
 * NAVIGATOR
 */
export const NAV_RESET = 'navigate/reset';
export const NAV_PUSH = 'navigate/push';
export const NAV_POP = 'navigate/pop';

/**
 * NOTIFICATION
 */
export const NOTIFICATION_GET = 'app/getNotification';
export const NOTIFICATION_RECEIVED = 'app/receiveNotification';
export const NOTIFICATION_REPLACE = 'app/replaceNotification';
export const NOTIFICATION_THROW = 'app/throwNotification';

/**
 * REQUEST
 */
export const MARK_REQUEST_PENDING = 'request/requestPending';
export const MARK_REQUEST_SUCCESS = 'request/requestSuccess';
export const MARK_REQUEST_FAILED = 'request/requestFailed';
export const MARK_REQUEST_CANCELLED = 'request/requestCancelled';

/**
 * TOAST
 */
export const TOAST_SET = 'app/setToast';
export const TOAST_CLEAR = 'app/clearToast';

/**
 * MODAL
 */
export const MODAL_OPEN = 'app/openModal';
export const MODAL_CLOSE = 'app/closeModal';

/**
 * DRAWER
 */
export const DRAWER_OPEN = 'app/openDrawer';
export const DRAWER_CLOSE = 'app/closeDrawer';

/**
 * INVOKE
 */
export const INVOKE_CALLBACK = 'app/invokeCallBack';

/**
 * GALLERY
 */
export const GALLERY_OPEN = 'app/playingGallery';
export const GALLERY_CLOSE = 'app/closeGallery';

/**
 * BROWSER
 */
export const BROWSER_OPEN = 'app/openBrowser';
export const BROWSER_CLOSE = 'app/closeBrowser';

// ecommerce

//theme
export const CHANGE_THEME = 'CHANGE_THEME';
export const SWITCH_ACTIVATION = 'SWITCH_ACTIVATION';

//app
export const COLLPSE_CHANGE = 'COLLPSE_CHANGE';
export const COLLPSE_OPEN_DRAWER = 'COLLPSE_OPEN_DRAWER';
export const CHANGE_OPEN_KEYS = 'CHANGE_OPEN_KEYS';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const CHANGE_CURRENT = 'CHANGE_CURRENT';

//Package manager
export const PACKAGE_GET_LIST = 'PACKAGE_GET_LIST';
export const PACKAGE_GET_LIST_SUCCESS = 'PACKAGE_GET_LIST_SUCCESS';
export const PACKAGE_UPDATE_STATUS = 'PACKAGE_UPDATE_STATUS';
export const PACKAGE_UPDATE_STATUS_SUCCESS = 'PACKAGE_UPDATE_STATUS_SUCCESS';
export const PACKAGE_FILTER_CHANGE = 'PACKAGE_FILTER_CHANGE';
export const PACKAGE_PAGE_CHANGE = 'PACKAGE_PAGE_CHANGE';

export const APP_UPLOAD_ECOMMERCE_FILE = 'app/uploadEcommerceFile';
export const APP_UPLOAD_ECOMMERCE_MULTI_FILE = 'app/uploadEcommerceMultiFile';
export const APP_REMOVE_FILE = 'app/removeFile';
export const APP_REMOVE_MULTI_FILE = 'app/uploadMultiFile';



//PROJECT MANAGER
export const GET_LIST_PROJECTS = 'GET_LIST_PROJECTS'
export const GET_DETAIL_PROJECT = 'GET_DETAIL_PROJECT'
export const ADD_PROJECT = 'ADD_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'

export const SAVE_LIST_PROJECTS = 'SAVE_LIST_PROJECTS'
export const SAVE_DETAIL_PROJECT = 'SAVE_DETAIL_PROJECT'
export const SAVE_UPDATE_PROJECT = 'SAVE_UPDATE_PROJECT'
export const SAVE_DELETE_PROJECT = 'SAVE_DELETE_PROJECT'
export const SAVE_ADD_PROJECT = 'SAVE_ADD_PROJECT'


//LOCATE
export const GET_LIST_CITIES = 'GET_LIST_CITIES'
export const GET_LIST_DISTRIC = 'GET_LIST_DISTRIC'
export const GET_LIST_WARDS = 'GET_LIST_WARDS'
export const SEARCH_PROJECT = 'SEARCH_PROJECT'


//INVESTOR MANAGER

export const GET_LIST_INVESTORS = 'GET_LIST_INVESTORS'
export const ADD_INVESTOR_REQUEST = 'ADD_INVESTOR_REQUEST'
export const DELETE_INVESTOR_REQUEST = 'DELETE_INVESTOR_REQUEST'
export const EDIT_INVESTOR_REQUEST = 'EDIT_INVESTOR_REQUEST'
export const GET_INVESTOR_REQUEST = 'GET_INVESTOR_REQUEST'


export const SAVE_LIST_INVESTORS = 'SAVE_LIST_INVESTORS'
export const SAVE_SEECTED_INVESTOR = 'SAVE_SEECTED_INVESTOR'
export const SAVE_ADD_INVESTOR = 'SAVE_ADD_INVESTOR'
export const SAVE_EDIT_INVESTOR = 'SAVE_EDIT_INVESTOR'
export const SAVE_DELETE_INVESTOR = 'SAVE_DELETE_INVESTOR'
export const SAVE_BAN_INVESTOR = 'SAVE_BAN_INVESTOR'


//USER
export const GET_LIST_USERS = 'GET_LIST_USERS'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'
     

export const SAVE_LIST_USERS = 'SAVE_LIST_USERS'
export const SAVE_EDIT_USER = 'SAVE_EDIT_USER'
export const SAVE_DELETE_USER = 'SAVE_DELETE_USER'


//BUILDING MANAGER
export const GET_LIST_BUILDING = 'GET_LIST_BUILDING'
export const GET_DETAIL_BUILDING = 'GET_DETAIL_BUILDING'
export const ADD_BUILDING = 'ADD_BUILDING'
export const DELETE_BUILDING = 'DELETE_BUILDING'
export const EDIT_BUILDING = 'EDIT_BUILDING'

export const SAVE_LIST_BUILDING = 'SAVE_LIST_BUILDING'
export const SAVE_DETAIL_BUILDING = 'SAVE_DETAIL_BUILDING'
export const SAVE_ADD_BUILDING = 'SAVE_ADD_BUILDING'
export const SAVE_EDIT_BUILDING = 'SAVE_EDIT_BUILDING'
export const SAVE_DELETE_BUILDING = 'SAVE_DELETE_BUILDING'


//FLOOR
export const GET_LIST_FLOOR = 'GET_LIST_FLOOR'
export const EDIT_FLOOR = 'EDIT_FLOOR'

export const SAVE_FLOOR = 'SAVE_FLOOR'
export const SAVE_FLOORS = 'SAVE_FLOORS'


//CONDO
export const ADD_CONDO = 'ADD_CONDO'
export const GET_LIST_CONDOS_BY_FLOOR = 'GET_LIST_CONDOS_BY_FLOOR'
export const GET_LIST_CONDOS_BY_BUILDING = 'GET_LIST_CONDOS_BY_BUILDING'
export const DELETE_CONDO = 'DELETE_CONDO'
export const GET_DETAIL_CONDO = 'GET_DETAIL_CONDO'
export const EDIT_CONDO = 'EDIT_CONDO'

export const SAVE_CONDOS_BY_BUILDING = 'SAVE_CONDOS_BY_BUILDING'
export const SAVE_DELETE_CONDO = 'SAVE_DELETE_CONDO'
export const SAVE_ADD_CONDO = 'SAVE_ADD_CONDO'
