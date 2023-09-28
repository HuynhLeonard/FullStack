import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

router.post("/", async(req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message: "You have to complete all fields: title, author and publishYear"});
        }
        const newBook = new Book(req.body);
        const saveBook = await newBook.save();

        return res.status(200).json(saveBook);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// get all book
router.get("/", async (req,res) => {
    try {
        const books = await Book.find();

        res.status(200).json(books);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

router.get("/:id", async (req,res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book) {
            res.status(404).json({message: "No book found!"});
        }

        res.status(200).json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

// update (send all)
router.put("/:id", async (req,res) => {
    try {
        if(!req.body.title || !req.body.author || req.body.publishYear){
            return res.status(404).json({message: "You have to filled out all field."});
        }
        const updatedBook = Book.findByIdAndUpdate(req.params.id, req.body);
        if(!updatedBook){
            return res.status(404).json({message: "Book not found!"});
        }
        
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


// update(send some fields)
// delete

router.delete("/:id", async (req,res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Book has been deleted!"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})
export default router;