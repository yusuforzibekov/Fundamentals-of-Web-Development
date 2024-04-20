function getAllMediaQueriesStrings(cssString) {
    const allMediaQueriesRegExp = /@media[^{]+\{[\s\S]+?}\s*}/gi;
    
    return cssString.match(allMediaQueriesRegExp);
}

module.exports = {
    getAllMediaQueriesStrings,
};
