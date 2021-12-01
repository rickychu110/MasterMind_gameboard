import express, { Request, Response} from "express";
import {client} from './app'
import {loggedInAPI} from './guard';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/uploads`);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
  });
const upload = multer({storage});
export const userRouter=express.Router();
userRouter.get('/',loggedInAPI,async function (req: Request, res: Response) {
    console.log(req.session["user"].username);
    res.json({name:`${req.session["user"].username}`});
})
userRouter.get('/logout', async (req: Request, res: Response) => {
    req.session["user"] = null; 
    res.redirect('/');
});
//register
userRouter.post('/register', async (req: Request, res: Response) => {
    console.log(req.body);
    const username =req.body.username;
    const password= req.body.password;
    await client.query(`insert into player (username,password) values ('${username}','${password}')`);
    
    res.json({success:true});
});
//login
userRouter.post('/login', async (req: Request, res: Response) => {
    console.log(req.body);
    const username =req.body.username;
    const password= req.body.password;
    const userRows =await client.query(`select * from player where username='${username}'`);
    const user = userRows.rows;
    if (user.length > 0){
        if(user[0].password === password){
            req.session["user"]=user[0];
            res.redirect("/main-v2.html")
        }else{
            res.redirect("/")
        }
    }else{
        res.redirect("/ ")
    }
})
userRouter.post('/uploadimage',loggedInAPI,upload.single('pic'),async function (req: Request, res: Response) {
    if (req.file){
        await client.query(`update image set image ='${req.file.filename}' where player_id='${req.session["user"].id}'`)
        res.json({success:true});
    }
    else (res.json({success:false}))
});
userRouter.post('/image',loggedInAPI,async function (req: Request, res: Response) {
    let image =await client.query(`select * from image where player_id='${req.session["user"].id}'`);
    let total =await client.query(`select count(round) as total from logs where player_id = '${req.session["user"].id}'`);
    let win   =await client.query(`select count(correctpos) as win from logs where player_id ='${req.session["user"].id}' and correctpos='4'`);
    console.log(`${total.rows[0].total},${win.rows[0].win}`)
    if(image.rows.length>0){
            res.json({
                success:true,
                name:`${image.rows[0].image}`,
                total:`${total.rows[0].total}`,
                win:`${win.rows[0].win}`
            });
            console.log(`${image.rows[0].image}`);
    }
    else{
        await client.query(`insert into image (player_id) values('${req.session["user"].id}')`);
        res.json({
            success:false,
            name:``,
            total:`0`,
            win:`0`
        });
    }
})