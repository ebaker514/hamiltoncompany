var customCommands = {
    search: function (data) {
        this
            .click('@searchButton')
            .setValue('@searchInput', data.search)
            .click('@searchButton')
            .waitForElementVisible('@searchResults', 15000)
            .verify.containsText('@searchResults', data.result)
        return this
    },
    clickDropdown: function (data) {
        this
        var that = this
            .waitForElementVisible(data.category, function (result) {
                console.log('Category: ' + data.category + ' Link: ' + data.link)
                that
                    .moveToElement(data.category, 1, 1)
                    .waitForElementVisible(data.link)
                    .click(data.link)
                    //This pause is necessary for the next page to load, otherwise it looks at the current page's url
                    .pause(200)
                    .verify.urlEquals(data.url)
            })
        return this
    },
    confirmLink: function (data) {
        this
        var that = this
            .waitForElementVisible(data.selector, function (result) {
                console.log('Link: ' + data.selector)
                that
                    .click(data.selector)
                    //This pause is necessary for the next page to load, otherwise it looks at the current page's url
                    .pause(250)
                    .verify.urlEquals(data.url)
            })
        return this
    },
    checkLoginRegister: function () {
        this
            .click('@loginButton')
            .pause(150)
            .verify.urlEquals('https://www.hamiltoncompany.com/login')
            .verify.containsText('@loginRegisterHeader', 'Log In')
            .verify.containsText('@loginRegisterBody', 'Email')
            .verify.containsText('@loginRegisterBody', 'Password')
            .verify.containsText('@loginRegisterButton', 'LOGIN')
        this.expect.element('@loginRegisterBody').not.contain.text('First Name')
        this.expect.element('@loginRegisterBody').not.contain.text('Last Name')
        this.expect.element('@loginRegisterButton').not.contain.text('REGISTER')
        this
            .setValue('@emailInput', 'asdf@asdf')
            .setValue('@passwordInput', 'asdf')
            .click('@loginRegisterButton')
            .waitForElementPresent('@loginError')
        this
            .click('@registerButton')
            .pause(150)
            .verify.urlEquals('https://www.hamiltoncompany.com/register')
            .verify.containsText('@loginRegisterHeader', 'Register')
            .verify.containsText('@loginRegisterBody', 'Email')
            .verify.containsText('@loginRegisterBody', 'Password')
            .verify.containsText('@loginRegisterBody', 'First Name')
            .verify.containsText('@loginRegisterBody', 'Last Name')
            .verify.containsText('@loginRegisterButton', 'REGISTER')
            .expect.element('@loginRegisterButton').not.contain.text('LOGIN')
        return this
    },
    //For whatever reason this test does not work. It looks like the page never fully loads, so Selenium loses connection. Social media links can still be tested manually.
    checkSocial: function (data) {
        this
        .click('@socialButton')
        var that = this
        data.forEach(option => {
            this
            .waitForElementPresent(option.link, function (result) {
                console.log('Link: ' + option.link + ' URL: ' + option.url)
                that
                    .click(option.link)
                    .verify.urlEquals(option.url)
                    .click('@homeButton')
            }) 
        })
        return this
    },
    checkContact: function (data) {
        this
        var that = this
        .waitForElementPresent('@regionButton', function() {
            console.log(data)
        })
        this
        .click('@regionButton')
        .waitForElementVisible('@country')
        .setValue('@country', data.country)
        if(data.region !== "NA"){
            this
            .useXpath()
            .click(data.region)
            .useCss()
        }
        this
        .click('@regionUpdate')
        .verify.containsText('@phoneNumber', data.code)
        return this
    },
    walkaround: function () {

    }
}

