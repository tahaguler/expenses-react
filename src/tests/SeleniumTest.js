
const selenium = require("selenium-webdriver");
const assert = require("assert");

var buildDriver = function () {
    return new selenium.Builder().forBrowser('chrome').build();
};
const randStringGenerator = () => {
    let anysize = 5;
    var charset = "abcdefghijklmnopqrstuvwxyz";
    result = "";
    for (var i = 0; i < anysize; i++)
        result += charset[Math.floor(Math.random() * charset.length)];
    return result;
}

describe("App opens, navigates two pages submit a form", () => {
    var driver = buildDriver();
    let formInput = randStringGenerator();
   

    it("button should be named expenses, click it", async () => {
        await driver.get('http://localhost:3000/');
        const element = await driver.findElement(selenium.By.className("button-Expenses"));
        let text = await element.getText();
        assert.equal(text, "EXPENSES");
        await element.click();
    });

    it("button should be named categories, click it", async () => {
        const element = await driver.findElement(selenium.By.className("button-Categories"));
        let text = await element.getText();
        assert.equal(text, "CATEGORIES");
        await element.click();
    });

    it("should fill out the form", async () => {
        const formBudget = driver.findElement(selenium.By.id("categories-form-budget"));
        const formName = driver.findElement(selenium.By.id("categories-form-name"));
        await formBudget.sendKeys("100");
        await formName.sendKeys(formInput);

        assert.equal(await formBudget.getAttribute("value"), "100");
        assert.equal(await formName.getAttribute("value"), formInput);
    });

    it("Should submit and confirm it is added", async () => {
        const formSubmitButton = driver.findElement(selenium.By.id("category-add-button"));
        await formSubmitButton.click();

        const element = driver.findElement(selenium.By.id(formInput));
        let output = await element.getText();
        console.log(output);

        assert.equal(output, formInput);
        driver.quit();
    });
});