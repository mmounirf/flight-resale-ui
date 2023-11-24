import { Alert, Stepper } from '@mantine/core';
import { useState } from 'react';

import { IconCheck } from '@tabler/icons-react';
import TicketInformationStep from '../components/TicketInformationStep';
import ValidateTicketStep from '../components/ValidateTicketStep';
import classes from './SellTicketPage.module.css';

export default function SellTicketPage() {
  const [active, setActive] = useState(0);
  const [loadingStep, setLoadingStep] = useState<number | null>();

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      orientation='vertical'
      allowNextStepsSelect={false}
      className={classes.stepperContainer}
      classNames={{ root: classes.stepperContainer, content: classes.stepContent, steps: classes.stepsContainer }}
    >
      <Stepper.Step
        label='Ticket Validation'
        description='Check your ticket eligibility for resale'
        loading={loadingStep === 0}
      >
        <ValidateTicketStep
          validationEnd={() => {
            setLoadingStep(null);
            setActive(1);
          }}
          validationStart={() => setLoadingStep(0)}
        />
      </Stepper.Step>
      <Stepper.Step
        loading={loadingStep === 1}
        label='Resale Confirmation'
        description='Ticket information and resale acknowledgement'
      >
        <TicketInformationStep
          validationEnd={() => {
            setLoadingStep(null);
            setActive(2);
          }}
          validationStart={() => setLoadingStep(1)}
        />
      </Stepper.Step>
      <Stepper.Completed>
        <Alert variant='light' color='green' title='Request Submitted' icon={<IconCheck />}>
          Your request has been recieved, we will review and shortly your ticket will be listed in our marketplace.
        </Alert>
      </Stepper.Completed>
    </Stepper>
  );
}
