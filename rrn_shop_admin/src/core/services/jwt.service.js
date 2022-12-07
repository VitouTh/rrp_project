const REFESH_TOKEN = "refesh_token";

export const getRefeshToken = () => {
  return window.localStorage.getItem(REFESH_TOKEN);
};

export const saveRefeshToken = refesh_token => {
  window.localStorage.setItem(REFESH_TOKEN, refesh_token);
};

export const destroyRefeshToken = () => {
  window.localStorage.removeItem(REFESH_TOKEN);
};

export default {
  getRefeshToken,
  saveRefeshToken,
  destroyRefeshToken
};
