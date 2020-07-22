let setToken = val => localStorage.setItem('token', val);
let getToken = () => {
  return localStorage.getItem('token');
};
let removeToken = () => localStorage.removeItem('token');
let clearLocal = () => localStorage.clear();

export {
	setToken,
	getToken,
	removeToken,
	clearLocal
}