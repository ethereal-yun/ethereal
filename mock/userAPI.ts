const users = [
  { name: 'Umi', nickName: 'U', gender: 'MALE' },
  { name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'POST /login': (req: any, res: any) => {
    const {username,password}=req.query;  
    if(username&&password){
        res.send({
            status:200,
            token:"enjsiuskfhdkcisn.32skjdjsdhdshfcs.dskhsdjbjdsbsbhfhs",
            nick:username
        })
    }else{
        res.send({
            status:400,
            msg:"用户名密码错误"
        })
    }
  },
};
