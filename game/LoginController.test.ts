import puppeteer,{Page} from 'puppeteer'
import './app'; //<-start real server
describe("E2E Login",()=>{
    let page:Page;
    //beforeAll(async()=>{});

    test("Test Login End-to-End",async()=>{
        //const browser = await puppeteer.launch();
        const browser = await puppeteer.launch();
        page = await browser.newPage();

        async function getResponseBody(resolve: any, reject: any){
            await page.evaluate(()=>{
                const username = document.querySelector("[name=username]");
                const password = document.querySelector("[name=password]");
                if(username && password){
                    (username as HTMLInputElement).value="admin";
                    (password as HTMLInputElement).value="123456";
                }
                const submit = document.querySelector("[type=submit]");
                if (submit){
                    (submit as HTMLInputElement).click();
                }
            });
            await page.waitForNavigation();
            return await page.evaluate(()=>document.querySelector("#Message"));
        }

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9'
        });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');

        const waitForResponse = new Promise(getResponseBody);
    await page.goto("http://localhost:8080/", { waitUntil: 'networkidle0' });
    const data = await waitForResponse;

        expect(data).toBeDefined();
    });
});