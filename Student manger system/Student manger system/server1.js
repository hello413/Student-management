const http = require('http')
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
//连接数据库服务器
var db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost', user: 'root', password: '459659281', database: 'user_table' //连接池
});
var name1;
//与http配合
http.createServer(function(req,res){
  res.setHeader('access-control-allow-origin', '*');
  var pathname = url.parse(req.url).pathname;
  var query = url.parse(req.url).query;//解析用户请求路径
    //用户登录功能
   if (pathname == '/login') {
    var postData = "";
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分
      var username = params.username
      var password = params.password
      db.query(`select 学号,密码 from student where 学号='${username}'and 密码='${password}'`, function (err, data) {
         //查询数据库
         if(err){
           res.write("数据库出错了")
           res.end();
         }
        else if(data.length==0){
          res.write("");
          res.end();
        }else if (data.length != 0) {
          db.query(`select 姓名 from student where 学号='${username}'`, function (err, data) {
            var s=JSON.stringify(data)
            name1=s.substring(s.indexOf(":")+2,s.lastIndexOf("}")-1)
              res.end(s);
              db.query(`update user set username='${name1}',sno='${username}'`, function (err, data) {
          })
            })
          }
        })
      })
    }
  //用户注册功能
  if (pathname == '/reg') {
    var postData=""
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);
      var sno=params.学号
      var pass=params.密码
      var name=params.姓名
      var voc=params.专业
      var class1=params.班级
      var sex=params.性别
      var birthdate=params.出生日期
      var tel=params.联系电话
      var game=params.竞赛信息
      var prize=params.获奖情况
      var grade=params.年级
      db.query(`select 学号 from student where 学号='${sno}'`,function(err,data){
         if(data.length!=0){
           res.write("此学号已存在");
           res.end()
         }
      db.query(`insert into student(学号,姓名,专业,班级,性别,出生日期,联系电话,竞赛信息,获奖情况,年级,密码,机房预约,活动预约,心理预约,教室预约) values('${sno}','${name}','${voc}','${class1}','${sex}','${birthdate}','${tel}','${game}','${prize}','${grade}','${pass}','${0}','${0}','${0}','${0}')`, function (err, data) {
         if(err){
           res.write("手机号已有,请重新输入")
           res.end();         
          }else{
            res.write("注册成功")
            res.end();
          }
        })
      })
      })
    }
     //管理员登录
 if(pathname == '/administratorslogin'){
    var postData=""
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分
      var administrators_num = params.administrators_number
      var administrators_pass =params.administrators_password
      db.query(`select administrators_num from administrators where administrators_num='${administrators_num}'`, function (err, data) { //查询数据库是否重名
        if(data.length==0){
          res.write("管理员账号或密码错误，请重新输入");
          res.end();
        }
        else if (err) {
          res.write('数据库出错！');
          res.end();
        }
         else if (data.length != 0) { 
          db.query(`select administrators_pass from administrators where administrators_pass='${administrators_pass}'`, function (err, data1) {
            if(data1.length==0){
              res.write("管理员账号或密码错误，请重新输入");
              res.end();
            }
            else if (err) {
              res.write('数据库出错！');
              res.end();
            } else if (data1.length != 0) {
              res.write('登录成功');
              res.end();
            } 
          })
        }

      })
  })
}

   //学生信息导入
   
   if(pathname == '/%E7%A1%AE%E5%AE%9A'){
    var postData=""
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);
      var sno=params.学号
      var name=params.姓名
      var voc=params.专业
      var class1=params.班级
      var sex=params.性别
      var birthdate=params.出生日期
      var tel=params.联系电话
      var game=params.竞赛信息
      var prize=params.获奖情况
      var grade=params.年级
      db.query(`insert into student(学号,姓名,专业,班级,性别,出生日期,联系电话,竞赛信息,获奖情况,年级) values('${sno}','${name}','${voc}','${class1}','${sex}','${birthdate}','${tel}','${game}','${prize}','${grade}')`, function (err, data) {
         if(err){
           res.write("手机号已有,请重新输入")
           res.end();         
          }else{
            res.write("学生信息导入成功")
            res.end();
          }
        })
      })
    }

    //学生信息删除
   if(pathname == '/delete'){
    var postData=""
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);
      
      var sno=params.学号
      var name=params.姓名
      db.query(`select 学号,姓名 from student where 学号='${sno}'and 姓名='${name}'`,function(err,data){
       if(data.length==0){
          res.write('当前学生不存在,请核对后重新输入')
          res.end();
        }else{
          db.query(`delete from student where 学号='${sno}'and 姓名='${name}'`,function(err,data1) {
            if(data1.length != 0){

              res.write('删除成功');
              res.end();
            }
          })
        }
        })
      })
    }

    //学生信息修改校验
    if(pathname == '/alert'){
      var postData=""
      req.on("data", function (postDataChunk) {
        postData += postDataChunk;
      });
      req.on("end", function () {
        var params = querystring.parse(postData);
        var sno=params.学号
        var name=params.姓名
        db.query(`select 学号,姓名 from student where 学号='${sno}'and 姓名='${name}'`,function(err,data){
          if(err){
            res.write("数据库出错")
            res.end();   
          }else if(data.toString()==''){
            res.write('当前学生不存在,请核对后重新输入')
            res.end();
          }else if(data.toString()!=''){
                res.write('学生信息校验成功，正在跳转到修改页面');
                res.end();
              }
            })
    })
  }

        //学生信息查询及校验
        if(pathname=='/query'){
          var postData=""
          req.on("data", function (postDataChunk) {
            postData = postDataChunk;
          });
          req.on("end", function () {
            var a=eval(postData)
            var b=a.toString()
            var c=b.substring(b.lastIndexOf("=")+1,b.length)
          db.query(`select*from student where 学号='${c}'`, function (err, data) {
            if(data.length==0){
              res.write("");
              res.end();
            }
            else if(data.length!=0){
            var s1=JSON.stringify(data)
            res.end(s1)
            }
        })
      })
        }

      //学生信息修改
   if(pathname == '/alert1'){
     var postData=""
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);
      var sno=params.学号
      var name=params.姓名
      var voc=params.专业
      var class1=params.班级
      var sex=params.性别
      var birthdate=params.出生日期
      var tel=params.联系电话
      var game=params.竞赛信息
      var prize=params.获奖情况
      var grade=params.年级
      db.query(`SET SQL_SAFE_UPDATES = 0`,function(err,data){
         if(err){
           res.write();
           res.end();
         }else{
         db.query(`update student set 学号='${sno}', 姓名='${name}',专业='${voc}',班级='${class1}', 性别='${sex}', 出生日期='${birthdate}',联系电话='${tel}',竞赛信息='${game}', 获奖情况='${prize}', 年级='${grade}'`, function (err, data1) {
          if(err){
           res.write("数据库出错")
           res.end();         
          }else{
            res.write("学生信息修改成功")
            res.end();
          }
        })
      }
      })
      })
    }

      
      
        //余量查询
 if(pathname=='/%E4%BD%99%E9%87%8F1'){
   
  db.query(`select allowance1 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}
else if(pathname=='/%E4%BD%99%E9%87%8F2'){
  db.query(`select allowance2 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}
else if(pathname=='/%E4%BD%99%E9%87%8F3'){
  db.query(`select allowance3 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F4'){
  db.query(`select allowance4 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F5'){
  db.query(`select allowance5 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F6'){
  db.query(`select allowance6 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F7'){
  db.query(`select allowance7 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F8'){
  db.query(`select allowance8 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F9'){
  db.query(`select allowance9 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[15]!=0){
         res.write("当前余量为"+s[15]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F10'){
  db.query(`select allowance10 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[16]!=0){
         res.write("当前余量为"+s[16]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F11'){
  db.query(`select allowance11 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[16]!=0){
         res.write("当前余量为"+s[16]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}else if(pathname=='/%E4%BD%99%E9%87%8F12'){
  db.query(`select allowance12 from allowance`, function (err, data) {
    var s=(JSON.stringify(data))
    if(err){
      res.write('数据库出错')
      res.end();
    }   
    else if(s[16]!=0){
         res.write("当前余量为"+s[16]+",可以预约");
         res.end();
       }else{
         res.write("当前余量为0,不可预约");
         res.end();
       }
})
}
  

//心理预约
if(pathname=='/submit'){
  var postData = ""
  req.on("data", function (postDataChunk) {
    postData += postDataChunk;
  })
  req.on("end", function () {
    var params = querystring.parse(postData);
    var number=params.num;
    db.query(`SET SQL_SAFE_UPDATES = 0`,function(err,data){  //调整数据库的安全模式
      if(number==1){  //预约第一个老师
        db.query(`select allowance1 from allowance`,function(err,data1){
          var s=(JSON.stringify(data1))
    if(s[15]!=0){
        db.query(`update allowance set allowance1=allowance1-1;`, function (err, data2) {
          db.query(`update student set 心理预约='张三老师,本周三14:00-16:00,1号心理辅导室';`, function (err, data3) {
            if(err){
              res.write("数据库出错");
              res.end();
            }else{
              res.write("预约成功");
              res.end();
            }
          })
        })
      }else{
        res.write("预约人数已满，预约失败");
        res.end();
      }
      })
      }else if(number==2){ //预约第二个老师
        db.query(`select allowance2 from allowance`,function(err,data1){
        var s=(JSON.stringify(data1))
        if(s[15]!=0){
        db.query(`update allowance set allowance2=allowance2-1;`, function (err, data2) {
          db.query(`update student set 心理预约='李四老师, 时间:每周五17:00-19:00	 地点:2号心理辅导室';`, function (err, data2) {
            if(err){
              res.write("数据库出错");
              res.end();
            }else{
              res.write("预约成功");
              res.end();
            }
          })
        })
      }else{
        res.write("预约人数已满，预约失败");
        res.end();
      }
      })
      }else if(number==3){//预约第三个老师
        db.query(`select allowance3 from allowance`,function(err,data1){
          var s=(JSON.stringify(data1))
        if(s[15]!=0){
        db.query(`update allowance set allowance3=allowance3-1;`, function (err, data2) {
          db.query(`update student set 心理预约='王二老师, 时间:本周一10:00-12:00	 地点:3号心理辅导室';`, function (err, data2) {
            if(err){
              res.write("数据库出错");
              res.end();
            }else{
              res.write("预约成功");
              res.end();
            }
          })
        })
      }else{
        res.write("预约人数已满，预约失败");
        res.end();
      }
      })
      }
    
  })
  })
}

  //机房预约
  if(pathname=='/jifang'){
    var postData = "";
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);
      var number=params.num;
      db.query(`SET SQL_SAFE_UPDATES = 0`,function(err,data){  //调整数据库的安全模式
        if(number==1){  //预约第一个机房
          db.query(`select allowance7 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance7=allowance7-1;`, function (err, data2) {
            db.query(`update student set 机房预约='7号楼1号机房	2019.4.9 8:00-10:00';`, function (err, data2) {
              if(err){
                res.write("数据库出错");
                res.end();
              }else{
                res.write("预约成功");
                res.end();
              }
            })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }else if(number==2){ //预约第二个老师
          db.query(`select allowance8 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance8=allowance8-1;`, function (err, data2) {
            db.query(`update student set 机房预约='7号楼2号机房	2019.6.2 14:00-16:00	';`, function (err, data2) {
              if(err){
                res.write("数据库出错");
                res.end();
              }else{
                res.write("预约成功");
                res.end();
              }
            })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }else if(number==3){//预约第三个老师
          db.query(`select allowance9 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance9=allowance9-1;`, function (err, data2) {
            db.query(`update student set 机房预约='7号楼3号机房	2019.4.29 9:00-11:00';`, function (err, data2) {
              if(err){
                res.write("数据库出错");
                res.end();
              }else{
                res.write("预约成功");
                res.end();
              }
            })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }
      
    })
    })
  }

  //义工预约
  if(pathname=='/yigong'){
    var postData = "";
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);
      var number=params.num;
      db.query(`SET SQL_SAFE_UPDATES = 0`,function(err,data){  //调整数据库的安全模式
        if(number==1){  //预约第一个活动
          db.query(`select allowance4 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance4=allowance4-1;`, function (err, data2) {
            db.query(`update student set 活动预约='打扫图书馆	时间:2019.3.5 14:00-16:00	地点:学校图书馆';`, function (err, data2) {
            if(err){
              res.write("数据库出错");
              res.end();
            }else{
              res.write("预约成功");
              res.end();
            }
          })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }else if(number==2){ //预约第二个义工
          db.query(`select allowance5 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance5=allowance5-1;`, function (err, data2) {
            db.query(`update student set 活动预约='食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂';`, function (err, data2) {
              if(err){
                res.write("数据库出错");
                res.end();
              }else{
                res.write("预约成功");
                res.end();
              }
            })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }else if(number==3){//预约第三个义工
          db.query(`select allowance6 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance6=allowance6-1;`, function (err, data2) {
            db.query(`update student set 活动预约='校园大扫除 时间:2019.5.18 17:00-19:00	地点:临潼校区';`, function (err, data2) {
              if(err){
                res.write("数据库出错");
                res.end();
              }else{
                res.write("预约成功");
                res.end();
              }
            })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }
      
    })
    })
  }

  //教室预约

  if(pathname=='/jiaoshi'){
    var postData = "";
    req.on("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.on("end", function () {
      var params = querystring.parse(postData);
      var number=params.num;
      db.query(`SET SQL_SAFE_UPDATES = 0`,function(err,data){  //调整数据库的安全模式
        if(number==1){  //预约第一个活动
          db.query(`select allowance10 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance10=allowance10-1;`, function (err, data2) {
            db.query(`update student set 教室预约='A413教室	时间:2019.4.9 8:00-10:00;'`, function (err, data2) {
            if(err){
              res.write("数据库出错");
              res.end();
            }else{
              res.write("预约成功");
              res.end();
            }
          })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }else if(number==2){ //预约第二个义工
          db.query(`select allowance11 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance11=allowance11-1;`, function (err, data2) {
            db.query(`update student set 教室预约='C428教室  时间:2019.6.2 14:00-16:00';`, function (err, data2) {
              if(err){
                res.write("数据库出错");
                res.end();
              }else{
                res.write("预约成功");
                res.end();
              }
            })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }else if(number==3){//预约第三个义工
          db.query(`select allowance12 from allowance`,function(err,data1){
            var s=(JSON.stringify(data1))
          if(s[15]!=0){
          db.query(`update allowance set allowance12=allowance12-1;`, function (err, data2) {
            db.query(`update student set 教室预约='B584教室 	时间:2019.4.29 9:00-11:00';`, function (err, data2) {
              if(err){
                res.write("数据库出错");
                res.end();
              }else{
                res.write("预约成功");
                res.end();
              }
            })
          })
        }else{
          res.write("预约人数已满，预约失败");
          res.end();
        }
        })
        }
      
    })
    })
  }
  if(pathname=='/my'){
    db.query(`select sno from user`, function (err, data) {
      var s1=JSON.stringify(data)
      var s2=eval(s1)
      var s3=s2[0].sno
   db.query(`select 机房预约,心理预约,活动预约,教室预约 from student where 学号='${s3}'`,function(err,data1){
    var s=JSON.stringify(data1)
    if(err){
      res.write("数据库错误");
      res.end();
    }else{
      res.end(s)
    }
   })
  })
}
}).listen(8082)
