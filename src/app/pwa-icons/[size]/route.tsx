import { ImageResponse } from 'next/og';

const SIZES = ['192', '512'];
const BARS = [0.28, 0.5, 0.78, 0.5, 0.34];

export const generateStaticParams = () => SIZES.map((size) => ({ size }));

export async function GET(
  _request: Request,
  { params }: RouteContext<'/pwa-icons/[size]'>,
) {
  const { size } = await params;
  const px = Number(size);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: px * 0.045,
        background: 'linear-gradient(135deg, #c026d3, #6d28d9, #4338ca)',
      }}
    >
      {BARS.map((height, index) => (
        <div
          key={index}
          style={{
            width: px * 0.08,
            height: px * 0.5 * (height / 0.78),
            borderRadius: px,
            background: 'white',
          }}
        />
      ))}
    </div>,
    { width: px, height: px },
  );
}
