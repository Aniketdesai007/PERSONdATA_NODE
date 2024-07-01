const passport=require('passport');
const localstrategy=require('passport-local').Strategy;
const dataschema = require('./database/DataSchema.js')


passport.use(new localstrategy(async (username,password,done)=>{
    try {
        const user=await dataschema.findOne({username:username})
        if(!user){
            //done(error,username,info)
            return done(null,false,{message:'incorrect user name'});
        }
    const isPasswordMatch =await user.comp(password);
    if(isPasswordMatch){
        return done(null,user);
    }else{
        done(null,false,{message:'incorrect password...'})
    }
        
    } catch (error) {
        return  done(error);
        
    }
    }))

    
    module.exports=passport;