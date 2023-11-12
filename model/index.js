const mongoose = require('mongoose')

try {
    mongoose.connect('mongodb+srv://HareesS:Prema300@hareesdev.n7frycv.mongodb.net/BLOG');
} catch (error) {
    console.log(error)
}

module.exports = mongoose