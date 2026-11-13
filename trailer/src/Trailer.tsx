import { TransitionSeries } from "@remotion/transitions";
import { Scene01Boot } from "./scenes/Scene01Boot";
import { Scene02Title } from "./scenes/Scene02Title";
import { Scene03Directive } from "./scenes/Scene03Directive";
import { Scene04Blackout } from "./scenes/Scene04Blackout";
import { Scene05Elevation } from "./scenes/Scene05Elevation";
import { Scene06Storm } from "./scenes/Scene06Storm";
import { Scene07Shelter } from "./scenes/Scene07Shelter";
import { Scene08Anomaly } from "./scenes/Scene08Anomaly";
import { Scene09ProtocolZero } from "./scenes/Scene09ProtocolZero";

// The whole cut. Drag a sequence's right edge in Studio to retime it; later
// scenes shift along. If the total changes, update durationInFrames in Root.tsx.
export const Trailer: React.FC = () => (
  <TransitionSeries name="RedStep trailer">
    <TransitionSeries.Sequence name="01 System boot" durationInFrames={150}>
      <Scene01Boot />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence name="02 Title" durationInFrames={135}>
      <Scene02Title />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence name="03 Core directive" durationInFrames={120}>
      <Scene03Directive />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence name="04 Comms blackout" durationInFrames={120}>
      <Scene04Blackout />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence name="05 Elevation data" durationInFrames={120}>
      <Scene05Elevation />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence name="06 Storm reroute" durationInFrames={120}>
      <Scene06Storm />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence name="07 Shelter lock" durationInFrames={120}>
      <Scene07Shelter />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence name="08 Anomaly" durationInFrames={120}>
      <Scene08Anomaly />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence name="09 Protocol Zero" durationInFrames={120}>
      <Scene09ProtocolZero />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
