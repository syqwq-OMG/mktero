import { normalizeLocalFontName } from '../config/reader-preferences.js';

const XHTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';

export function populateReaderFontSelect(select, families, defaultLabel) {
    const names = [...new Set(families.map(normalizeLocalFontName))].filter(Boolean);
    const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
    names.sort(collator.compare);
    select.replaceChildren(
        fontOption(select, '', defaultLabel),
        ...names.map(name => fontOption(select, name, name))
    );
}

export function selectReaderFont(select, name) {
    const previous = select.querySelector('[data-saved-font]');
    if (previous && previous.value !== name) previous.remove();
    let option = [...select.options].find(candidate => candidate.value === name);
    if (!option) {
        option = fontOption(select, name, name);
        option.setAttribute('data-saved-font', '');
        select.appendChild(option);
    }
    option.selected = true;
}

function fontOption(select, value, label) {
    const option = select.ownerDocument.createElementNS(XHTML_NAMESPACE, 'option');
    option.value = value;
    option.textContent = label;
    return option;
}
