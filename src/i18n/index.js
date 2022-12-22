import i18n from 'i18n-js';
import ar from '../lang/ar';
import en from '../lang/en';

i18n.fallbacks = true;
i18n.translations = { ar, en };

i18n.locale = 'ar';

const t = (name) => {
    return i18n.t(name);
}

export { t };