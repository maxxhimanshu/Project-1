const mongoose = require("mongoose");
const authorModel = require("../Model/authorModel");


const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};
const checker = function (data) {
    let rdata = "";
    let missData = "";
    let arr = ["fname", "lname", "title", "email", "password"]
    for (let i = 0; i < arr.length; i++) {
        if (!Object.keys(data).includes(arr[i])) {
            missData = missData + " " + arr[i];
        }
    }
    if (missData) {
        return (missData + " is missing")
    }
    data.fname = data.fname.trim();
    data.lname = data.lname.trim();
    if (data.fname == "") {
        const f2info = "fname is required "
        rdata = rdata + f2info;

    }
    else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.fname)) {
        const specialchar = "fname cannot have special charaters or white spaces "
        rdata = rdata + specialchar;
    }
    else if (/\d/.test(data.fname)) {
        const f2info = "fname cannot have numbers "
        rdata = rdata + f2info;

    };
    if (data.lname == "") {
        const f2info = "lname cannot be empty "
        rdata = rdata + f2info;

    }
    else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.lname)) {
        const specialchar = "lname cannot  have special charaters or white spaces "
        rdata = rdata + specialchar;
    }
    else if (/\d/.test(data.lname)) {
        const f2info = "lname cannot have numbers "
        rdata = rdata + f2info;

    };
    if (data.title == "") {
        const tinfo = "Title is required "
        rdata = rdata + tinfo;
    }

    else if (data.title != "Mr" || data.title != "Mrs" || data.title != "Miss") {
        const tinfo = "Title must be Mr, Mrs or Miss  "
        rdata = rdata + tinfo;

    };

    if (data.email == "") {
        const Einfo = "Email is required "
        rdata = rdata + Einfo;

    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        const emailvalidator = "Email is invalid  "
        rdata = rdata + emailvalidator;
    }
    else if (authorModel.findOne({ email: data.email })) {
        const emailvalidator = "Email must be unique "
        rdata = rdata + emailvalidator;
    };
    if (data.password == "") {
        const pinfo = "Password is required "
        rdata = rdata + pinfo;

    }

    else if (/\s/.test(data.password)) {
        const pass = "password must not have spaces "
        rdata = rdata + pass;
    }

    else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.password)) {
        const pass = "password must have a special character present "
        rdata = rdata + pass;
    };

    return rdata

};





module.exports.isValidObjectId = isValidObjectId;
module.exports.isValidRequestBody = isValidRequestBody;
module.exports.checker = checker;



