const db = require("../models");

exports.getNote = (data, cb) => {
  db.Note.find({ _headlineId: data._id }, cb);
};

// Handle form submission save submission to mongo
exports.saveNotes = (data, cb) => {
  let newNote = {
    _headlineId: data._id,
    noteText: data.noteText
  };
  db.Note.create(newNote)
    .then(function(dbNote) {})
    .catch(function(err) {
      console.log(err);
      next();
    });
};

exports.deleteNotes = (data, cb) => {
  db.Note.remove({ _id: data._id }, cb);
};
exports.createNotes = (req, res) => {
  db.Note.find({headline: req.query._id}, function(err, all) {
    if (err) console.log(err);
    else
  res.render("notes",{
    notes: all,
    headline_id: req.query._id
  });
  // , {
  //   noteText: all
  // });
  // });
});
};
exports.submitNotes = (req, res) => {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Headline.findOneAndUpdate(
        {},
        { $push: { notes: dbNote._id } },
        { new: true }
      );
    })
    .then(function(dbUser) {
      res.render("notes", { body: dbUser });
    })
    .catch(function(err) {
      res.json(err);
    });
};
