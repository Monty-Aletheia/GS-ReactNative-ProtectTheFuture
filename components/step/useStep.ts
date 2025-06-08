// components/steps/useSteps.ts
import { useState } from "react";

export const useSteps = (initialStep = 1, maxStep = 2) => {
  const [step, setStep] = useState(initialStep);

  const next = () => {
    if (step < maxStep) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  return { step, setStep, next, back };
};
