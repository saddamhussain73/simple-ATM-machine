#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 100000; // user balance 
let myPin = 1234;      // pin code

// print message
console.log(chalk.bgMagenta.bold("\n\t  welcome to saddam-hussain73-simple-atm-machine  \n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("enter your pin code:")
    }
])
if (pinAnswer.pin === myPin) {
    console.log(chalk.bgGreen("\npin is correct, login successfully!\n"));
    // console.log(`current account balance is ${myBalance}`)
    
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow.bold("select an operation\n"),
            choices: ["withdraw ammount","check balance","exit"]
        }
    ])  

    if (operationAns.operation === "withdraw ammount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow("select a withdrawl method\n"),
                choices: ["fast cash" ,"enter amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "fast cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.yellow("select amount\n"),
                    choices: [5000, 10000, 15000, 25000, 50000]
                }
            ])
            if(fastCashAns.fastCash > myBalance){
                 console.log(chalk.bgRed.bold("\ninsufficient balance\n"));   
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(chalk.bgGreen.bold(`\n${fastCashAns.fastCash} withdraw successfully\n`));
                console.log(chalk.bgBlue.bold(`your remaining balance is ${myBalance}\n`)); 
            }
        }
        
        else if (withdrawAns.withdrawMethod === "enter amount") {
            let ammountAns = await inquirer.prompt([
                {
                     name: "ammount",
                     type: "number",
                    message: chalk.yellow("enter the ammount to withdraw\n")
                }
            ])
             if(ammountAns.ammount > myBalance){
                 console.log(chalk.bgRed.bold("\ninsufficient balance!\n"));
            }
            else{
                myBalance -= ammountAns.ammount;
                console.log(chalk.bgGreen.bold(`\n${ammountAns.ammount} withdraw successfully\n`));
                console.log(chalk.bgBlue.bold(`your remaining balance is ${myBalance}\n`));
            }  
        }
      
    }
    else if(operationAns.operation === "check balance"){
        console.log(chalk.bgBlue(`\nyour account balance is ${myBalance}\n`));
    }
    else if (operationAns.operation === "exit"){
        console.log(chalk.yellow.bold`\nthank you for using.${chalk.bgGreen.bold("\n\tgoodby")}`);
        
    }

}
    else{
    console.log(chalk.bgRed.bold("\npin is incorrect, try again!\n"));
}