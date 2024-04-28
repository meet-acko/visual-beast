class Context {
    static _currentTestName = "";

    static get currentTestName(){
        return this._currentTestName;
    }

    static set currentTestName(value){
        this._currentTestName = value;
    }

}

module.exports = Context;