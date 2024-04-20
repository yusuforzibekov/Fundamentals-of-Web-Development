const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { checkIfFileExist } = require('../test-utils/checkIfFileExist');
const { normalizeStringForTest } = require ('../test-utils/normalizeStringForTest');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');
const { render } = require('../test-utils/render');

const { JSDOM } = require('jsdom');

describe('CSS Preprocessors', () => {
    let htmlString;

    let dom;
    let document;

    beforeEach(async () => {
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);

        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;

        const linksCSS = document.querySelectorAll('link[rel="stylesheet"]');
        for (let linkCSS of linksCSS) {
            const initialHref = linkCSS.getAttribute('href');
            const linkAbsolutePath = path.join(__dirname, initialHref);
            linkCSS.setAttribute('href', `file:///${linkAbsolutePath}`);
        }
    });

    it('html page should be valid', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });

    describe('Sass to CSS convertion', () => {
        it('should replace style.css with style.scss', async () => {
            const isCSSFileExist = await checkIfFileExist('src/style.css');
            const isSassFileCreated = await checkIfFileExist('src/style.scss');
            expect(isSassFileCreated).toBe(true);
            expect(isCSSFileExist).toBe(false);
        });

        it('should create css files', async () => {
            const isFileCreated = await checkIfFileExist('src/css/style.css');
            expect(isFileCreated).toBe(true);
        });
    });

    describe('Variables creation', () => {
        it('should replace _variables.css with _variables.scss', async () => {
            const isCSSFileExist = await checkIfFileExist('src/_variables.css');
            const isSassFileCreated = await checkIfFileExist('src/_variables.scss');
            expect(isCSSFileExist).toBe(false);
            expect(isSassFileCreated).toBe(true);
        });

        it('should refactor CSS variables to use Sass approach', async() => {
            const variablesFile = await readTextFile('src/_variables.scss');
            const normalizedFile = normalizeStringForTest(variablesFile);
            expect(normalizedFile.includes('$blue-color: rgba(0, 0, 255, 0.632);')).toBe(true);
            expect(normalizedFile.includes('$green-color: rgb(3, 69, 3);')).toBe(true);
            expect(normalizedFile.includes('$orange-color: rgb(255, 165, 0);')).toBe(true);
            expect(normalizedFile.includes('$white-color: #ffffff;')).toBe(true);
            expect(normalizedFile.includes('$grey-color: #cccccc;')).toBe(true);
            expect(normalizedFile.includes('$light-grey-color: rgba(238, 238, 238, 0.933);')).toBe(true);
            expect(normalizedFile.includes('$elem-padding: 0.5rem;')).toBe(true);
            expect(normalizedFile.includes('$block-margin: 20px;')).toBe(true);
            expect(normalizedFile.includes('$small: 200px;')).toBe(true);
            expect(normalizedFile.includes('$medium: 400px;')).toBe(true);
            expect(normalizedFile.includes('$large: 600px;')).toBe(true);
            expect(normalizedFile.includes('--blue-color')).toBe(false);
            expect(normalizedFile.includes('--green-color')).toBe(false);
            expect(normalizedFile.includes('--orange-color')).toBe(false);
            expect(normalizedFile.includes('--light-grey-color')).toBe(false);
            expect(normalizedFile.includes('--white-color')).toBe(false);
            expect(normalizedFile.includes('--elem-padding')).toBe(false);
            expect(normalizedFile.includes('--block-margin')).toBe(false);
            expect(normalizedFile.includes('--small')).toBe(false);
            expect(normalizedFile.includes('--medium')).toBe(false);
            expect(normalizedFile.includes('--large')).toBe(false);
            expect(normalizedFile.includes(':root')).toBe(false);
        });

        it('should use Sass variables in style.scss', async() => {
            const styleFile = await readTextFile('src/style.scss');
            const normalizedFile = normalizeStringForTest(styleFile);

            expect(normalizedFile.includes('$small')).toBe(true);
            expect(normalizedFile.includes('$medium')).toBe(true);
            expect(normalizedFile.includes('$large')).toBe(true);
            expect(normalizedFile.includes('$blue-color')).toBe(true);
            expect(normalizedFile.includes('$green-color')).toBe(true);
            expect(normalizedFile.includes('$orange-color')).toBe(true);
            expect(normalizedFile.includes('$grey-color')).toBe(true);
            expect(normalizedFile.includes('$elem-padding')).toBe(true);
            expect(normalizedFile.includes('$block-margin')).toBe(true);
            expect(normalizedFile.includes('$white-color')).toBe(false);
            expect(normalizedFile.includes('--blue-color')).toBe(false);
            expect(normalizedFile.includes('--green-color')).toBe(false);
            expect(normalizedFile.includes('--orange-color')).toBe(false);
            expect(normalizedFile.includes('--white-color')).toBe(false);
            expect(normalizedFile.includes('--elem-padding')).toBe(false);
            expect(normalizedFile.includes('--block-margin')).toBe(false);
        });

        it('should be converted in CSS properly', async () => {
            await waitBrowserLoadEvent(document);
            const smallBlockStyleDeclaration = getStyleDeclarationForSelector('.block--small', document.styleSheets);
            const mediumBlockStyleDeclaration = getStyleDeclarationForSelector('.block--medium', document.styleSheets);
            const largeBlockStyleDeclaration = getStyleDeclarationForSelector('.block--large', document.styleSheets);
            const titleGreenStyleDeclaration = getStyleDeclarationForSelector('.block__title--green', document.styleSheets);
            const titleBlueStyleDeclaration = getStyleDeclarationForSelector('.block__title--blue', document.styleSheets);
            const titleOrangeStyleDeclaration = getStyleDeclarationForSelector('.block__title--orange', document.styleSheets);
            const descriptionStyleDeclaration = getStyleDeclarationForSelector('.block__description', document.styleSheets);
            const notesStyleDeclaration = getStyleDeclarationForSelector('.block__notes', document.styleSheets);
            
            expect(smallBlockStyleDeclaration["width"]).toBe('200px');
            expect(mediumBlockStyleDeclaration["width"]).toBe('400px');
            expect(largeBlockStyleDeclaration["width"]).toBe('600px');
            expect(titleGreenStyleDeclaration["background"]).toBe('#034503');
            expect(titleBlueStyleDeclaration["background"]).toBe('rgba(0, 0, 255, 0.632)');
            expect(titleOrangeStyleDeclaration["background"]).toBe('orange');
            expect(descriptionStyleDeclaration["padding"]).toBe('0.5rem');
            expect(notesStyleDeclaration["padding"]).toBe('0.5rem');
            expect(notesStyleDeclaration["background"]).toBe('#CCCCCC');
        });
    });

    describe('Mixins', () => {
        it('should create flexible-box mixin with proper rules', () => {
            const data = `
                @import "src/_mixins.scss";

                .foo {
                    @include flexible-box(row, justify, center);
                }
            `

            return render({ data }).then(output => {
                expect(output.css.toString().trim())
                  .toBe(".foo { display: flex; flex-direction: row; justify-content: justify; align-items: center; }")
            });
        });

        it('should use mixin in style.scss properly', async () => {
            const styleFile = await readTextFile('src/style.scss');
            const placeholderFile = await readTextFile('src/_placeholders.scss');
            const isMixinsUsedForMain = styleFile.includes('@include flexible-box(row, space-between, flex-start);') 
                || styleFile.includes('@include mixins.flexible-box(row, space-between, flex-start);')
            const isMixinsUsedForBlock = placeholderFile.includes('@include flexible-box(column, space-between, center);') 
                || placeholderFile.includes('@include mixins.flexible-box(column, space-between, center);');
            
            expect(isMixinsUsedForMain).toBe(true);
            expect(isMixinsUsedForBlock).toBe(true);
        });

        it('should be converted to CSS properly', async () => {
            await waitBrowserLoadEvent(document);
            const mainStyleDeclaration = getStyleDeclarationForSelector('main', document.styleSheets);
            const blockStyleDeclaration = getStyleDeclarationForSelector('.block--small, .block--medium, .block--large', document.styleSheets);

            expect(mainStyleDeclaration["display"]).toBe("flex");
            expect(mainStyleDeclaration["flex-direction"]).toBe("row");
            expect(mainStyleDeclaration["justify-content"]).toBe("space-between");
            expect(mainStyleDeclaration["align-items"]).toBe("flex-start");
            expect(blockStyleDeclaration["display"]).toBe("flex");
            expect(blockStyleDeclaration["flex-direction"]).toBe("column");
            expect(blockStyleDeclaration["justify-content"]).toBe("space-between");
            expect(blockStyleDeclaration["align-items"]).toBe("center");
        });
    });

    describe('Functions', () => {
        it('multiply function should multiply 2 numbers', () => {
            const data = `
                @import "src/_functions.scss";

                .foo {
                    width: multiply(10px, 3);
                }
            `;

            return render({ data }).then(output => {
                expect(output.css.toString().trim()).toBe('.foo { width: 30px; }')
            });
        });

        it('sum function should count sum of 2 numbers', () => {
            const data = `
                @import "src/_functions.scss";

                .foo {
                    width: sum(10px, 3px);
                }
            `;

            return render({ data }).then(output => {
                expect(output.css.toString().trim()).toBe('.foo { width: 13px; }')
            });
        });

        it('sum function should count sum of 4 numbers', () => {
            const data = `
                @import "src/_functions.scss";

                .foo {
                    width: sum(10px, 3px, 2px, 10px);
                }
            `;

            return render({ data }).then(output => {
                expect(output.css.toString().trim()).toBe('.foo { width: 25px; }')
            });
        });

        it('sum function should count sum of 10 numbers', () => {
            const data = `
                @import "src/_functions.scss";

                .foo {
                    width: sum(10px, 3px, 2px, 10px, 1px, 12px, 2px, 8px, 9px, 1px);
                }
            `;

            return render({ data }).then(output => {
                expect(output.css.toString().trim()).toBe('.foo { width: 58px; }');
            });
        });

        it('should use functions in style.scss', async () => {
            const styleFile = await readTextFile('src/style.scss');
            const isFunctionUsedProperly = styleFile.includes('width: sum($small, $medium, $large, multiply(6, $block-margin));') 
                || styleFile.includes('width: functions.sum($small, $medium, $large, functions.multiply(6, $block-margin));');
            
            expect(isFunctionUsedProperly).toBe(true);
        });

        it('should convert function call into valid CSS rule', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('main', document.styleSheets);

            expect(styleDeclaration["width"]).toBe('1320px')
        });
    });

    describe('Nesting selectors', () => {
        it('should remove css selectors', async () => {
            const styleFile = await readTextFile('src/style.scss');

            expect(styleFile.includes('.block--small')).toBe(false);
            expect(styleFile.includes('.block--medium')).toBe(false);
            expect(styleFile.includes('.block--large')).toBe(false);
            expect(styleFile.includes('.block__title--green')).toBe(false);
            expect(styleFile.includes('.block__title--blue')).toBe(false);
            expect(styleFile.includes('.block__title--orange')).toBe(false);
            expect(styleFile.includes('.block__description')).toBe(false);
            expect(styleFile.includes('.block__notes')).toBe(false);
        });

        it('should use nested selectors', async () => {
            const styleFile = await readTextFile('src/style.scss');

            expect(styleFile.includes('.block')).toBe(true);
            expect(styleFile.includes('&--small')).toBe(true);
            expect(styleFile.includes('&--medium')).toBe(true);
            expect(styleFile.includes('&--large')).toBe(true);
            expect(styleFile.includes('&__title')).toBe(true);
            expect(styleFile.includes('&--green')).toBe(true);
            expect(styleFile.includes('&--blue')).toBe(true);
            expect(styleFile.includes('&--orange')).toBe(true);
            expect(styleFile.includes('&__description')).toBe(true);
            expect(styleFile.includes('&__notes')).toBe(true);
        });
    });

    describe('Extend', () => {
        it('should extend %block placeholder selector', async() => {
            const styleFile = await readTextFile('src/style.scss');

            expect(styleFile .includes('@extend %block')).toBe(true);
        });

        it('should extend .block__title', async() => {
            const styleFile = await readTextFile('src/style.scss');

            expect(styleFile .includes('@extend .block__title')).toBe(true);
        });

        it('should apply styles properly', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.block--small, .block--medium, .block--large', document.styleSheets);

            expect(styleDeclaration["margin"]).toBe("20px");
            expect(styleDeclaration["background"].toLowerCase()).toBe("#ffffff");
            expect(styleDeclaration["border-radius"]).toBe("5px");
            expect(styleDeclaration["border"].toLowerCase()).toBe("2px solid #cccccc");
            expect(styleDeclaration["display"]).toBe("flex");
            expect(styleDeclaration["flex-direction"]).toBe("column");
            expect(styleDeclaration["justify-content"]).toBe("space-between");
            expect(styleDeclaration["align-items"]).toBe("center");
        });
    });
});
