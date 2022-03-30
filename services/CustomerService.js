const { getHashPassword } = require('../lib/hashPassword');
const pool = require("../db/dbPostgress/config/db_connection");
const {
    customer_grocery_list,
  } = require("../db/dbMongo/config/db_buildSchema");
const {
    signUpEmail
  } = require("../mailer/nodemailer");
  const {
    checkEmailUser,
  } = require("../db/dbPostgress/queries/authentication/checkEmail");

class CustomerService{

async customerSignup(payload){

try{
    const { email, password, username, phone, emailNotification } = payload;

    console.log("Email is: " + email);
  
    var [account, address] = email.split("@");
    var domainParts = address.split(".");
  
    //   Email verification
    if (
      (/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
        email
      ) ||
        email === "") &&
      email.length < 256 &&
      account.length < 64 &&
      domainParts.some(function (part) {
        return part.length < 63;
      })
    ) {
      checkEmailUser(email)
        .then((result) => {
          if (!result.rows[0]) {
            console.log("Result is: ");
            console.log(result.rows[0]);
            getHashPassword(password)
              .then((hashedPass) => {
                let sql = {
                  text: "insert into customer (email, phonenumber, username, password, emailnotification) values($1, $2, $3, $4, $5) RETURNING id",
                  values: [email, phone, username, hashedPass, emailNotification],
                };
                pool.query(sql).then(
                  (data) => {
                    let id = data.rows[0].id;
                    console.log("Created users id is : " + id);
                    // use id to set up customer lists and customer grocery lists in mongo.
                    customer_grocery_list.create(
                      { list_id: id, grocery_list: [] },
                      function (error, list) {
                        if (error) {
                          console.log(
                            "Found an error when creating grocery list for new user"
                          );
                          console.log(err);
                        } else {
                          // console.log(Response)
                          console.log(
                            "Succesfully creates new grocery list for signed up user!"
                          );
                          console.log(list);
                        }
                      }
                    );
                    console.log("Added grocery list to mongo db!");
                    signUpEmail(email);
                    return JSON.stringify({
                          msg: "User signed up successfully",
                          done: true,
                        })
                  },
                  (e) => {
                    console.log(e);
                  }
                );
              })
              .catch((e) => {
                throw e;
              });
          } else {
            return
                JSON.stringify({
                  msg: "Your email already exist in our files, so simply login with your password.",
                })
          }
        })
        .catch((e) => {
          console.log(e);
          return JSON.stringify({ msg: "Internal server error" });
        });
    } else {
      return JSON.stringify({ msg: "Invalid email." });
    }
}catch(error){
return error;
}
}


async forgotPassword(payload){
    try{
        console.log("Comes in forgot password");
        const { email, username } = payload;
        // Check username as well when testing forgot password
        checkEmailUser(email)
          .then((result) => {
            if (result.rows[0]) {
              let token = crypto.randomBytes(20).toString("hex");
              let sql = {
                text: "UPDATE customer SET passwordtoken=$1 WHERE id=$2 RETURNING passwordtoken",
                values: [token, result.rows[0].id],
              };
              pool.query(sql).then(
                (data) => {
                  //let id  = data.rows[0].id;
                  let resetLink =
                    req.headers.origin +
                    "/resetpass?token=" +
                    data.rows[0].passwordtoken;
                  forgotPasswordEmail(email, resetLink);
                  return{
                        msg: "Email with reset link has been sent to you.",
                        done: true,
                      }
                },
                (e) => {
                  console.log(e);
                }
              );
            } else {
              return { msg: "Your email does not exist bro." }
            }
          })
          .catch((e) => {
            console.log(e);
            throw e
          });

    }catch(error){
return {msg: "Internal server error", error : error }
    }
}
}

module.exports = CustomerService
