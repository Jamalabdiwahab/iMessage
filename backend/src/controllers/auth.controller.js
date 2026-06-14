

export async function checkAuth(params) {
    
    if(!req.user){
        return res.status(401).json({ message: "unAuthorized"});
    }
    res.status(200).json(req.user)
}