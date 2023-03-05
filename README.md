# Thales-MEP
This is a math expression parser by PRESA


This parser follows the following grammar:

E -> T + E | T - E | T
T -> F * T | F / T | F
F -> ID | Int | (E) | -F

Int -> { digit }+
ID -> char { char | digit | _ } 