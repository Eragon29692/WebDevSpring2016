/**
 * Created by duyvu on 4/1/2016.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{
            label: String,
            value: String
        }]
    }, {collection: 'field'});
    return FieldSchema;
};