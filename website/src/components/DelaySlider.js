import {
  Box,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';

export default function DelaySlider() {
  const [delay, setDelay] = useState(
    localStorage.getItem('apollo-x-custom-delay') ?? 1000
  );
  useEffect(() => {
    localStorage.setItem('apollo-x-custom-delay', delay);
  }, [delay]);
  return (
    <Box>
      <Heading fontSize="md">
        Custom <code>@defer</code> Delay: {delay}ms
      </Heading>
      <Slider min={0} max={5000} value={delay} onChange={setDelay}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
