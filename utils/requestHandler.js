const { URL } = require('url');
const axios = require('axios').default;
const fs = require("fs");
const FormData = require('form-data');
const path = require('path');

class Request{

    constructor(url){
        axios.defaults.withCredentials = true;
        this.requestObject = {
            "url" : undefined,
            "method" : undefined,
            "config" : {
                'maxContentLength': Infinity,
                'maxBodyLength': Infinity,
                'withCredentials': true
            },
            "get" : {},
            "expect" : {}
        };
        if(url === undefined || url === "")
            throw Error("url can not be empty");
        else
            this.requestObject["url"] = new URL(url);
    }

    setPathname(pathname){
        if(pathname)
            this.requestObject.url.pathname = pathname;
        return this;
    }

    setParams(params){
        if(params)
            this.requestObject.url.search = params;
        return this;
    }

    setData(data){
        if(data){
            this.requestObject["data"] = data;
            this.requestObject.config["data"] = data;
        }
        return this;
    }

    setHeader(headerName, headerValue){
        if("headers" in this.requestObject.config){
            this.requestObject.config.headers[headerName] = headerValue;
        }else{
            this.requestObject.config["headers"] = {};
            this.requestObject.config.headers[headerName] = headerValue;
        }
        return this;
    }

    setBasicAuth(username, password){
        if("auth" in this.requestObject.config){
            this.requestObject.config.auth["username"] = username;
            this.requestObject.config.auth["password"] = password;
        }else{
            this.requestObject.config["auth"] = {};
            this.requestObject.config.auth["username"] = username;
            this.requestObject.config.auth["password"] = password;
        }
        return this;
    }

    setHeaders(headersJSON){
        if("headers" in this.requestObject.config){
            this.requestObject.config["headers"] = Object.assign(this.requestObject.config.headers, headersJSON);
        }else{
            this.requestObject.config["headers"] = headersJSON;
        }
        return this;
    }

    getStatus(){
        this.requestObject.get["getStatus"] = true;
        return this;
    }

    expectStatus(expectedStatus){
        this.requestObject.expect["expectStatus"] = expectedStatus;
        return this;
    }

    getResponse(){
        this.requestObject.get["getResponse"] = true;
        return this;
    }

    getResult(){
        this.requestObject.get["getResult"] = true;
        return this;
    }

    get(){
        if(this.requestObject.method === undefined){
            this.requestObject.method = "get";
            return this;
        }else{
            throw Error("method can be set only once");
        }
    }

    post(data){
        if(this.requestObject.method === undefined){
            this.requestObject.method = "post";
            if(data){
                this.requestObject["data"] = data;
                this.requestObject.config["data"] = data;
            }
            return this;
        }else{
            throw Error("method can be set only once");
        }
    }
    async sleep(second) {
        return new Promise((resolve) => setTimeout(resolve, parseInt(second*1000)));
    }
    async end(){
        if("headers" in this.requestObject.config){
            if("Content-Type" in this.requestObject.config.headers){
                if(this.requestObject.config.headers["Content-Type"] == "multipart/form-data"){
                    let bodyFormData = new FormData();
                    let dataKeyArr = Object.keys(this.requestObject.data);
                    let fileStream;
                    for(let i=0;i<dataKeyArr.length;i++){
                        if((dataKeyArr[i]).includes("file")){
                            fileStream = await new Promise(async (resolve, reject)=>{
                                await fs.readFile(this.requestObject.data[dataKeyArr[i]], {},(err, data)=>{
                                    if(err){
                                        reject(err);
                                    }
                                    resolve(data);
                                });
                            })
                            await bodyFormData.append(dataKeyArr[i], await fileStream, {filename : path.basename(dataKeyArr[i])})
                        }else{
                            bodyFormData.append(dataKeyArr[i], this.requestObject.data[dataKeyArr[i]])
                        }
                    }
                    this.requestObject.config["data"] = await bodyFormData;
                }
            }
        }
        switch(this.requestObject.method){
            case "get" : {
                this.response = new Promise(async (resolve, reject)=>{
                    let res = await axios.get(this.requestObject.url.href, this.requestObject.config).catch(e=>{
                        if("status" in e.response)
                            resolve(e.response);
                        else
                            reject(e.response);
                    }).catch(e=>{
                        throw e;
                    })
                    await resolve(await res);
                });
                break;
            }
            case "post" : {
                this.response = new Promise(async (resolve, reject)=>{
                    let res = await axios.post(this.requestObject.url.href, this.requestObject.config["data"], this.requestObject.config).catch(e=>{
                        if("status" in e)
                            resolve(e.response);
                        else
                            reject(e);
                    }).catch(e=>{
                        throw e;
                    })
                    await resolve(await res);
                });
                break;
            }
            case undefined : {
                throw Error("request type is undefined");
            }

        }
        let result = await this.response;
        if("expectStatus" in this.requestObject.expect)
            await expect(this.requestObject.expect.expectStatus).toEqual((await result).status);
        if("getStatus" in this.requestObject.get)
            return (await result).status
        if("getResponse" in this.requestObject.get)
            return (await result).data
        if("getResult" in this.requestObject.get)
            return (await result)
    }
}

module.exports = function(url){
    return new Request(url);
}