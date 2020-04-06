const express = require("express");
const router = express.Router();
const { Notes } = require("../model/notes");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    let notes = await Notes.find();
    if (!notes) {
      res.status(200).json({ status: 0, message: "no notes found" });
    }
    res.status(200).json({ status: 0, message: "notes found", notes: notes });
  } catch (e) {
    res.status(500).json({ status: 1, message: "unexpected error occured!" });
  }
});

router.post("/", auth, async (req, res) => {
  console.log(req.body);
  try {
    const notes = new Notes({
      userID: req.user.id,
      notesName: req.body.notesName,
      notesCategory: req.body.notesCategory,
      notesTitle: req.body.notesTitle,
      notesDescription: req.body.notesDescription,
      isBookmarked: req.body.isBookmarked,
    });

    const notesSaved = await notes.save();

    res
      .status(200)
      .json({ status: 0, message: "Notes added successfully", notes: notes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 1, message: "unepected error" });
  }
});

// Update Pinned status
router.put("/", auth, async (req, res) => {
  try {
    // console.log(req.body);

    let data = await Notes.findOne({
      userID: req.user.id,
      _id: req.body.notesid,
    }).then(
      (data) =>
        Notes.update(
          { _id: req.body.notesid },
          { $set: { isBookmarked: !data.isBookmarked } }
        ),
      function (err, data) {
        if (err) {
          console.log(err);
        }
      }
    );
    // let updatedNotes = await data
    //   .update(
    //     { _id: req.body.notesid },
    //     { $set: { isBookmarked: !data.isBookmarked } }
    //   )
    //   .then((dbmodel) => res.json(dbmodel));
    // console.log("Pinned Updated" + data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

// Update Notes
router.put("/:id", auth, async (req, res) => {
  // let userid = req.user.id;
  console.log(req.body);
  try {
    let foundNotes = await Notes.findById({ _id: req.params.id });
    (foundNotes.notesName = req.body.notesName),
      (foundNotes.notesCategory = req.body.notesCategory),
      (foundNotes.notesTitle = req.body.notesTitle),
      (foundNotes.notesDescription = req.body.notesDescription),
      (foundNotes.isBookmarked = req.body.isBookmarked);
    let updated = foundNotes.save();

    res.send("Notes Updated");
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, (req, res) => {
  try {
    let notesdeleted = Notes.findByIdAndRemove({ _id: req.params.id });
    console.log(notesdeleted);
    if (!notesdeleted) {
      res.status(400).send("No notes of the ID found in the database");
    }
    res.json({
      message: "notes deleted sucessfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
