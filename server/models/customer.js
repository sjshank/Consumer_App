const db = require("../config/db"),
	Schema = db.Schema;
    
    const dateRegEx = /(^(((0[1-9]|[12][0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/g
    const emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    const mobileRegEx = /^[0-9]{10}$/
    const alphaRegEx = /^[a-zA-Z]+$/ 
    const zipcodeRegEx = /^[0-9]{5,6}$/

var customerModel = new Schema({
	name : {
        type: String,
        required: true
    },
    mobile : {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return mobileRegEx.test(v);
            },
            message: '{VALUE} is not a valid mobile number!'
        }
    }, 
    phone : {
        type: String,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    dob : {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return dateRegEx.test(v);
            },
            message: '{VALUE} is not a valid date!'
        }
    },
    email : {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return emailRegEx.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
	address : 
         {
            flat : {type: String},
            street : {
                type: String,
                required: true
            },
            city : {
                type: String,
                required: true,
                validate: {
                    validator: function(v) {
                        return alphaRegEx.test(v);
                    },
                    message: '{VALUE} is not a valid city!'
                }
            },
            state : {
                type: String,
                required: true,
                validate: {
                    validator: function(v) {
                        return alphaRegEx.test(v);
                    },
                    message: '{VALUE} is not a valid state!'
                }
            },
            country : {
                 type: String,
                 default: 'India',
                 validate: {
                    validator: function(v) {
                        return alphaRegEx.test(v);
                    },
                    message: '{VALUE} is not a valid country!'
                }
            },
            zipcode : {
                type: String,
                required: true,
                validate: {
                    validator: function(v) {
                        return zipcodeRegEx.test(v);
                    },
                    message: '{VALUE} is not a valid zipcode!'
                }
            }
        }
});

var customer = db.model('customerModels', customerModel);

module.exports = customer;