module.exports = {
    url: 'https://www.hamiltoncompany.com/',
    commands: [customCommands],
    elements: {
        cookieButton: '#hs-eu-confirmation-button',
        homeButton: 'a[href="/"]',
        //CONTACT SELECTORS/////////////////////////////////////////////////////////////////////////////////////
        contactButton: {
            selector: '//a/span[contains(text(),"Contact")]',
            locateStrategy: 'xpath'
        },
        contactALH: {
            selector: '//div/h3[contains(text(),"Automated Liquid Handling")]',
            locateStrategy: 'xpath'
        },
        contactSales: {
            selector: '//div/h3[contains(text(),"Hamilton Sales")]',
            locateStrategy: 'xpath'
        },
        regionButton: {
            selector: '//h2/button',
            locateStrategy: 'xpath'
        },
        country: {
            selector: '//select[@name="country"]',
            locateStrategy: 'xpath'
        },
        regionUpdate: {
            selector: '//button[@type="submit"]',
            locateStrategy: 'xpath'
        },
        phoneNumber: {
            selector: '//tr[2]/td/a',
            locateStrategy: 'xpath'
        },
        //LOGIN AND REGISTRATION SELECTORS//////////////////////////////////////////////////////////////////////
        loginButton: '[href="https://www.hamiltoncompany.com/login"]',
        registerButton: '[href="/register"]',
        loginRegisterHeader: '.page-header__heading',
        loginRegisterBody: 'div[class="container -small pb--medium"]',
        loginRegisterButton: 'button[class="button"]',
        loginError: 'div[class="notice -flash -error"]',
        emailInput: 'input[type="email"]',
        passwordInput: 'input[type="password"]',
        //SEARCH SELECTORS/////////////////////////////////////////////////////////////////////////////////////
        searchButton: '[href="/search"]',
        searchInput: 'input',
        searchResults: {
            selector: '(//div[@id="tab-products"])[1]',
            locateStrategy: 'xpath'
        },
        //AUTOMATION DROPDOWN LINKS/////////////////////////////////////////////////////////////////////////////
        automationDropdown: {
            selector: '//span[contains(text(),"Automation")]',
            locateStrategy: 'xpath'
        },
        autoLiquidHandling: {
            selector: '(//li/a[contains(text(),"Liquid Handling")])[1]',
            locateStrategy: 'xpath'
        },
        autoLHApplications: {
            selector: '//li[1]/ul/li[1]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        autoLHPlatforms: {
            selector: '//*[@href="/automated-liquid-handling/platforms"]',
            locateStrategy: 'xpath'
        },
        autoLHAssays: {
            selector: '//a[contains(text(),"Assay Ready Workstations")]',
            locateStrategy: 'xpath'
        },
        autoLHSmallDevices: {
            selector: '//a[contains(text(),"Small Devices")]',
            locateStrategy: 'xpath'
        },
        autoLHConsumables: {
            selector: '//li[1]/ul/li[1]/ul/li[5]/a',
            locateStrategy: 'xpath'
        },
        autoSampleManagement: {
            selector: '(//li/a[contains(text(),"Sample Management")])[1]',
            locateStrategy: 'xpath'
        },
        autoSMPlatforms: {
            selector: '//li[1]/ul/li[2]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        autoSMBenchtops: {
            selector: '//li[1]/ul/li[2]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        autoSMConsumables: {
            selector: '//li[1]/ul/li[2]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        autoSMApplications: {
            selector: '//li[1]/ul/li[2]/ul/li[4]/a',
            locateStrategy: 'xpath'
        },
        autoAll: {
            selector: '//div[2]/nav/ul/li[1]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        //LABORATORY DROPDOWN LINKS//////////////////////////////////////////////////////////////////////////////
        laboratoryDropdown: {
            selector: '//span[contains(text(),"Laboratory")]',
            locateStrategy: 'xpath'
        },
        labProducts: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        labProdSyringes: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        labProdNeedles: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        labProdColumns: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        labProdDispensers: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/ul/li[4]/a',
            locateStrategy: 'xpath'
        },
        labProdPipettes: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/ul/li[5]/a',
            locateStrategy: 'xpath'
        },
        labProdPH: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/ul/li[6]/a',
            locateStrategy: 'xpath'
        },
        labProdValves: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/ul/li[7]/a',
            locateStrategy: 'xpath'
        },
        labProdSepta: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[1]/ul/li[8]/a',
            locateStrategy: 'xpath'
        },
        labHighlights: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        labHighSyringe: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[2]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        labHighNeedle: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[2]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        labHighHPLC: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[2]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        labHighSales: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[2]/ul/li[4]/a',
            locateStrategy: 'xpath'
        },
        labHighKnowledge: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[2]/ul/li[5]/a',
            locateStrategy: 'xpath'
        },
        labAll: {
            selector: '/html/body/header/div[2]/nav/ul/li[2]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        //PROCESS DROPDOWN LINKS////////////////////////////////////////////////////////////////////////////////
        processDropdown: {
            selector: '//span[contains(text(),"Process")]',
            locateStrategy: 'xpath'
        },
        processProducts: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        processProdpH: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[1]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        processProdDisOxygen: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[1]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        processProdConduct: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[1]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        processProdCellDens: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[1]/ul/li[4]/a',
            locateStrategy: 'xpath'
        },
        processProdAccessories: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[1]/ul/li[5]/a',
            locateStrategy: 'xpath'
        },
        processHighlights: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        processHighArc: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[2]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        processHighPortDisOx: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[2]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        processHighBrowse: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[2]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        processHighKnowledge: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[2]/ul/li[4]/a',
            locateStrategy: 'xpath'
        },
        processHighQuality: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[2]/ul/li[5]/a',
            locateStrategy: 'xpath'
        },
        processAll: {
            selector: '/html/body/header/div[2]/nav/ul/li[3]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        //OEM DROPDOWN LINKS/////////////////////////////////////////////////////////////////////////////////////
        oemDropdown: {
            selector: '//span[contains(text(),"OEM")]',
            locateStrategy: 'xpath'
        },
        oemSystems: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        oemSysGetStarted: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[1]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        oemSysProcess: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[1]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        oemComponents: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        oemCompPipette: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[2]/ul/li[1]/a',
            locateStrategy: 'xpath'
        },
        oemCompPumps: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[2]/ul/li[2]/a',
            locateStrategy: 'xpath'
        },
        oemCompValve: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[2]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        oemCompInstSyr: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[2]/ul/li[4]/a',
            locateStrategy: 'xpath'
        },
        oemCompSensors: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[2]/ul/li[5]/a',
            locateStrategy: 'xpath'
        },
        oemAll: {
            selector: '/html/body/header/div[2]/nav/ul/li[4]/ul/li[3]/a',
            locateStrategy: 'xpath'
        },
        //SOCIAL MEDIA LINKS/////////////////////////////////////////////////////////////////////////////////////
        socialButton: 'a[href="/follow-hamilton"]',
        alhFacebook: '.fab.fa-facebook-square',
        alhtwitter: {
            selector: '(//i[@class="fab fa-twitter"])[1]',
            locateStrategy: 'xpath'
        },
        alhlinkedin: {
            selector: '(//i[@class="fab fa-linkedin-in"])[1]',
            locateStrategy: 'xpath'
        },
        alhyoutube: {
            selector: '(//i[@class="fab fa-youtube"])[1]',
            locateStrategy: 'xpath'
        },
        asmtwitter: {
            selector: '(//i[@class="fab fa-twitter"])[2]',
            locateStrategy: 'xpath'
        },
        asmlinkedin: {
            selector: '(//i[@class="fab fa-linkedin-in"])[2]',
            locateStrategy: 'xpath'
        },
        asmyoutube: {
            selector: '(//i[@class="fab fa-youtube"])[2]',
            locateStrategy: 'xpath'
        },
        lablinkedin: {
            selector: '(//i[@class="fab fa-linkedin-in"])[3]',
            locateStrategy: 'xpath'
        },
        labyoutube: {
            selector: '(//i[@class="fab fa-youtube"])[3]',
            locateStrategy: 'xpath'
        },
        proclinkedin: {
            selector: '(//i[@class="fab fa-linkedin-in"])[4]',
            locateStrategy: 'xpath'
        },
        procyoutube: {
            selector: '(//i[@class="fab fa-youtube"])[4]',
            locateStrategy: 'xpath'
        },
        oemlinkedin: {
            selector: '(//i[@class="fab fa-linkedin-in"])[5]',
            locateStrategy: 'xpath'
        },
        oemyoutube: {
            selector: '(//i[@class="fab fa-youtube"])[5]',
            locateStrategy: 'xpath'
        },
        //LINKS AT BOTTOM OF PAGE//////////////////////////////////////////////////////////////////////////////
        companyOverview: {
            selector: '//a[contains(text(),"Overview")]',
            locateStrategy: 'xpath'
        },
        companyCareers: {
            selector: '//a[contains(text(),"Careers")]',
            locateStrategy: 'xpath'
        },
        companyNews: {
            selector: '//a[contains(text(),"News")]',
            locateStrategy: 'xpath'
        },
        companyPress: {
            selector: '//a[contains(text(),"Press Releases")]',
            locateStrategy: 'xpath'
        },
        companyEvents: {
            selector: '//a[contains(text(),"Events")]',
            locateStrategy: 'xpath'
        },
        companyCertifications: {
            selector: '//a[contains(text(),"Certifications")]',
            locateStrategy: 'xpath'
        },
        supportALH: {
            selector: '//a[contains(text(),"Automated Liquid Handling")]',
            locateStrategy: 'xpath'
        },
        supportASM: {
            selector: '//a[contains(text(),"Automated Sample Management")]',
            locateStrategy: 'xpath'
        },
        supportLaboratory: {
            selector: '(//a[contains(text(),"Laboratory")])[3]',
            locateStrategy: 'xpath'
        },
        supportProcessAnalytics: {
            selector: '//a[contains(text(),"Process Analytics")]',
            locateStrategy: 'xpath'
        },
        supportOEM: {
            selector: '(//a[contains(text(),"OEM")])[4]',
            locateStrategy: 'xpath'
        },
        legalPrivacy: {
            selector: '//a[contains(text(),"Privacy Policy")]',
            locateStrategy: 'xpath'
        },
        legalConditions: {
            selector: '//a[contains(text(),"Terms & Conditions")]',
            locateStrategy: 'xpath'
        },
        legalUse: {
            selector: '//a[contains(text(),"Terms of Use")]',
            locateStrategy: 'xpath'
        },
        legalTrademarks: {
            selector: '//a[contains(text(),"Trademarks")]',
            locateStrategy: 'xpath'
        },
    }
}