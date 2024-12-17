const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {validateListing, isLoggedIn,isOwner} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync (listingController.createListing)
    );

//New ROute
router.get("/new", 
    isLoggedIn, 
    listingController.renderNewForm)

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, 
        isOwner, 
        wrapAsync(listingController.destroyListing));
        
//Index Route
// router.get("/",wrapAsync(listingController.index)); 



//Show Route
// router.get("/:id",wrapAsync(listingController.showListing));

//Create 
// router.post("/", validateListing,
//     wrapAsync (listingController.createListing));

//Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

// Update Route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing));

//DELETE Route
// router.delete("/:id",
//     isLoggedIn, 
//     isOwner, 
//     wrapAsync(listingController.destroyListing));

module.exports = router;