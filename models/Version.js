import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema({
    document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
    content: String,
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Version = mongoose.model('Version', versionSchema);
export default Version;
