import React from 'react';
import {Audio} from '@remotion/media';


import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const sans = 'Arial, Helvetica, sans-serif';
const serif = 'Georgia, Times New Roman, serif';

const colors = {
  cream: '#FAF9F4',
  green: '#1F3D2B',
  gold: '#C98A2C',
  rust: '#96503C',
  muted: '#66645E',
  panel: '#F0F1EB',
  line: '#D8D9D1',
};

const Logo: React.FC<{large?: boolean}> = ({large = false}) => {
  const size = large ? 96 : 66;
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13.5" r="10.5" stroke={colors.gold} strokeWidth="1.3" />
      <path d="M4 19 L8.5 10.5 L11 13 L15.5 5.5 L22 19 Z" stroke={colors.green} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="15.5" cy="5.5" r="1.2" fill={colors.gold} />
    </svg>
  );
};

const Header: React.FC = () => (
  <div style={{position: 'absolute', top: 88, left: 80, right: 80, display: 'flex', alignItems: 'center', gap: 24}}>
    <Logo />
    <div>
      <div style={{fontFamily: sans, fontWeight: 600, fontSize: 29, color: colors.gold, letterSpacing: 1.5}}>BUILDING BLOCKS · 02</div>
      <div style={{fontFamily: serif, fontSize: 42, color: colors.green, marginTop: 6}}>What Is a Bond, Actually?</div>
    </div>
  </div>
);

const Caption: React.FC<{children: React.ReactNode; small?: boolean}> = ({children, small = false}) => (
  <div style={{position: 'absolute', left: 60, right: 60, bottom: 105, minHeight: 180, border: `2px solid ${colors.gold}`, borderRadius: 28, background: colors.panel, boxShadow: '0 20px 34px rgba(31,61,43,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 42px', textAlign: 'center', fontFamily: sans, fontWeight: 600, lineHeight: 1.14, fontSize: small ? 52 : 60, color: colors.green}}>
    {children}
  </div>
);

const Scene: React.FC<{children: React.ReactNode; start: number; duration: number}> = ({children, start, duration}) => (
  <Sequence from={start} durationInFrames={duration}>
    <SceneFade duration={duration}>{children}</SceneFade>
  </Sequence>
);

const SceneFade: React.FC<{children: React.ReactNode; duration: number}> = ({children, duration}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: interpolate(frame, [0, 10, duration - 10, duration], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)})}}>
      {children}
    </AbsoluteFill>
  );
};

const LoanScene: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [18, 75], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  return <>
    <Header />
    <div style={{position: 'absolute', top: 480, left: 180, right: 180, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{fontFamily: sans, fontWeight: 600, fontSize: 47, color: colors.green}}>YOU</div>
      <div style={{width: 410, height: 6, background: colors.line, position: 'relative'}}>
        <div style={{position: 'absolute', left: 0, top: -9, width: `${progress * 100}%`, height: 24, background: colors.gold, borderRadius: 12}} />
        <div style={{position: 'absolute', top: -64, left: '34%', fontFamily: sans, fontWeight: 600, color: colors.gold, fontSize: 44}}>$1,000</div>
      </div>
      <div style={{fontFamily: sans, fontWeight: 600, fontSize: 47, color: colors.green}}>ISSUER</div>
    </div>
    <div style={{position: 'absolute', top: 700, left: 135, right: 135, padding: 46, borderRadius: 30, background: '#FFFFFF', border: `2px solid ${colors.line}`, fontFamily: serif, fontSize: 48, color: colors.green, textAlign: 'center', lineHeight: 1.25}}>
      You lend money to a company, city, or government.
    </div>
    <Caption>A bond is a loan—and you’re the lender.</Caption>
  </>;
};

