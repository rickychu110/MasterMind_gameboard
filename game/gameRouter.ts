import express, { Request, Response} from "express";
import {client} from './app'
import {loggedInAPI} from './guard';
export const gameRouter = express.Router();
let gameid:any;
//upload win record
gameRouter.post('/game',loggedInAPI,async function (req: Request, res: Response) {
    console.log(req.body.color_id1,req.body.color_id2,req.body.color_id3,req.body.color_id4)
    const gameInfo=await client.query(`update gameinfo set updated_at=to_timestamp(${Date.now()} / 1000.0),winner_id=${req.session["user"].id},ans_color_id1='${req.body.color_id1}',ans_color_id2='${req.body.color_id2}',ans_color_id3='${req.body.color_id3}',ans_color_id4='${req.body.color_id4}' where id=${gameid.rows[0].id} returning id`);
    console.log(`gameinfo id:${gameInfo.rows[0].id} added !`);
    res.json({success:true,message:"Game record upload success!"});
});
//upload logs
gameRouter.post('/logs',loggedInAPI,async function (req: Request, res: Response) {
    console.log(`${req.body.correct},${req.body.correctPos},${req.body.round},'${req.body.color_id1}','${req.body.color_id2}','${req.body.color_id3}','${req.body.color_id4}'`);
    if(req.body.round==1){
            gameid=await client.query(`insert into gameinfo(winner_id) values('1') returning id`);
    }
     const log=await client.query(`insert into logs(game_id,round,player_id,color_id1,color_id2,color_id3,color_id4,correct,correctpos) values ('${gameid.rows[0].id}','${req.body.round}','${req.session["user"].id}','${req.body.color_id1}','${req.body.color_id2}','${req.body.color_id3}','${req.body.color_id4}','${req.body.correct}','${req.body.correctPos}') returning id`);
      console.log(`log id:${log.rows[0].id} added !`);
});

gameRouter.post('/user',loggedInAPI,async function (req: Request, res: Response) {
    const showRecord= await client.query(`select gameinfo.id,updated_at,max(round),ans_color_id1,ans_color_id2,ans_color_id3,ans_color_id4 from gameinfo join logs on gameinfo.id=logs.game_id where winner_id = ${req.session["user"].id} group by gameinfo.id`)
    let tempJson=[];
    for(let record of showRecord.rows){
        tempJson.push({
            gameid:record.id,
            date:record.updated_at,
            round:record.max,
            color1:record.ans_color_id1,
            color2:record.ans_color_id2,
            color3:record.ans_color_id3,
            color4:record.ans_color_id4,
        }  
        )
    }
    tempJson.push(req.session["user"].username);
    console.log(tempJson);
    res.json(tempJson);
});