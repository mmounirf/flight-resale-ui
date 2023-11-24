import { Button, Checkbox, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';

import { useForm } from '@mantine/form';
import ticket from '../assets/ticket.json';
import { later } from '../utils';
import Itinerary from './Itinerary';
import classes from './styles.module.css';

type FormValues = {
  confirm: boolean;
};

type TicketInformationStepProps = {
  validationStart: () => void;
  validationEnd: () => void;
};

export default function TicketInformationStep({ validationStart, validationEnd }: TicketInformationStepProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    initialValues: {
      confirm: false,
    },
    validate: {
      confirm: (value) => (value === false ? 'Must agree to terms and conditions' : null),
    },
  });
  const onFormSubmit = async () => {
    setLoading(true);
    validationStart();
    await later(false);
    setLoading(false);
    validationEnd();
  };

  return (
    <Paper shadow='md' radius='lg' p='xl'>
      <Paper withBorder shadow='none' style={{ overflow: 'hidden' }} radius='none'>
        {ticket.flightOffers[0].itineraries.map((itinerary, index) => (
          <Itinerary
            itinerary={itinerary}
            key={index}
            isLast={index === ticket.flightOffers[0].itineraries.length - 1}
          />
        ))}
      </Paper>
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Stack mt='xl'>
          <UnstyledButton
            onClick={() => form.setFieldValue('confirm', !form.values.confirm)}
            className={classes.confirm}
          >
            <h1>{form.values.confirm}</h1>
            <Checkbox
              name='confirm'
              onChange={(event) => form.setFieldValue('confirm', event.currentTarget.checked)}
              checked={form.values.confirm}
              tabIndex={-1}
              size='md'
              mr='xl'
              styles={{ input: { cursor: 'pointer' } }}
              aria-hidden
            />

            <div>
              <Text fw={500} mb={7} lh={1}>
                Confirm ticket listing
              </Text>
              <Text fz='sm' c='dimmed'>
                I agree to list my ticket for sale on this website and acknowledge that I am responsible for the
                accuracy of the listing information.
              </Text>
            </div>
          </UnstyledButton>

          <Button variant='light' type='submit' loading={loading} disabled={!form.values.confirm}>
            List ticket
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
