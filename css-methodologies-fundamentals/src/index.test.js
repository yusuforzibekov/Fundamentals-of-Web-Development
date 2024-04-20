const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');
const { getKeyFrameDeclarationByName } = require('../test-utils/getKeyFrameDeclarationByName');

const { JSDOM } = require('jsdom');

describe('CSS Animations', () => {
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
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });  
    
    it('html page class name should follow BEM format', async () => {
        await waitBrowserLoadEvent(document);
        const elements = document.querySelectorAll('*');
        const bemPattern = /^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$/;
        elements.forEach((el)=> {
            if(el.getAttribute("class")) {
                let classNames=el.getAttribute("class").split(" ");
                classNames.forEach((name) => {
                    expect(bemPattern.test(name));    
                })
            }
        });
    });

    it('block element should have proper styling', async() => {
        await waitBrowserLoadEvent(document);
           
        const styleDeclaration = getStyleDeclarationForSelector('.block__title', document.styleSheets);
        expect(styleDeclaration).toEqual(expect.objectContaining({
            'font-size': '2rem',
            'padding': '0.5rem',
            'margin': '0',
            'color': '#FFFFFF',
            'border-radius': '5px 5px 0 0',
        }));
    });

    it('green title element should have proper styling', async() => {
        await waitBrowserLoadEvent(document);
           
        const styleDeclaration = getStyleDeclarationForSelector('.block__title--green', document.styleSheets);
        expect(styleDeclaration).toEqual(expect.objectContaining({
            'background': 'green'
        }));
    });

    it('blue title element should have proper styling', async() => {
        await waitBrowserLoadEvent(document);
           
        const styleDeclaration = getStyleDeclarationForSelector('.block__title--blue', document.styleSheets);
        expect(styleDeclaration).toEqual(expect.objectContaining({
            'background': 'blue'
        }));
    });

    it('orange title element should have proper styling', async() => {
        await waitBrowserLoadEvent(document);
           
        const styleDeclaration = getStyleDeclarationForSelector('.block__title--orange', document.styleSheets);
        expect(styleDeclaration).toEqual(expect.objectContaining({
            'background': 'orangered'
        }));
    });

    it('description element should have proper styling', async() => {
        await waitBrowserLoadEvent(document);
           
        const styleDeclaration = getStyleDeclarationForSelector('.block__description', document.styleSheets);
        expect(styleDeclaration).toEqual(expect.objectContaining({
            'padding': '0.5rem'
        }));
    });

    it('notes element should have proper styling', async() => {
        await waitBrowserLoadEvent(document);
           
        const styleDeclaration = getStyleDeclarationForSelector('.block__notes', document.styleSheets);
        expect(styleDeclaration).toEqual(expect.objectContaining({
            'padding': '0.5rem',
            'background': '#EFEFEF',
            'font-style': 'italic'
        }));
    });
});
