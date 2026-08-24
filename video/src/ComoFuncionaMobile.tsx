import React from "react";
import {AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {theme} from "./theme";

const STEPS = [
  {num: "1", label: "Contato", title: "Você manda uma mensagem", body: ["Pode ser um áudio, duas linhas", "ou até um simples oi.", "Eu respondo pessoalmente."]},
  {num: "2", label: "Primeira sessão", title: "É só uma conversa", body: ["Não é prova nem interrogatório.", "Você conta o que conseguir.", "Se travar, eu conduzo."]},
  {num: "3", label: "Acompanhamento", title: "Um caminho a dois", body: ["Combinamos frequência e foco.", "Escuta e ferramentas práticas", "para a sua semana real."]},
] as const;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const driftX = Math.sin(frame / 58) * 34;
  const driftY = Math.cos(frame / 72) * 30;
  return <AbsoluteFill style={{backgroundColor: theme.colors.bg}}>
    <div style={{position:"absolute", width:1050, height:1050, borderRadius:"50%", top:-300, left:-430 + driftX, filter:"blur(62px)", background:`radial-gradient(circle, ${theme.colors.primary}26, transparent 64%)`}} />
    <div style={{position:"absolute", width:900, height:900, borderRadius:"50%", bottom:-260, right:-430 + driftY, filter:"blur(72px)", background:`radial-gradient(circle, ${theme.colors.accent}20, transparent 66%)`}} />
  </AbsoluteFill>;
};

const Entrance: React.FC<{delay: number; children: React.ReactNode}> = ({delay, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: theme.spring.smooth});
  const y = interpolate(p, [0, 1], [34, 0], {...clamp, easing: theme.ease.out});
  const scale = interpolate(p, [0, 1], [0.95, 1], {...clamp, easing: theme.ease.out});
  const opacity = interpolate(p, [0, 1], [0, 1], {...clamp, easing: theme.ease.out});
  return <div style={{opacity, transform:`translateY(${y}px) scale(${scale})`}}>{children}</div>;
};

const Scene: React.FC<{step: typeof STEPS[number]; seconds: number}> = ({step, seconds}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const exitStart = seconds * fps - Math.round(0.38 * fps);
  const exitY = interpolate(frame, [exitStart, seconds * fps], [0, -38], {...clamp, easing: theme.ease.in});
  const exitO = interpolate(frame, [exitStart, seconds * fps], [1, 0], {...clamp, easing: theme.ease.in});
  const breathe = 1 + Math.sin(frame / (fps * 0.75)) * 0.01;
  return <AbsoluteFill style={{padding:"250px 112px 280px", opacity:exitO, transform:`translateY(${exitY}px)`, justifyContent:"center"}}>
    <div style={{fontFamily:theme.fonts.body, fontSize:25, fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:theme.colors.accent, marginBottom:38}}>Passo {step.num} de 3 · {step.label}</div>
    <Entrance delay={Math.round(0.12 * fps)}><div style={{fontFamily:theme.fonts.display, fontSize:230, lineHeight:.82, color:theme.colors.primary, textShadow:`0 0 58px ${theme.colors.glow}`, transform:`scale(${breathe})`, marginBottom:58}}>{step.num}</div></Entrance>
    <Entrance delay={Math.round(0.38 * fps)}><div style={{fontFamily:theme.fonts.display, fontSize:92, lineHeight:1.04, color:theme.colors.text, maxWidth:820, marginBottom:52}}>{step.title}</div></Entrance>
    <div style={{display:"flex", flexDirection:"column", gap:18}}>{step.body.map((line, i) => <Entrance key={line} delay={Math.round((0.72 + i * .16) * fps)}><div style={{fontFamily:theme.fonts.body, fontSize:42, lineHeight:1.35, fontWeight:300, color:theme.colors.textDim}}>{line}</div></Entrance>)}</div>
  </AbsoluteFill>;
};

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const fill = interpolate(frame, [0, durationInFrames - 1], [0, 1], {...clamp, easing:theme.ease.inOut});
  return <div style={{position:"absolute", left:58, top:410, width:4, height:1050, borderRadius:4, backgroundColor:theme.colors.bgAlt}}><div style={{width:4, height:1050 * fill, borderRadius:4, backgroundColor:theme.colors.primaryDark}} /></div>;
};

const Closing: React.FC<{seconds: number}> = ({seconds}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const exitStart = seconds * fps - Math.round(.3 * fps);
  const opacity = interpolate(frame, [exitStart, seconds * fps], [1, 0], {...clamp, easing:theme.ease.in});
  const breathe = 1 + Math.sin(frame / (fps * .8)) * .009;
  return <AbsoluteFill style={{padding:"300px 110px", alignItems:"center", justifyContent:"center", textAlign:"center", opacity}}>
    <Entrance delay={Math.round(.12 * fps)}><div style={{fontFamily:theme.fonts.display, fontSize:82, lineHeight:1.12, color:theme.colors.text, transform:`scale(${breathe})`}}>A primeira conversa pode ser mais leve do que você imagina.</div></Entrance>
    <Entrance delay={Math.round(.55 * fps)}><div style={{marginTop:62, fontFamily:theme.fonts.body, fontSize:34, fontWeight:500, color:theme.colors.primaryDark}}>Falar com a psicóloga</div></Entrance>
    <Entrance delay={Math.round(.82 * fps)}><div style={{marginTop:26, fontFamily:theme.fonts.body, fontSize:24, letterSpacing:".16em", textTransform:"uppercase", color:theme.colors.textDim}}>Sem pressa · Sem julgamento</div></Entrance>
  </AbsoluteFill>;
};

const Grade = () => <AbsoluteFill style={{pointerEvents:"none", background:`linear-gradient(180deg, ${theme.colors.bgAlt}30, transparent 30%, transparent 72%, ${theme.colors.primaryDark}18)`, mixBlendMode:"soft-light"}} />;
const Grain = () => { const frame=useCurrentFrame(); const noise=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")`; return <AbsoluteFill style={{pointerEvents:"none", backgroundImage:noise, backgroundPosition:`${frame * 7 % 220}px ${frame * 13 % 220}px`, opacity:.045, mixBlendMode:"multiply"}} />; };
const Vignette = () => <AbsoluteFill style={{pointerEvents:"none", background:`radial-gradient(ellipse at center, transparent 58%, ${theme.colors.primaryDark}24 100%)`}} />;

export const MOBILE_TOTAL_FRAMES = 600;
export const ComoFuncionaMobile: React.FC = () => {
  const {fps} = useVideoConfig();
  const sceneSeconds = 5.5;
  const sceneFrames = Math.round(sceneSeconds * fps);
  const closingFrames = MOBILE_TOTAL_FRAMES - sceneFrames * STEPS.length;
  return <AbsoluteFill><Background />{STEPS.map((step, i) => <Sequence key={step.num} from={i * sceneFrames} durationInFrames={sceneFrames}><Scene step={step} seconds={sceneSeconds} /></Sequence>)}<Sequence from={sceneFrames * STEPS.length} durationInFrames={closingFrames}><Closing seconds={closingFrames / fps} /></Sequence><Progress /><Grade /><Grain /><Vignette /></AbsoluteFill>;
};
