import mongoose from 'mongoose';
const documentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    content: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharedWith: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        canEdit: Boolean
    }],

    isPublic: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



const Document = mongoose.model('Document', documentSchema);
export default Document;