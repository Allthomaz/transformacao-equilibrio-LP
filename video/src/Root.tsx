import "./index.css";
import { Composition } from "remotion";
import { ComoFunciona } from "./ComoFunciona";
import { ComoFuncionaMobile, MOBILE_TOTAL_FRAMES } from "./ComoFuncionaMobile";

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
      <Composition
        id="ComoFuncionaMobile"
        component={ComoFuncionaMobile}
        durationInFrames={MOBILE_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
