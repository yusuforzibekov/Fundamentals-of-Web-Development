const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const hexRgb = require('../test-utils/hex-rgb');
const { getAllMediaQueriesStrings } = require('../test-utils/getAllMediaQueriesStrings');
const { getMediaQueryInner } = require('../test-utils/getMediaQueryInner');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');

const { JSDOM } = require('jsdom');

describe('Cross browser/device development', () => {
    let htmlString;

    let dom;
    let document;

    let styleCssString;
    let variablesCssString;

    let varSpaceSizeReplacement;

    beforeEach(async () => {
        varSpaceSizeReplacement = '7777px';

        const htmlFilePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(htmlFilePath);

        const variablesCssPath = path.join(__dirname, 'variables.css');
        const styleCssPath = path.join(__dirname, 'style.css');
        const mainCssPath = path.join(__dirname, 'main.css');
        
        styleCssString = await readTextFile(styleCssPath);
        variablesCssString = await readTextFile(variablesCssPath);

        const mainCssString = await readTextFile(mainCssPath);
        
        // Create fake DOM
        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;

        document.body.insertAdjacentHTML('beforeend', `<style>${mainCssString}</style>`);
    });

    // This test is mandatory for all the HTML related tasks
    it('html page should be valid', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });

    describe('Print only data:', () => {
        beforeEach(() => {
            const testsAddedStyles = document.getElementById('tests-added');
            testsAddedStyles && testsAddedStyles.remove();

            document.body.insertAdjacentHTML('beforeend', `<style id="tests-added">${styleCssString}</style>`);
        });

        it('should hide print only elements', async () => {
            await waitBrowserLoadEvent(document);

            const allPrintOnlyElements = Array.from(document.querySelectorAll('.print-only')); 

            const allAreHidden = allPrintOnlyElements.every((element) => {
                const elementStyles = dom.window.getComputedStyle(element);

                return elementStyles.display === 'none';
            });

            expect(allAreHidden).toBe(true);
        });
    });

    describe('Print version:', () => {
        beforeEach(() => {
            const testsAddedStyles = document.getElementById('tests-added');
            testsAddedStyles && testsAddedStyles.remove();

            const allMediaStrings = getAllMediaQueriesStrings(styleCssString);

            const varSpaceSizeRegExp = /var\( *--space-size *\)/gi;
            const printMediaCssString = allMediaStrings
                .filter((cssString) => {
                    return / *@media +print */gi.test(cssString);
                })
                .map((cssString) => {
                    return getMediaQueryInner(cssString)
                        .replace(varSpaceSizeRegExp, varSpaceSizeReplacement);
                })
                .join('');

            document.body.insertAdjacentHTML('beforeend', `<style id="tests-added">${printMediaCssString}</style>`);
        });

        it('should show print only elements on print', async () => {
            await waitBrowserLoadEvent(document);

            const allPrintOnlyElements = Array.from(document.querySelectorAll('.print-only')); 

            const allAreHidden = allPrintOnlyElements.every((element) => {
                const elementStyles = dom.window.getComputedStyle(element);

                return elementStyles.display === 'block';
            });

            expect(allAreHidden).toBe(true);
        });

        it('<body> element should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('body');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                color: hexRgb('#000', { format: 'css' }),
                hyphens: 'auto',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('elements with class .card should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.card');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                color: hexRgb('#000', { format: 'css' }),
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('<h1> element should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('h1');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                color: hexRgb('#000', { format: 'css' }),
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('element with .logo class should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.logo');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                width: '200px',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('sections headings should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('section h2');
            
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                paddingTop: '0px',
                paddingBottom: '0px',
                paddingLeft: varSpaceSizeReplacement,
                paddingRight: varSpaceSizeReplacement,

                marginLeft: '0px',
                marginRight: '0px',
                marginTop: '0px',
                marginBottom: '0px',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('element with .main-column class should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.main-column');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                height: 'auto',
                paddingLeft: '0px',
                paddingRight: '0px',
                paddingTop: '0px',
                paddingBottom: '0px',

                color: hexRgb('#000', { format: 'css' }),
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        describe('Hiding elements:', () => {
            it('all <nav> elements should be hidden', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('nav');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    display: 'none',
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });

            it('all <img> elements inside <footer> should be hidden', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('footer img');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    display: 'none',
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });

            it('elements with class .header_button inside <footer> should be hidden', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('.header_button');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    display: 'none',
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });

            it('<figure> inside element with class .title_section should be hidden', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('.title_section figure');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    display: 'none',
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });

            it('element with class .subtitle should be hidden', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('.subtitle');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    display: 'none',
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });
        });

        describe('Layout changes:', () => {
            it('element with .title_section class should have expected styles', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('.title_section');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    display: 'block',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });

            it('elements that match selector `main section div` should have expected styles', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('.title_section');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    display: 'block',
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });

            it('element with .column class should have expected styles', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('.column');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',

                    marginLeft: '0px',
                    marginRight: '0px',
                    marginTop: '0px',
                    marginBottom: '0px',
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });
        });

        describe('Page footer updates:', () => {
            it('<address> element inside <footer> should have expected styles', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector('footer address');
                const elementStyles = dom.window.getComputedStyle(element);
                const expectedStyles = {
                    display: 'block',
                    width: '100%',
                    fontSize: '20px',
                    textAlign: 'left'
                };
    
                expect(elementStyles)
                    .toEqual(expect.objectContaining(expectedStyles));
            });

            it('should have correct styles for a::after in <footer>', async () => {
                await waitBrowserLoadEvent(document);
    
                const styleDeclaration = getStyleDeclarationForSelector('footer address a::after', document.styleSheets);
    
                expect(styleDeclaration).toEqual(expect.objectContaining({
                    'margin-left': '5px',
                    'content': 'attr(href)',
                    'text-decoration': 'underline',
                }));
            });
        });

        describe('@page styles', () => {
            it('should have correct styles for all printed pages', async () => {
                await waitBrowserLoadEvent(document);
    
                const styleDeclaration = getStyleDeclarationForSelector('@page', document.styleSheets);
    
                expect(styleDeclaration).toEqual(expect.objectContaining({
                    'margin-left': '2cm',
                }));
            });
        });

    });
});
