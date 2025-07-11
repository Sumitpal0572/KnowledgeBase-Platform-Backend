import Document from '../models/Document.js';
import Version from '../models/Version.js';

// Create a new document
export const createDoc = async (req, res) => {
    try {
        const doc = await Document.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id,
            isPublic: req.body.isPublic || false,
            sharedWith: req.body.sharedWith || []
        });
        res.status(201).json(doc);
    } catch (err) {
        console.error('Create Doc Error:', err);
        res.status(500).json({ message: 'Error creating document' });
    }
};

// Get all accessible documents
export const getDocs = async (req, res) => {
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
        console.error('Get Docs Error:', err);
        res.status(500).json({ message: 'Error fetching documents' });
    }
};

// Get a single document by ID
export const getDocById = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id).populate('author', 'name email');

        if (!doc) return res.status(404).json({ message: 'Document not found' });

        const isOwner = doc.author._id.toString() === req.user.id;
        const isShared = doc.sharedWith.some(e => e.user.toString() === req.user.id);
        const isPublic = doc.isPublic;

        if (!isOwner && !isShared && !isPublic) {
            return res.status(403).json({ message: 'You do not have access to view this document' });
        }

        res.json(doc);
    } catch (err) {
        console.error('Get Doc Error:', err);
        res.status(500).json({ message: 'Error fetching document' });
    }
};

// Update an existing document and save version
export const updateDoc = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });

        const isOwner = doc.author.toString() === req.user.id;
        const hasEditAccess = doc.sharedWith.some(e => e.user.toString() === req.user.id && e.canEdit);
        if (!isOwner && !hasEditAccess) return res.status(403).json({ message: 'No permission' });

        // Save a version before updating
        await Version.create({
            document: doc._id,
            title: doc.title,
            content: doc.content,
            author: req.user.id
        });

        doc.title = req.body.title || doc.title;
        doc.content = req.body.content || doc.content;
        await doc.save();
        res.json(doc);
    } catch (err) {
        console.error('Update Doc Error:', err);
        res.status(500).json({ message: 'Error updating document' });
    }
};

// Get version history for a document
export const getDocVersions = async (req, res) => {
    try {
        const versions = await Version.find({ document: req.params.id }).populate('author', 'name');
        res.json(versions);
    } catch (err) {
        console.error('Get Versions Error:', err);
        res.status(500).json({ message: 'Error fetching versions' });
    }
};
