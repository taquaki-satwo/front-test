import puppeteer from 'puppeteer';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();
const CONFING = process.env;

(async () => {
	const PARAMS = {
		user: {
			id: CONFING.USER_ID,
			pass: CONFING.USER_PASS
		}
	};

	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 50
	});
	const page = await browser.newPage();
	await page.setViewport({
		width: 1200,
		height: 800
	});
	await page.setExtraHTTPHeaders({
		Authorization: `Basic ${Buffer.from(`${CONFING.BASIC_AUTH_USER_NAME}:${CONFING.BASIC_AUTH_PSSSWORD}`).toString(
			'base64'
		)}`
	});
	await page.goto(`${CONFING.TARGET_URL}`);
	await page.waitForSelector('#tabMEN');
	await page.click('#tabMEN');	
	await page.screenshot({ path: `./screenshot/${moment().format('YYYYMMDDHHmmssSSS')}.png`, fullPage: true });

	await browser.close();
})();

process.on('unhandledRejection', console.dir);
