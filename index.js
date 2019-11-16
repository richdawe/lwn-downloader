const puppeteer = require('puppeteer');

// TODO: how to load JSON configs?
const config = require('./config.json');

(async () => {
    //const headless = false; // Set to false for testing purposes.
    const headless = true;
    const browser = await puppeteer.launch({
        headless: headless,
        slowMo: 0 //100 // slow down by 100ms
    });
    const page = await browser.newPage();
    await page.goto('https://lwn.net');

    // Log in.
    let username = await page.type('input[name=\'Username\']', config.username);
    let password = await page.type('input[name=\'Password\']', config.password);
    await page.click('input[name=\'submit\']');

    // Go to all-one-page for the Weekly Edition.
    await page.goto('https://lwn.net/current/bigpage');

    // Hide menu.
    // TODO: Remove margins.
    let bodyHandle = await page.$('body');
    let menuHandle = await page.$('body > div#menu');
    // https://stackoverflow.com/questions/50015925/how-to-set-values-of-dom-elements-with-puppeteer
    await page.evaluate(
        (body, menu) => {
            body.removeChild(menu);
            //menu.setAttribute('hidden', 'true');
        },
        bodyHandle, menuHandle);

    // Generate PDF
    // puppeteer only supports PDF generation in headless mode.
    // TODO: Tags
    // TODO: Links are preserved?
    // TODO: Date in filename
    // TODO: Upload to S3 bucket
    // TODO: Run as Lambda
    if (headless) {
        const pdffile = 'lwn.pdf';
        // TODO: tweak
        await page.pdf({
            path: pdffile,
            format: 'A4',
            margin: {
            top: '1cm',
            bottom: '1.5cm',
            left: '1.5cm',
            right: '1cm'
            },
            // https://www.api2pdf.com/print-header-footer-page-numbers-on-pdf-with-headless-chrome/
            displayHeaderFooter: true,
            headerTemplate: '<div class="page-header"></div>',
            footerTemplate: '<div class="page-footer" style="width:100%; text-align:center; font-size:10px;"><span class="pageNumber"></span> of <span class="totalPages"></span></div>'
        });
        console.log(`PDF written to ${pdffile}`);
    }

    await browser.close();
})();