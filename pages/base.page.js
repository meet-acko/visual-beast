const { Helper } = require("../utils/helper");



class BasePage extends Helper{

    constructor(){
        super(__filename);
    }

    mobileNumber() {
        var result = Math.floor(Math.random() * 999999);
        var index = Math.floor(Math.random() * 19 + 1);
        let arr = [6010, 6011, 6012, 6013, 6014, 6015, 6016, 6017, 6018, 6019, 6020, 6021, 6022, 6023, 6024, 6025, 6026, 6027, 6028, 6029];
        return "" + (arr[index] * 1000000 + result);
    }

    randomName(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    registrationNumber() {
        var city = "";
        var citycode = "";
        var statenum = "";
        var state = "";
        let statecode = ["AP", "AR", "BR", "CG", "CH", "AN", "DL", "DN", "DD", "GA", "GJ", "HP", "HR", "JH", "JK", "KA", "KL", "MH", "ML", "MN", "MP", "MZ", "NL", "OD", "OR", "PB", "PY", "RJ", "SK", "TN", "TS", "TR", "UP", "UK", "WB"];
        var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var num = "1234567890";
        var numLength = num.length;
        var charLength = char.length;
        for (let i = 0; i < 2; i++) {
            city += char.charAt(Math.floor(Math.random() * charLength));
        }
        for (let i = 0; i < 4; i++) {
            citycode += num.charAt(Math.floor(Math.random() * numLength));
        }
        state = Math.floor(Math.random() * statecode.length);
        for (let i = 0; i < 2; i++) {
            statenum += num.charAt(Math.floor(Math.random() * numLength));
        }
        return statecode[state] + statenum + city + citycode;
      }

}

module.exports = BasePage;