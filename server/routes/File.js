const router = require('express').Router();
const FileController = require('../controllers/FileController');
const File = require('../models/FilesPresent');
const storage = require('../middleware/GridFS');
const multer = require('multer');
const mongoose = require('mongoose');
const { mongo } = require('mongoose');
const conn = mongoose.connection;

// Upload new file
router.post('/uploadFile', multer({ storage }).single('file'), async (req, res) => {
  // Create a new file and save it to the DB
  const file = new File({
    Name: req.body.titleFolder,
    href: req.body.hrefFolder,
    Category: req.body.categoryFolder,
    Link: req.file.filename
  });

  try {
    const savedFile = await file.save();
    res.status(200).send({
      titleFolder: file.Name,
      hrefFolder: req.file.filename,
      categoryFolder: file.Category,
      Link: file.Link
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update existing file
router.get('/downloadFile/:filename', (req, res) => {
  const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });

  gfs.find({ filename: req.params.filename }).toArray()
    .then(files => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    })
    .catch(err => {
      // Handle the error appropriately
      console.error(err);
      res.status(500).json({
        success: false,
        message: "An error occurred",
      });
    });
});

// Delete link (chunks DB)
router.delete('/deleteLink/:filename', (req, res) => {
  const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });

  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No files available",
      });
    } else {
      gfs.delete(files[0]._id);
    }
  });
});

// Delete file
router.delete('/deleteFile/:fileName', FileController.deleteFile);

// Check if filename exists
router.get('/CheckExist/:fileName', FileController.IsExistFile);

module.exports = router;
