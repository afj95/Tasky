import { I18n, Scope } from 'i18n-js';
import ar from './lang/ar';
import en from './lang/en';

const i18n = new I18n({ ar, en })

i18n.enableFallback = true;
i18n.defaultLocale = 'ar';

const t = (name: Scope) => {
    return i18n.t(name);
}

export { t, i18n };