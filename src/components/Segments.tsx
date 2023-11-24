import { SegmentType } from '@/types';
import { airportsIndex, calculateTransitTimes, formatDateTime, formatDuration, getAirlinesIndex } from '../utils';

import { Avatar, Divider, Flex, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { IconPlaneArrival, IconPlaneDeparture } from '@tabler/icons-react';
import classes from './styles.module.css';

const Segments = ({ segments }: { segments: SegmentType[] }) => {
  const airlines = getAirlinesIndex();
  const layoverTime = calculateTransitTimes(segments);

  return (
    <Stack>
      {segments.map((segment, index) => (
        <Flex key={segment.id} gap='md' direction='column'>
          <Stack>
            <Flex gap='xs'>
              <Flex align='center'>
                <Tooltip label={airlines[segment.carrierCode].name} key={segment.carrierCode} withArrow>
                  <Avatar src={airlines[segment.carrierCode].logoLink} radius='xl'>
                    {segment.carrierCode}
                  </Avatar>
                </Tooltip>
              </Flex>
              <Flex direction='column' align='center' w='min-content'>
                <ThemeIcon size='md' variant='light' radius='xl'>
                  <IconPlaneDeparture stroke={1.5} style={{ width: '70%', height: '70%' }} />
                </ThemeIcon>
                <div className={classes.segmentLine} />
                <ThemeIcon size='md' variant='light' radius='xl'>
                  <IconPlaneArrival stroke={1.5} style={{ width: '70%', height: '70%' }} />
                </ThemeIcon>
              </Flex>
              <Flex direction='column'>
                <Text fw={500}>
                  {formatDateTime(segment.departure.at)} - {airportsIndex[segment.departure.iataCode].name} (
                  {segment.departure.iataCode})
                </Text>
                <Text size='sm' c='dimmed' my='sm'>
                  Travel time: {formatDuration(segment.duration)}
                </Text>
                <Text fw={500}>
                  {formatDateTime(segment.arrival.at)} - {airportsIndex[segment.arrival.iataCode].name} (
                  {segment.arrival.iataCode})
                </Text>
              </Flex>
            </Flex>
          </Stack>
          {index < segments.length - 1 && (
            <>
              <Divider />
              <Text c='dimmed' size='sm'>
                {layoverTime[index].duration} layover - {airportsIndex[layoverTime[index].at].name}
              </Text>
              <Divider />
            </>
          )}
        </Flex>
      ))}
    </Stack>
  );
};

export default Segments;
