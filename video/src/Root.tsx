import "./index.css";
import { Composition } from "remotion";
import { ComoFunciona } from "./ComoFunciona";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ComoFunciona"
        component={ComoFunciona}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
