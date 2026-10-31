import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Profile, SwipeDirection } from '../schemas';

const SWIPE_THRESHOLD = 100;
const EXIT_DISTANCE = 600;

type SwipeCardProps = {
  profile: Profile;
  leaving: SwipeDirection | null;
  onSwipe: (direction: SwipeDirection) => void;
  onExited: () => void;
};

export const SwipeCard = ({
  profile,
  leaving,
  onSwipe,
  onExited,
}: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const exitX = leaving === 'like' ? EXIT_DISTANCE : -EXIT_DISTANCE;

  return (
    <motion.article
      aria-label={profile.name}
      className="absolute inset-0 flex touch-none flex-col overflow-hidden rounded-3xl bg-zinc-900 shadow-xl ring-1 ring-white/10"
      style={{ x, rotate }}
      drag={leaving ? false : 'x'}
      dragSnapToOrigin
      onDragEnd={(_, { offset }) => {
        if (offset.x > SWIPE_THRESHOLD) onSwipe('like');
        else if (offset.x < -SWIPE_THRESHOLD) onSwipe('pass');
      }}
      animate={leaving ? { x: exitX, opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.25 }}
      onAnimationComplete={() => leaving && onExited()}
    >
      <div className="flex h-2/5 items-center justify-center bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatar}
          alt=""
          draggable={false}
          className="size-32 rounded-full object-cover ring-4 ring-white/30"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {profile.name}, {profile.age}
          </h2>
          <p className="text-sm text-zinc-400">
            {profile.role} · {profile.city}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {profile.genres.map((genre) => (
            <li
              key={genre}
              className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-200"
            >
              {genre}
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-zinc-300">{profile.bio}</p>
        <Waveform />
      </div>
    </motion.article>
  );
};

const BARS = [4, 9, 6, 14, 10, 18, 8, 15, 5, 12, 17, 7, 13, 6, 10, 16, 8, 11];

const Waveform = () => (
  <svg
    aria-hidden
    viewBox="0 0 72 20"
    className="mt-auto h-8 w-full text-fuchsia-400/70"
  >
    {BARS.map((height, index) => (
      <rect
        key={index}
        x={index * 4}
        y={(20 - height) / 2}
        width={2}
        height={height}
        rx={1}
        fill="currentColor"
      />
    ))}
  </svg>
);
