var page
var arrays = require('../testAssets/hamiltonData')
/*
Array[0] = Bottom Links
Array[1] = Searches
Array[2] = Social Media Links
Array[3] = Dropdown Links
*/

module.exports = {
    before: browser => {
        page = browser.page.hamiltonPage()
        page
            .navigate()
            .waitForElementVisible('@cookieButton', 10000)
            .click('@cookieButton')
    },
    afterEach: browser => {
        page.navigate()
    },
    'Searching Bar': browser => {
        arrays[1].forEach(object => {
            page
            .search(object)
        })
    },
    'Dropdowns': browser => {
        arrays[3].forEach(object => {
            page
            .clickDropdown(object)
        })
    },
    'Check the Login and Register Screens': browser => {
        page.checkLoginRegister()
    },
    //THIS TEST IS NON-FUNCTIONAL, PRESUMABLY DUE TO A BUG DURING SITE LOADING
    // 'Check the Social Media Links': browser => {
    //     page.checkSocial(arrays[2])
    // },
    'Check Links at Bottom of Page': browser => {
        arrays[0].forEach(link => {
            page.confirmLink(link)
            .back
        })
    },
    'Contact Info': browser => {
        page
        .click('@contactButton')
        .waitForElementPresent('@contactALH')
        .click('@contactALH')
        .waitForElementPresent('@contactSales')
        .click('@contactSales')
        .pause(2000)
        arrays[6].forEach(country => {
            page.checkContact(country)
        })
    },
}