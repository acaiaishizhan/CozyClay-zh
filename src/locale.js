import { zhExtra } from "./zh-extra.js";

// CozyClay UI locale. This fork defaults to Simplified Chinese.
//
// An explicit choice saved in localStorage wins. Without one, the UI always
// starts in Chinese regardless of browser or operating-system language.
// The locale is fixed for the lifetime of the page — every label goes through
// ko() at render time, so switching saves the choice and reloads.
const KEY = "cozyclay.locale";
const LOCALES = new Set(["zh", "en", "ko"]);

function stored() {
	try {
		const value = localStorage.getItem(KEY);
		return LOCALES.has(value) ? value : null;
	} catch {
		return null;
	}
}

export const LOCALE = stored() ?? "zh";
export const isKo = LOCALE === "ko";
export const isZh = LOCALE === "zh";
// Whether the operator has explicitly chosen a language.
export const localeChosen = stored() !== null;

/** Pick the label for the active locale: ko("Frame", "프레임", "帧"). */
export function ko(en, koText, zhText) {
	if (isZh) return zhText ?? zhExtra[en] ?? en;
	return isKo ? koText : en;
}

export function setLocale(next) {
	if (!LOCALES.has(next)) return;
	try {
		localStorage.setItem(KEY, next);
	} catch {
		// Private mode without storage: the toggle still works for this load.
	}
	window.location.reload();
}
