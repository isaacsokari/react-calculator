import React from 'react';
import './App.css';

  const numbers = {
    zero: 0,
    seven: 7,
    eight: 8,
    nine: 9,
    four: 4,
    five: 5,
    six: 6,
    one: 1,
    two: 2,
    three: 3
  },
  operators = { add: "+", subtract: "-", multiply: "*", divide: "/" },
  endsWithTwoOperators = /([*+-/]{2}$)/,
  endsWithOneOperator = /[/*+-]$/;

const Calculator = () => {
  const [value, setValue] = React.useState("0");
  const [hasJustEvaluated, setHasJustEvaluated] = React.useState(false);
  const [hasEvaluated, setHasEvaluated] = React.useState(false);
  const [fullExpression, setFullExpression] = React.useState("");
  const [hasDecimalPoint, setHasDecimalPoint] = React.useState(false);
  const [hasUsedOperator, setHasUsedOperator] = React.useState(false);

  // React.useEffect(() => {
  //   console.log({hasJustEvaluated})
  // })

  const resetCalculator = () => {
    clearValue();
    setFullExpression("");
    setHasJustEvaluated(false);
  };

  const clearValue = () => {
    setValue("0");
    setHasDecimalPoint(false);
  };

  const handleNumber = (e) => {
    if (!value.includes("Limit")) {
      // set 22 digit input limit
      if (`${value}`.length <= 21) {
        // start new expression after evaluation
        if (hasJustEvaluated || hasUsedOperator) {
          setValue(e.target.value);
        } else if (/\.$/.test(value)) {
          //
          setValue(`${value}${e.target.value}`);
        } else {
          // ignore multiple 0s at beginning
          setValue(
            `${+value || /\./.test(value) ? value : ""}${e.target.value}`
          );
        }
      } else {
        let prevValue = value;

        setValue("Digit Limit Reached");
        setTimeout(() => setValue(prevValue), 1000);
      }
      setHasUsedOperator(false);
      setHasJustEvaluated(false);
    }
  };

  const handleOperator = (e) => {
    if (!value.includes("Limit")) {
      if (hasEvaluated || !fullExpression) {
        // handle fresh expressions
        setFullExpression(`${value}${e.target.value}`);
        setHasEvaluated(false);
      } else if (endsWithOneOperator.test(fullExpression) && hasUsedOperator) {
        // handle expressions that are chained
        if (endsWithTwoOperators.test(fullExpression) && hasUsedOperator) {
          // handle two signs at the end - replace with new sign
          if (!/^-$/.test(e.target.value) && hasUsedOperator) {
            setFullExpression(
              `${fullExpression.slice(0, -2)}${e.target.value}`
            );
          }
        } else if (/^-$/.test(e.target.value) && hasUsedOperator) {
          // add a negative sign at the end if there's only one sign
          if (!endsWithTwoOperators.test(fullExpression)) {
            setFullExpression(`${fullExpression}${e.target.value}`);
          }
        } else {
          setFullExpression(`${fullExpression.slice(0, -1)}${e.target.value}`);
        }
      } else if (fullExpression && !hasUsedOperator) {
        setFullExpression(`${fullExpression}${value}${e.target.value}`);
      }

      setHasUsedOperator(true);
      setHasDecimalPoint(false);
      setHasJustEvaluated(false);
    }
  };

  const handleDecimal = (e) => {
    if (!value.includes("Limit")) {
      if (!hasDecimalPoint && !/\./.test(value)) {
        setValue(`${value}.`);
        setHasDecimalPoint(true);
        setHasJustEvaluated(false);
      }
    }
  };

  const handleEvaluate = (e) => {
    if (!value.includes("Limit")) {
      let expression = hasJustEvaluated ? "" : fullExpression;
      // while (endsWithOneOperator.test(expression)) {
      //   expression = expression.slice(0, -1);
      // }
      setFullExpression(expression + value);
      // eslint-disable-next-line
      setValue(`${eval(expression + "" + value)}`);

      setHasJustEvaluated(true);
      setHasEvaluated(true);
      setHasDecimalPoint(false);
      setHasUsedOperator(false);
    }
  };

  return (
    <>
      <div className="calculator">
        <div className="display">
          <div className="full-expression">{fullExpression}</div>
          <div id="display">{value}</div>
        </div>
        <button id="clear" onClick={resetCalculator}>
          AC
        </button>
        {Object.keys(numbers).map((num) => (
          <button id={num} value={numbers[num]} onClick={handleNumber}>
            {numbers[num]}
          </button>
        ))}
        {Object.keys(operators).map((operator) => (
          <button
            id={operator}
            value={operators[operator]}
            onClick={handleOperator}
          >
            {operators[operator]}
          </button>
        ))}
        <button id="equals" value="=" onClick={handleEvaluate}>
          =
        </button>
        <button id="decimal" value="." onClick={handleDecimal}>
          .
        </button>
      </div>
    </>
  );
};

export default Calculator;
