module.exports = function(reouter){
    router.get("/", function(req, res){
        res.render("home");
    });

    router.get("/saved", function(req, res){
        res.render("saved");
    });
}