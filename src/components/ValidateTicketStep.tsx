import { Button, Flex, Paper, TextInput } from '@mantine/core';
import { IconTicket, IconUser } from '@tabler/icons-react';
import { useState } from 'react';

import { isNotEmpty, useForm } from '@mantine/form';
import { later } from '../utils';

type FormValues = {
  name: string;
  ticketRef: string;
};

type ValidateTicketStepProps = {
  validationStart: () => void;
  validationEnd: () => void;
};

export default function ValidateTicketStep({ validationStart, validationEnd }: ValidateTicketStepProps) {
  const trueProbability = Math.random() < 0.5;

  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      ticketRef: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      ticketRef: isNotEmpty('Booking reference/Ticket number is required'),
    },
  });

  const onFormSubmit = async () => {
    setLoading(true);
    validationStart();
    await later(trueProbability);
    setLoading(false);
    validationEnd();
  };

  return (
    <Paper shadow='md' radius='md' p='xl'>
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Flex gap='md' direction='column'>
          <TextInput leftSection={<IconUser stroke={1} />} placeholder='Last name' {...form.getInputProps('name')} />
          <TextInput
            leftSection={<IconTicket stroke={1} />}
            placeholder='Booking reference/Ticket number'
            {...form.getInputProps('ticketRef')}
          />
          <Button variant='light' type='submit' loading={loading}>
            Validate Ticket
          </Button>
        </Flex>
      </form>
    </Paper>
  );
}
