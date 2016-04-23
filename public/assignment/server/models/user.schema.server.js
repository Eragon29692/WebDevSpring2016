/**
 * Created by duyvu on 4/1/2016.
 */
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        email: { type: [String], default: [] },
        phones: { type: [String], default: [] },
        roles: { type: String, default: "user" }
    }, {collection: 'user'});
    return UserSchema;
};