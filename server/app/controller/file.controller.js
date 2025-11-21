import db from "../config/db.config.js";
const File = db.file;

export const uploadFile = async (req, res) => {
    try {
        const file = req.file;

        const fileData = {
            filename: file.originalname,
            mimetype: file.mimetype,
            path: file.path
        };

        const saved = await File.create(fileData);
        res.json({ message: "File saved!", saved });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "File upload failed" });
    }
};

export const getFiles = async (req, res) => {
    try {
        const files = await File.findAll();
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
