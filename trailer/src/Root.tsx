import { Composition, Folder } from "remotion";
import { Scene01Boot } from "./scenes/Scene01Boot";
import { Scene02Title } from "./scenes/Scene02Title";
import { Scene03Directive } from "./scenes/Scene03Directive";
import { Scene04Blackout } from "./scenes/Scene04Blackout";
import { Scene05Elevation } from "./scenes/Scene05Elevation";
import { Scene06Storm } from "./scenes/Scene06Storm";
import { Scene07Shelter } from "./scenes/Scene07Shelter";
import { Scene08Anomaly } from "./scenes/Scene08Anomaly";
import { Scene09ProtocolZero } from "./scenes/Scene09ProtocolZero";
import { Trailer } from "./Trailer";
import { WhatHappened } from "./film/WhatHappened";
import { Closing } from "./team/Closing";
import { TeamFilm } from "./team/TeamFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Trailer"
        component={Trailer}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={1125}
      />
      <Composition
        id="WhatHappened"
        component={WhatHappened}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={750}
      />
      <Composition
        id="TeamFilm"
        component={TeamFilm}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={4826}
      />
      <Composition id="Closing" component={Closing} width={1920} height={1080} fps={30} durationInFrames={3387} />
      <Folder name="Scenes">
        <Composition id="S01-Boot" component={Scene01Boot} width={1920} height={1080} fps={30} durationInFrames={150} />
        <Composition id="S02-Title" component={Scene02Title} width={1920} height={1080} fps={30} durationInFrames={135} />
        <Composition id="S03-Directive" component={Scene03Directive} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition id="S04-Blackout" component={Scene04Blackout} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition id="S05-Elevation" component={Scene05Elevation} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition id="S06-Storm" component={Scene06Storm} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition id="S07-Shelter" component={Scene07Shelter} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition id="S08-Anomaly" component={Scene08Anomaly} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition id="S09-ProtocolZero" component={Scene09ProtocolZero} width={1920} height={1080} fps={30} durationInFrames={120} />
      </Folder>
    </>
  );
};
