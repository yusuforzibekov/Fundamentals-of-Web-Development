function getMediaQueryInner(mediaQueryCssString) {
    if (typeof mediaQueryCssString !== 'string') {
        return null;
    }

    const mediaQueryWithInnerRegExp = /@media[^{]+\{([\s\S]+?})\s*}/i;
    const mediaQueryInner = mediaQueryCssString.match(mediaQueryWithInnerRegExp);

    return mediaQueryInner ? mediaQueryInner[1] : '';
}

module.exports = {
    getMediaQueryInner,
};