const TermsScene: React.FC = () => <>
  <Header />
  <div style={{position: 'absolute', top: 405, left: 105, right: 105}}>
    <div style={{fontFamily: serif, fontSize: 52, textAlign: 'center', color: colors.green, marginBottom: 54}}>Example: a 10-year fixed-rate bond</div>
    {[['FACE VALUE', '$1,000'], ['COUPON RATE', '4%'], ['PAYMENT', '$40 per year'], ['TIME REMAINING', '10 years']].map(([label, value]) => (
      <div key={label} style={{height: 150, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2px solid ${colors.line}`}}>
        <div style={{fontFamily: sans, fontWeight: 500, fontSize: 35, letterSpacing: 1.2, color: colors.muted}}>{label}</div>
        <div style={{fontFamily: sans, fontWeight: 600, fontSize: 53, color: colors.green}}>{value}</div>
      </div>
    ))}
  </div>
  <Caption small>The issuer promises interest payments and repayment at maturity.</Caption>
</>;

const PriceBars: React.FC<{rate: string; price: string; rising: boolean}> = ({rate, price, rising}) => {
  const frame = useCurrentFrame();
  const height = interpolate(frame, [15, 75], [0, rising ? 385 : 555], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  return <>
    <Header />
    <div style={{position: 'absolute', top: 390, left: 100, right: 100, textAlign: 'center', fontFamily: serif, fontSize: 54, color: colors.green}}>If market rates {rising ? 'rise' : 'fall'} to {rate}…</div>
    <div style={{position: 'absolute', top: 560, left: 220, right: 220, height: 650, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: `4px solid ${colors.line}`}}>
      <Bar value="$1,000" label="Face value" height={470} color={colors.green} />
      <Bar value={price} label="Market price" height={height} color={rising ? colors.rust : colors.gold} />
    </div>
    <Caption small>Rates {rising ? 'up → bond price down.' : 'down → bond price up.'}</Caption>
  </>;
};

const Bar: React.FC<{value: string; label: string; height: number; color: string}> = ({value, label, height, color}) => (
  <div style={{width: 260, textAlign: 'center'}}>
    <div style={{fontFamily: sans, fontWeight: 600, color, fontSize: 47, marginBottom: 16}}>{value}</div>
    <div style={{height, background: color, borderRadius: '18px 18px 0 0'}} />
    <div style={{fontFamily: sans, fontSize: 34, color: colors.muted, marginTop: 20}}>{label}</div>
  </div>
);

const FixedCouponScene: React.FC = () => <>
  <Header />
  <div style={{position: 'absolute', top: 430, left: 110, right: 110}}>
    <div style={{fontFamily: serif, fontSize: 53, color: colors.green, textAlign: 'center'}}>Your fixed payment stays the same</div>
    <div style={{marginTop: 115, display: 'flex', alignItems: 'center'}}>
      {[1,2,3,4,5].map((x) => <React.Fragment key={x}><div style={{width: 38, height: 38, borderRadius: 99, background: colors.gold}} />{x < 5 && <div style={{height: 5, flex: 1, background: colors.line}} />}</React.Fragment>)}
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 24, fontFamily: sans, fontWeight: 600, fontSize: 38, color: colors.green}}><span>$40</span><span>$40</span><span>$40</span><span>$40</span><span>$40</span></div>
    <div style={{marginTop: 110, padding: 42, borderRadius: 28, background: '#FFFFFF', border: `2px solid ${colors.line}`, fontFamily: sans, fontSize: 41, color: colors.muted, lineHeight: 1.3, textAlign: 'center'}}>The market price changes only if you sell before maturity.</div>
  </div>
  <Caption small>On a fixed-rate bond, the coupon payment doesn’t change.</Caption>
</>;

const RiskScene: React.FC = () => <>
  <Header />
  <div style={{position: 'absolute', top: 390, left: 115, right: 115}}>
    <div style={{fontFamily: serif, fontSize: 58, textAlign: 'center', color: colors.green}}>Lower risk isn’t no risk.</div>
    {[['DEFAULT RISK', 'The issuer may not pay.'], ['RATE RISK', 'Selling early may mean a loss.'], ['INFLATION RISK', 'Fixed payments may buy less.']].map(([title, body], i) => (
      <div key={title} style={{marginTop: 46, padding: '38px 42px', borderRadius: 26, background: i === 0 ? '#F4E9E4' : '#FFFFFF', border: `2px solid ${i === 0 ? colors.rust : colors.line}`}}>
        <div style={{fontFamily: sans, fontWeight: 600, fontSize: 35, letterSpacing: 1.2, color: i === 0 ? colors.rust : colors.gold}}>{title}</div>
        <div style={{fontFamily: sans, fontSize: 43, color: colors.green, marginTop: 8}}>{body}</div>
      </div>
    ))}
  </div>
  <Caption small>Repayment depends on the issuer paying as promised.</Caption>
</>;

const EndScene: React.FC = () => <>
  <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    <Logo large />
    <div style={{fontFamily: serif, fontWeight: 600, color: colors.green, fontSize: 73, textAlign: 'center', lineHeight: 1.05, marginTop: 24}}>Mountain State<br/>Money</div>
    <div style={{width: 220, height: 4, background: colors.gold, margin: '42px 0'}} />
    <div style={{fontFamily: sans, fontWeight: 600, color: colors.green, fontSize: 53, textAlign: 'center'}}>Read the full breakdown</div>
    <div style={{fontFamily: sans, fontWeight: 600, color: colors.gold, fontSize: 45, marginTop: 24}}>MountainStateMoney.com</div>
    <div style={{fontFamily: sans, fontSize: 28, color: colors.muted, marginTop: 110}}>General financial education · Not investment advice</div>
  </div>
</>;

export const WhatIsABond: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.cream}}>
    <Audio src={staticFile('narration.wav')} volume={0.96} />
    <Scene start={0} duration={165}><LoanScene /></Scene>
    <Scene start={155} duration={310}><TermsScene /></Scene>
    <Scene start={455} duration={210}><PriceBars rate="5%" price="$923" rising /></Scene>
    <Scene start={645} duration={195}><PriceBars rate="3%" price="$1,085" rising={false} /></Scene>
    <Scene start={825} duration={165}><FixedCouponScene /></Scene>
    <Scene start={975} duration={145}><RiskScene /></Scene>
    <Scene start={1100} duration={100}><EndScene /></Scene>
  </AbsoluteFill>
);
