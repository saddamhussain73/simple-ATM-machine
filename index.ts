#!/usr/bin/env node
import inquirer from "inquirer";


let myBalance = 100000; // user balance 
let myPin = 1234;      // pin code

// print message
console.log("welcome to atm_machine");

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "enter your pin code"
    }
])
if (pinAnswer.pin === myPin) {
    console.log("pin is correct, login successfully");
    // console.log(`current account balance is ${myBalance}`)
    
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "select an operation",
            choices: ["withdraw ammount","check balance"]
        }
    ])  

    if (operationAns.operation === "withdraw ammount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawl method",
                choices: ["fast cash" ,"enter amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "fast cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select amount",
                    choices: [5000, 10000, 15000, 25000, 50000]
                }
            ])
            if(fastCashAns.fastCash > myBalance){
                 console.log("insufficient balance");   
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} withdraw successfully`);
                console.log(`your remaining balance is ${myBalance}`); 
            }
        }
        
        else if (withdrawAns.withdrawMethod === "enter amount") {
            let ammountAns = await inquirer.prompt([
                {
                     name: "ammount",
                     type: "number",
                    message: "enter the ammount to withdraw"
                }
            ])
             if(ammountAns.ammount > myBalance){
                 console.log("insufficient balance");
            }
            else{
                myBalance -= ammountAns.ammount;
                console.log(`${ammountAns.ammount} withdraw successfully`);
                console.log(`your remaining balance is ${myBalance}`);
            }  
        }
      
    }
    else if(operationAns.operation === "check balance"){
        console.log(`your account balance is ${myBalance}`);
    }
}
else{
    console.log("pin is incorrect, try again");
}