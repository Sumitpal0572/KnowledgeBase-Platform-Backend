const Document = require('../models/Document');

exports.createDoc = async (req, res) => {
    try {
        const doc = await Document.create({ ...req.body, author: req.user.id });
        res.status(201).json(doc);
    } catch (err) {
        res.status(500).json({ message: 'Error creating document' });
    }
};

exports.getDocs = async (req, res) => {
    try {
        const docs = await Document.find({
            $or: [
                { author: req.user.id },
                { sharedWith: { $elemMatch: { user: req.user.id } } },
                { isPublic: true }
            ]
        }).populate('author', 'name email');
        res.json(docs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching documents' });
    }
};

exports.updateDoc = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });
        if (doc.author.toString() !== req.user.id && !doc.sharedWith.some(e => e.user.toString() === req.user.id && e.canEdit))
            return res.status(403).json({ message: 'No permission' });

        doc.title = req.body.title || doc.title;
        doc.content = req.body.content || doc.content;
        await doc.save();
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: 'Error updating document' });
    }
};