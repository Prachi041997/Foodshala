const formidable = require('formidable');
const fs = require('fs');
const { isNull } = require('util');
const Resturant = require('../../models/resturant');
exports.getResturantById = (req, res, next, id)=> {
    Resturant.findById(id)
    .exec((err, resturant)=> {
        if(err || !resturant) {
            return res.status(400).json({
                err: "No resturant was found"
            })
        }
        req.resprofile = resturant;
        next();
    })
}

exports.uploadResturantPhoto = (req, res)=>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file)=> {
        if(err) {
            return res.status(400).json({
                errors: "Problem with image"
            })
        }
   
        Resturant.findById(req.params.id)
        .select('photo')
        .then(data=> {
            if(file.photo) {
                if(file.photo.size> 3000000) {
                    return res.status(400).json({
                        errors: "File too big"
                    }) 
                }
             data.photo.data = fs.readFileSync(file.photo.path);
             data.photo.contentType = file.photo.type;
             data.save((err, result)=> {
                 if(err){
                    return res.status(400).json({
                        errors: "saving product failed"
                    }) 
                 }
                 return res.json(result);
             })
    
            }
        })
        
    })
}

exports.getResturantPhoto = (req, res)=>{
    Resturant.findById(req.params.resturantId)
    .then(data=> {
        if(data.photo.data) {
            res.set("Content-Type", data.photo.contentType);
            return res.send(data.photo.data)
        }
        else{
            return null;
        }
        next();
    })
}
