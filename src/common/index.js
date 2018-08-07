const checkValidPassword = value => {
  let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(value)
    ? null
    : 'Mật khẩu phải có ít nhât 8 kí tự, 1 kí tự in hoa, 1 kí tự số, 1 kí tự thường';
};

const checkValidMail = value => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? null : 'Email không hợp lê';
};

const validBlankField = (name, value) => {
  return value === '' ? `${name} không được để trống` : null;
};

const checkPhone = value => {
  const reg = /^[0-9]*$/;
  return reg.test(value) ? null : 'Số điện thoại không hợp lệ';
};

export default {
  checkValidMail,
  checkValidPassword,
  validBlankField,
  checkPhone
};
