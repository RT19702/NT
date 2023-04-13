const TokenKey = 'token';
const AddressKey = 'address';
const LanguageKey = 'language';

// 认证令牌
export function getToken() {
	return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
	return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
	return uni.removeStorageSync(TokenKey)
}

// 钱包地址
export function getAddress() {
	return uni.getStorageSync(AddressKey)
}

export function setAddress(address) {
	return uni.setStorageSync(AddressKey, address)
}

export function removeAddress() {
	return uni.removeStorageSync(AddressKey)
}

// 语言
export function getLanguage() {
	return uni.getStorageSync(LanguageKey)
}

export function setLanguage(language) {
	return uni.setStorageSync(LanguageKey, language)
}

export function removeLanguage() {
	return uni.removeStorageSync(LanguageKey)
}