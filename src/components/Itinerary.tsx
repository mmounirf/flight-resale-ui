import { ActionIcon, Avatar, Collapse, Divider, Flex, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { ItineraryType } from '../types';
import {
  calculateTransitTimes,
  formatDuration,
  formatSegments,
  formatSegmentsDates,
  getAirlinesIndex,
  getStops,
} from '../utils';
import Segments from './Segments';
import classes from './styles.module.css';

export default function Itinerary({ itinerary, isLast }: { itinerary: ItineraryType; isLast: boolean }) {
  const airlines = getAirlinesIndex();
  const [opened, { toggle }] = useDisclosure(false);
  const itineraryCarriers = itinerary.segments.map(({ operating }) => operating.carrierCode);

  const carrierCodes = [...new Set(itineraryCarriers)];

  return (
    <Stack gap={0}>
      <Stack className={classes.itinerary} onClick={() => toggle()} gap={0}>
        <Flex align='center' gap='xl' p='md' w='100%'>
          <Avatar.Group miw={50}>
            {carrierCodes.map((code) => (
              <Tooltip label={airlines[code].name} key={code} withArrow>
                <Avatar src={airlines[code].logoLink} radius='xl'>
                  {code}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>

          <Flex direction='column' w='100%'>
            <Text>{formatSegmentsDates(itinerary.segments)}</Text>

            <Flex>
              <Text size='sm' c='dimmed' mr={5}>
                {carrierCodes.map((code) => airlines[code].name).join(', ')}
              </Text>
            </Flex>
          </Flex>
          <Flex direction='column' w='100%'>
            <Text>{formatDuration(itinerary.duration)}</Text>
            <Text size='sm' c='dimmed'>
              {formatSegments(itinerary.segments)}
            </Text>
          </Flex>
          <Flex direction='column' w='100%'>
            <Text>{getStops(itinerary.segments)}</Text>
            <Text size='sm' c='dimmed'>
              {calculateTransitTimes(itinerary.segments).map(({ duration, at }) => `${duration} ${at}`)}
            </Text>
          </Flex>

          <ActionIcon variant='light' size='xl' radius='xl'>
            <IconChevronDown
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
              onClick={() => toggle()}
              className={opened ? classes.collapseIconAnimated : classes.collapseIcon}
            />
          </ActionIcon>
        </Flex>
      </Stack>
      <Collapse in={opened}>
        <Paper px='xl' py='md'>
          <Segments segments={itinerary.segments} />
        </Paper>
      </Collapse>
      {!isLast && <Divider />}
    </Stack>
  );
}
