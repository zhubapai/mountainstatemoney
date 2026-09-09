import React from 'react';
import {Composition} from 'remotion';
import {WhatIsABond} from './WhatIsABond';

export const VideoRoot: React.FC = () => (
  <Composition
    id="WhatIsABond"
    component={WhatIsABond}
    durationInFrames={1200}
    fps={30}
    width={1080}
    height={1920}
  />
);
