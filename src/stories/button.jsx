import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import Button from '../components/Button';

const Container = styled.div`
  background: red;
  padding: 20px;
`;
const btnStories = storiesOf('Button', module);

btnStories.add('default', () => (
  <Container>
    <Button />
  </Container>
));
btnStories.add('With text', () => (
  <Container>
    <Button>
      Button text
    </Button>
  </Container>
));
btnStories.add('With callback', () => (
  <Container>
    <Button onClick={action('Clicked')}>
      Button text
    </Button>
  </Container>
));
btnStories.add('with very long', () => (
  <Container>
    <Button>
      {/* eslint-disable-next-line max-len */}
      Button with very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text
    </Button>
  </Container>
));
btnStories.add('disabled', () => (
  <Container>
    <Button disabled>
      {/* eslint-disable-next-line max-len */}
      Button
    </Button>
  </Container>
));
