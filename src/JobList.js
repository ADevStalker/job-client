import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const JobCard = ({ job }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  return (
    <Box
      bg={bg}
      color={color}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
    >
      <VStack align="start" spacing={4}>
        <HStack spacing={10}>
          <Text fontSize="xl" fontWeight="bold">
            {job.title}
          </Text>
          <IconButton
            icon={<Icon as={ExternalLinkIcon} />}
            aria-label="Copy Link"
            onClick={() => {
              navigator.clipboard.writeText(job.link);
            }}
            colorScheme="teal"
            variant="outline"
          ></IconButton>
        </HStack>
        <div dangerouslySetInnerHTML={{ __html: job['content:encoded'] }}></div>
      </VStack>
    </Box>
  );
};

const JobList = ({ jobs }) => {
  if (!jobs) return <></>;
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="bold">
        {jobs.description}
      </Text>
      {jobs.items.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </VStack>
  );
};

export default JobList;
