const path = require('path');
const {
    HtmlValidate
} = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const {
    readTextFile
} = require('../test-utils/readTextFile');
const {
    waitBrowserLoadEvent
} = require('../test-utils/waitBrowserEvent');
const {
    getStyleDeclarationForSelector
} = require('../test-utils/getStyleDeclarationForSelector');
const {
    cipheredTestData
} = require('../test-utils/cipheredTestData');

const {
    JSDOM
} = require('jsdom');
const cipher = require('base-64');

describe('CSS Variables', () => {
    let htmlString;
    let cssString;

    let dom;
    let document;

    beforeEach(async () => {
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);

        const cssPath = path.join(__dirname, 'style.css');
        cssString = await readTextFile(cssPath);

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;

        // Replace CSS href with absolute paths
        const linksCSS = document.querySelectorAll('link[rel="stylesheet"]');
        for (let linkCSS of linksCSS) {
            const initialHref = linkCSS.getAttribute('href');
            const linkAbsolutePath = path.join(__dirname, initialHref);
            linkCSS.setAttribute('href', `file:///${linkAbsolutePath}`);
        }
    });

    // This test is mandatory for all the HTML related tasks
    it('html page should be valid', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);

        expect(report).toEqual(expect.objectContaining({
            valid: true
        }));
    });

    it('should have 5 @font-face at-rules in style.css file', async () => {
        const colorCount = cssString.match(new RegExp("@font-face", "g")).length;
        expect(colorCount)
            .toBe(5);
    });

    it('should have Gantari font-family for all document ', async () => {
        await waitBrowserLoadEvent(document);

        const styleDeclaration = getStyleDeclarationForSelector('body', document.styleSheets);

        expect(styleDeclaration).toEqual(expect.objectContaining({
            'font-family': 'Gantari, sans-serif'
        }));
    });

    it('should have DancingScript font-family for logo', async () => {
        await waitBrowserLoadEvent(document);

        const styleDeclaration = getStyleDeclarationForSelector('.logo', document.styleSheets);

        expect(styleDeclaration).toEqual(expect.objectContaining({
            'font-family': 'DancingScript, cursive'
        }));
    });
    it('should have DancingScript font-family for content text near images', async () => {
        await waitBrowserLoadEvent(document);

        const styleDeclaration = getStyleDeclarationForSelector('.content_caption', document.styleSheets);

        expect(styleDeclaration).toEqual(expect.objectContaining({
            'font-family': 'DancingScript, cursive'
        }));
    });

    it('should style images to cover all parent section', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelector(cipher.decode(cipheredTestData['content-article-img']));
        const computedStyle = dom.window.getComputedStyle(element);

        expect(computedStyle)
            .toEqual(expect.objectContaining({
                'width': '100%',
                'height': '100%',
                'object-fit': 'cover'
            }));
    });

    it('first image should be  top-right corner positioned', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelector(cipher.decode(cipheredTestData['content-article-img-first']));
        const computedStyle = dom.window.getComputedStyle(element);

        expect(computedStyle)
            .toEqual(expect.objectContaining({
                'object-position': 'top right'
            }));
    });

    it('second image should be bottom-right corner positioned', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelector(cipher.decode(cipheredTestData['content-article-img-second']));
        const computedStyle = dom.window.getComputedStyle(element);

        expect(computedStyle)
            .toEqual(expect.objectContaining({
                'object-position': 'bottom right'
            }));
    });

    it('third image should be top-left corner positioned and have  hue-rotate filter', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelector(cipher.decode(cipheredTestData['content-article-img-third']));
        const computedStyle = dom.window.getComputedStyle(element);

        expect(computedStyle)
            .toEqual(expect.objectContaining({
                'object-position': 'top left',
                'filter': 'hue-rotate(90deg)'
            }));
    });

    it('fourth image should be top-left corner positioned and inverted', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelector(cipher.decode(cipheredTestData['content-article-img-fourth']));
        const computedStyle = dom.window.getComputedStyle(element);

        expect(computedStyle)
            .toEqual(expect.objectContaining({
                'object-position': 'top left',
                'filter': 'invert(100%)'
            }));
    });
});
