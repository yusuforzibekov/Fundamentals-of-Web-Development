function getFirstMediaQueryInner(cssString) {
    let mediaQueryResults = cssString.match(/@media[^{]+\{([\s\S]+?})\s*}/i);

    return mediaQueryResults ? mediaQueryResults[0] : '';
};

module.exports = { getFirstMediaQueryInner };
