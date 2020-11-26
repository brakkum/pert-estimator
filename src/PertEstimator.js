import React, {useState} from "react";
import "./pert.css";

function PertEstimator() {

  const [pessimistic, setPessimistic] = useState(0);
  const [realistic, setRealistic] = useState(0);
  const [optimistic, setOptimistic] = useState(0);

  const getPert = () => {
    if ([realistic, pessimistic, optimistic].every(n => !n || n < 0)) return 0;
    if (pessimistic < 0) setPessimistic(0);
    if (realistic < 0) setRealistic(0);
    if (optimistic < 0) setOptimistic(0);

    const estimate = (pessimistic + (4 * realistic) + optimistic) / 6;

    return getRoundedUpToQuarter(estimate);
  };

  const getRoundedUpToQuarter = number => {
    return Math.ceil(number * 4) / 4;
  };

  const pert = getPert();
  const documentation = getRoundedUpToQuarter(pert / 5);
  const steps = ".25"
  const scenarios = {
    "Pessimistic": {
      "value": pessimistic,
      "onChange": setPessimistic
    },
    "Realistic": {
      "value": realistic,
      "onChange": setRealistic
    },
    "Optimistic": {
      "value": optimistic,
      "onChange": setOptimistic
    },
  }

  return (
    <div className="pert-estimator">
      <h1>PERT Estimator</h1>
      <p>Fill in the fields with your hour estimate for the task at hand</p>
      <div className="inputs">
        {
          Object.entries(scenarios).map(([scenario, properties]) => {
            return <div className="pert_scenario">
              <label htmlFor={"pert_"+scenario.toLowerCase()}>{scenario}</label>
              <input
                type="number"
                name={"pert_"+scenario.toLowerCase()}
                step={steps}
                min={0}
                value={properties.value}
                onChange={e => properties.onChange(parseFloat(e.target.value))}
              />
            </div>
          })
        }
      </div>
      <div className="results">
        {pert ? (
            <h2>
              Estimate: <span style={{color: "#EE7623"}}>{pert} hours</span>
            </h2>
          ) : 'Fill in the numbers, silly.'
        }
      </div>
      <h3>
        {!!pert && `Also, you should probably consider ~${documentation} hours for documentation 😁`}
      </h3>
    </div>
  );
}

export default PertEstimator;
