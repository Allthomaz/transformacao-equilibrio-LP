import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- Camadas base (5-layer stack) ----------

const BgMesh: React.FC<{ seed: number }> = ({ seed }) => {
  const frame = useCurrentFrame();
  const d1 = Math.sin((frame + seed) / 55) * 50;
  const d2 = Math.cos((frame + seed) / 70) * 40;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg }}>
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          top: -500,
          left: -350 + d1,
          filter: "blur(60px)",
          background: `radial-gradient(circle, ${theme.colors.primary}26, transparent 62%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          bottom: -450,
          right: -300 - d2,
          filter: "blur(80px)",
          background: `radial-gradient(circle, ${theme.colors.accent}1F, transparent 65%)`,
        }}
      />
    </AbsoluteFill>
  );
};

const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.primaryDark,
        mixBlendMode: "soft-light",
        opacity: 0.12,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(58,46,38,0.08), transparent 28%, transparent 72%, rgba(58,46,38,0.16))",
      }}
    />
  </AbsoluteFill>
);

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: noise,
        backgroundSize: "220px",
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity: 0.05,
        mixBlendMode: "multiply",
      }}
    />
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, transparent 58%, rgba(58,46,38,0.20) 100%)",
    }}
  />
);

// ---------- Primitivas de motion ----------

const Entrance: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: theme.spring.smooth });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [40, 0], { ...clamp, easing: theme.ease.out })}px) scale(${interpolate(
          p,
          [0, 1],
          [0.94, 1],
          { ...clamp, easing: theme.ease.out }
        )})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Wrapper de cena: aplica exit rápido (~10 frames) no final da cena. */
const SceneShell: React.FC<{
  children: React.ReactNode;
  exitFrom: number; // frame local em que o exit começa
}> = ({ children, exitFrom }) => {
  const frame = useCurrentFrame();
  const exitY = interpolate(frame, [exitFrom, exitFrom + 10], [0, -46], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitO = interpolate(frame, [exitFrom, exitFrom + 10], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity: exitO, transform: `translateY(${exitY}px)` }}>{children}</AbsoluteFill>;
};

// ---------- Conteúdo ----------

type Step = {
  num: string;
  title: string;
  lines: string[];
};

const STEPS: Step[] = [
  {
    num: "1",
    title: "Você manda uma mensagem",
    lines: [
      "Um WhatsApp, do jeito que der: duas linhas, um áudio,",
      "até um “oi, não sei como começar”. Eu respondo",
      "pessoalmente, sem robô e sem compromisso.",
    ],
  },
  {
    num: "2",
    title: "Primeira sessão: só uma conversa",
    lines: [
      "Não é prova, não é interrogatório. Você conta o que",
      "te trouxe do jeito que conseguir, e se não souber",
      "por onde começar, eu conduzo.",
    ],
  },
  {
    num: "3",
    title: "Caminho construído a dois",
    lines: [
      "Combinamos a frequência e o foco. A cada sessão,",
      "escuta treinada e ferramentas pra aplicar na semana",
      "real, no seu tempo, sem pressa e sem julgamento.",
    ],
  },
];

const StepScene: React.FC<{ step: Step }> = ({ step }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // respiração sutil para elementos parados >2s
  const breathe = 1 + Math.sin(frame / 22) * 0.012;
  const float = Math.sin(frame / 30) * 3;

  return (
    <SceneShell exitFrom={100}>
      {/* linha fina de detalhe gráfico atrás do número */}
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 300,
          width: interpolate(
            spring({ frame: frame - 4, fps, config: theme.spring.smooth }),
            [0, 1],
            [0, 240],
            { ...clamp, easing: theme.ease.out }
          ),
          height: 2,
          backgroundColor: theme.colors.accent,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 64,
          padding: "0 200px",
          height: "100%",
        }}
      >
        <Entrance delay={2}>
          <div
            style={{
              fontFamily: theme.fonts.display,
              fontSize: 360,
              lineHeight: 1,
              color: theme.colors.primary,
              transform: `scale(${breathe}) translateY(${float}px)`,
              textShadow: `0 0 60px ${theme.colors.glow}`,
            }}
          >
            {step.num}
          </div>
        </Entrance>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1150 }}>
          <Entrance delay={8}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontWeight: 300,
                fontSize: 22,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: theme.colors.accent,
              }}
            >
              Passo {step.num} de 3
            </div>
          </Entrance>
          <Entrance delay={14}>
            <div
              style={{
                fontFamily: theme.fonts.display,
                fontSize: 84,
                lineHeight: 1.08,
                color: theme.colors.text,
              }}
            >
              {step.title}
            </div>
          </Entrance>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            {step.lines.map((line, i) => (
              <Entrance key={i} delay={20 + i * 5}>
                <div
                  style={{
                    fontFamily: theme.fonts.body,
                    fontWeight: 300,
                    fontSize: 34,
                    lineHeight: 1.4,
                    color: theme.colors.textDim,
                  }}
                >
                  {line}
                </div>
              </Entrance>
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

/** Barra de progresso persistente: 1 → 2 → 3 preenchendo. */
const ProgressRail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fill = interpolate(frame, [10, durationInFrames - 40], [0, 1], {
    easing: theme.ease.inOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labels = ["Contato", "Primeira sessão", "Acompanhamento"];
  const w = 1520;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div style={{ position: "relative", width: w, height: 3, backgroundColor: "rgba(58,46,38,0.14)", borderRadius: 3 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 3,
            width: w * fill,
            borderRadius: 3,
            backgroundColor: theme.colors.primaryDark,
          }}
        />
        {[0, 0.5, 1].map((pos, i) => {
          const active = fill >= pos - 0.01;
          const pop = spring({
            frame: frame - (12 + i * 55),
            fps,
            config: theme.spring.bouncy,
          });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: w * pos - 9,
                top: -7.5,
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: active ? theme.colors.primary : theme.colors.bgAlt,
                border: `2px solid ${active ? theme.colors.primary : "rgba(58,46,38,0.25)"}`,
                transform: `scale(${interpolate(pop, [0, 1], [0.4, 1], { ...clamp, easing: theme.ease.out })})`,
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", width: w, justifyContent: "space-between" }}>
        {labels.map((label, i) => (
          <div
            key={i}
            style={{
              fontFamily: theme.fonts.body,
              fontWeight: 300,
              fontSize: 20,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:
                fill >= [0, 0.5, 1][i] - 0.01 ? theme.colors.primaryDark : "rgba(58,46,38,0.4)",
              textAlign: i === 0 ? "left" : i === 1 ? "center" : "right",
              flex: 1,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

/** Cena final: frase de fechamento + micro-CTA. */
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const breathe = 1 + Math.sin(frame / 22) * 0.012;
  const exitO = interpolate(frame, [durationInFrames - 8, durationInFrames - 1], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        opacity: exitO,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        textAlign: "center",
      }}
    >
      <Entrance delay={2}>
        <div
          style={{
            fontFamily: theme.fonts.display,
            fontSize: 64,
            lineHeight: 1.15,
            color: theme.colors.text,
            maxWidth: 1300,
            transform: `scale(${breathe})`,
          }}
        >
          A primeira conversa costuma ser mais leve do que a cabeça imaginou.
        </div>
      </Entrance>
      <Entrance delay={12}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 8,
          }}
        >
          <div style={{ width: 46, height: 2, backgroundColor: theme.colors.accent }} />
          <div
            style={{
              fontFamily: theme.fonts.body,
              fontWeight: 500,
              fontSize: 30,
              letterSpacing: "0.08em",
              color: theme.colors.primaryDark,
            }}
          >
            Falar com a psicóloga
          </div>
          <div style={{ width: 46, height: 2, backgroundColor: theme.colors.accent }} />
        </div>
      </Entrance>
      {/* sutil marca d'água da paleta */}
      <Entrance delay={18}>
        <div
          style={{
            marginTop: 14,
            fontFamily: theme.fonts.body,
            fontWeight: 300,
            fontSize: 20,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: theme.colors.textDim,
            opacity: interpolate(
              spring({ frame: frame - 18, fps, config: theme.spring.smooth }),
              [0, 1],
              [0, 0.8],
              { ...clamp, easing: theme.ease.out }
            ),
          }}
        >
          Sem pressa · Sem julgamento
        </div>
      </Entrance>
    </AbsoluteFill>
  );
};

// ---------- Composição ----------

const SCENE_LEN = 110;
const TOTAL = 360;

export const ComoFunciona: React.FC = () => {
  return (
    <AbsoluteFill>
      <BgMesh seed={0} />
      {STEPS.map((step, i) => (
        <SequenceSafe key={i} from={i * SCENE_LEN} durationInFrames={SCENE_LEN}>
          <StepScene step={step} />
        </SequenceSafe>
      ))}
      <SequenceSafe from={3 * SCENE_LEN} durationInFrames={TOTAL - 3 * SCENE_LEN}>
        <ClosingScene />
      </SequenceSafe>
      <ProgressRail />
      <Grade />
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

// Sequence local (mantém clamp de duração)
const SequenceSafe: React.FC<{
  from: number;
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ from, durationInFrames, children }) => (
  <Sequence from={from} durationInFrames={durationInFrames} style={{ position: "absolute", inset: 0 }}>
    {children}
  </Sequence>
);
