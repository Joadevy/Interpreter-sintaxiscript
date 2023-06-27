
# Sintaxiscript interpreter

* _You can also read this in: [version en español](README.es.md)_


## Live Site 🚀
» Live site: https://joadevy.github.io/Interpreter-sintaxiscript/

## Table of contents
  - [Overview](#overview)
  - [Documentation](#language-documentation)
  - [Tools](#tools)
  - [Author](#author)
  - [Feedback](#feedback)

## Overview
» The project consists of building an interpreter for a language with specific characteristics. This interpreter consists of a lexical analyzer, the first stage of the compilation process, where the structures are evaluated at the atomic level and each of the lexical components are recognized, a syntactic analyzer in which the structure of the program is analyzed to determine which sequence of lexical components is valid and which are not, and a semantic analyzer that evaluates the meaning of the program to verify what each sentence does and if they make sense. These three parsers work together in the interpreter, which is responsible for parsing and executing the code entered as input and providing the corresponding output.

» The implementation that I have approached for this concept is an application that takes a text file (.txt format) where it must contain the source code of the program written following the Syntaxiscript rules detailed at the bottom of this document. Once a valid file is loaded you have three options:

- Execute lexical analyzer as the "Ejecutar analizador lexico" option: it will return on screen the lexical components it has found, that is each of the atomic components of the program that have the same meaning at the syntactic level: identifier, real constant, relational operator, etc.
- Execute syntactic analyzer as the "Ejecutar analizador sintactico" option: working together with the lexical analyzer, it will detect possible errors at the syntactic level, that is, in the way the program code has been written, verifying if it complies with the rules defined by the language (for example that there is ; after each statement). In case of success, it will show the syntactic tree that represents the syntactic structure that has the state of the program and the order in which the simple operations are executed.
- Execute interpreter as the "Ejecutar interprete" option: performs the respective interpretation and execution of the code from the tree generated as output of the syntactic analyzer. In case of an error (for example if a variable is used without having been previously declared) it is displayed on the screen, in case of success, the result of the program is printed.

## Language documentation
Sintaxiscript is a language where a program is a sequence of statements. Each statement can be a variable declaration, an assignment, a write, a read, a conditional (if/if else), or a while loop.

Other important features are:
- All variables in a program are of the type real constant and need not be indicated.
- An arithmetic expression can include the arithmetic operators: + to indicate addition, - to indicate subtraction, * to indicate a product, / to indicate division, ^ to indicate power, and RAIZ (spanish word = ROOT) to indicate a root.

#### Writing a program in Sintaxiscript
» To start the declaration of a program, the keyword Program is used together with a program identifier. The body of the program is enclosed in curly braces { BODY }.

```javascript
Program demo { 
  // Program body
}
```

#### Statement declaration
» To declare statements in Sintaxiscript you must take into account the use of ; as a statement separator, i.e., whenever this statement does not represent the last one before a closing curly brace } 

```javascript
variable1 = 100.54;	// . is used to denote decimals in a real constant.
variable2 = 110;
add = variable1 + variable2;
control = -10;  
if [add >= 200]{
  control = 1
};
add = 0
```

#### Variable declaration
» Every variable must be declared BEFORE it is used. These declarations will be made using the var keyword and then the list of variables to be declared separated by commas.

```javascript
var variable1,variable2,variable3;
```

#### Variable assignment
» Any assignment will be made to an arithmetic expression on real numbers. Under this concept, assignments to other variables (since they contain real numbers) or any valid arithmetic operation mentioned above will be admitted. Note the use of parentheses ( ) to indicate priorities in arithmetic operations.

```javascript
var variable1,variable2,add,sub,product, quo, pow, rad, combOp;
variable1 = 25;
variable2 = 5;
add = variable1 + variable2;
sub = variable1 - variable2;
product = variable1 * variable2;
quo = variable1 / variable2;
power = variable1 ^ variable2;
rad = RAIZ (variable1);			// The radicand must be enclosed in parentheses: RAIZ (radicand)
combOp = variable1 * (variable2 + variable1)
```

#### Conditional statements
» To declare a conditional statement, the keywords if and else are used. The condition will be represented in square brackets [CONDITION]. It is also possible to use logical operators (and, or, not). 

```javascript
var control,change;
control = 1;
change = 10.20;
if [control == 1 or change>10]{
  control = change - 10
} else {
  control = change + 10
}
```

#### While loop declaration
» The while loop will function similarly, syntactically, to the conditional structure. The condition will also be enclosed in square brackets [CONDITION]. Then it is also possible to use logical operators (and, or, or, not).

```javascript
var control,change;
change = 0;
control = 0;
while [change < 100 and not[control == 1]]{
  change = change + 10
};
control = 1
```

#### On-screen printing
» The Print keyword is used to print on the screen, which takes as arguments, separated by commas, strings (which are written enclosing them with double quotes: "example string"), arithmetic expressions, identifiers or real constants. 

```javascript
var money,control;
money = 0;
control = 0;
if [money == 0 or not[control <> 0]]{
  money = money + (100.50 * 2.5); 		// Use of parentheses to indicate priorities in arithmetic operations.
  Print("The current balance is: ", money);
  control = 1
};
Print("The doble of current balance is: ",money*2," this is a string to show that it's the end of the program")
```

#### Reading a variable
» Read keyword is used to read a variable and receives two arguments ("string", id), where "string" is a string to be displayed on the screen and id is the variable to be read.

```javascript
var balance, ticket;
Read("Current balance: ",balance);
if [balance <= 50]{
		Print("For 50 still missing: ",50-balance)
}else{
		Read("Type of ticket: ",ticket);
		Print(ticket," has been purchased")
}
```

#### Example of a complete program syntax
»  This is a program that calculates the highest value from a list of numbers entered by the user.

```javascript
Program maximum{
	var value,max,control,amount;
	control = 1;
	Read("Enter amount of numbers to check the maximum: ", amount);
	Read("Enter a value: ",value);
	max = value;
	if [amount == 1] {control = 0};
	while[control <> 0 and control < amount]{
		control = control + 1;
		Read("Enter a value: ",value);
		if [value>max]{
			max = value
		}
	};
	Print("The highest value entered was: ",max)
}
```

## Tools
 
- TypeScript
- Sass
- Git
- Mobile first workflow
- Responsive design

## Author

- Twitter - [@JoaquinArlettaz](https://twitter.com/JoaquinArlettaz)
- LinkedIn - [@joaquin-arlettaz](https://www.linkedin.com/in/joaqu%C3%ADn-arlettaz/)

## Feedback
Any comments and/or suggestions/appreciations about the project, as well as any doubt about it can be consulted to any of my networks/contact forms and I will be happy to answer them.

** Thanks for reading, have a nice day! ** 🚀
