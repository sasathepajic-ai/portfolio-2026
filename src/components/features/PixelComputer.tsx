"use client";

/**
 * Pixel-art retro computer — CSS-only, adapted to app theme.
 *
 * Original technique: box-shadow pixel art + CSS animation.
 * Colors mapped:
 *   --light-gray  → foreground/10 tint (parchment/near-white)
 *   --dark-gray   → foreground/40 (mid)
 *   --gray        → foreground/25 (soft)
 *   --dark-blue   → surface (near-black in dark, near-white bg in light)
 *   --light-blue  → primary (green in dark / dark in light → use mondrian-blue instead)
 */
export default function PixelComputer() {
  return (
    <div className="pixel-computer-wrap" aria-hidden="true">
      <div className="pixel-computer" />
      <style>{`
        .pixel-computer-wrap {
          position: relative;
          width: 340px;
          height: 300px;
          flex-shrink: 0;
        }

        .pixel-computer {
          position: absolute;
          width: 340px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background:

            /* Bottom Section */
            repeating-linear-gradient(90deg, var(--pc-gray) 0 10px, var(--pc-light) 10px 18px) 258px 236px / 64px 10px,
            repeating-linear-gradient(90deg, var(--pc-dark) 0 10px, var(--pc-light) 10px 18px) 258px 246px / 64px 38px,
            linear-gradient(var(--pc-dark), var(--pc-dark)) 166px 264px / 10px 14px,
            linear-gradient(var(--pc-light) 10px, var(--pc-dark) 10px) 144px 248px / 80px 20px,
            linear-gradient(90deg, var(--pc-dark) 10px, var(--pc-gray) 10px) 124px 236px / 110px 48px,
            linear-gradient(90deg, var(--pc-gray) 10px, var(--pc-light) 10px) 90px 230px / 250px 60px,
            linear-gradient(90deg, var(--pc-gray) 10px, var(--pc-light) 10px) 100px 220px / 240px 80px,
            linear-gradient(var(--pc-dark), var(--pc-dark)) 10px bottom / 330px 80px,
            linear-gradient(var(--pc-dark), var(--pc-dark)) left bottom / 320px 70px,

            /* Top Section */
            linear-gradient(90deg, var(--pc-gray) 18px, var(--pc-light) 18px 26px, var(--pc-gray) 26px 36px, var(--pc-dark) 36px 122px, var(--pc-light) 122px 160px, var(--pc-gray) 160px) 120px 180px / 170px 10px,
            linear-gradient(var(--pc-gray) 10px, var(--pc-screen) 10px 150px, var(--pc-gray) 150px) 130px 10px / 150px 160px,
            linear-gradient(90deg, var(--pc-gray) 10px, var(--pc-screen) 10px 180px, var(--pc-gray) 180px) 110px 30px / 190px 120px,
            linear-gradient(var(--pc-gray), var(--pc-gray)) 120px 20px / 170px 140px,
            linear-gradient(var(--pc-light), var(--pc-light)) 110px top / 190px 200px,
            linear-gradient(90deg, var(--pc-gray) 10px, var(--pc-light) 10px) 90px 10px / 220px 180px,
            linear-gradient(var(--pc-gray), var(--pc-gray)) 100px top / 200px 200px,
            linear-gradient(var(--pc-dark), var(--pc-dark)) 40px top / 260px 200px,
            linear-gradient(90deg, var(--pc-dark) 50%, var(--pc-light) 50%) 30px 10px / 280px 180px,

            /* Back section */
            linear-gradient(90deg, var(--pc-dark) 96px, var(--pc-gray) 96px) 70px 210px / 216px 14px,
            linear-gradient(var(--pc-dark), var(--pc-dark)) 90px 190px / 178px 30px;

          background-repeat: no-repeat;

          /* Theme-adaptive palette */
          --pc-light:  color-mix(in srgb, var(--foreground) 12%, var(--background));
          --pc-gray:   color-mix(in srgb, var(--foreground) 28%, var(--background));
          --pc-dark:   color-mix(in srgb, var(--foreground) 45%, var(--background));
          --pc-screen: color-mix(in srgb, var(--foreground) 8%, var(--background));
          --pc-cursor: var(--accent);
        }

        html[data-theme="light"] .pixel-computer {
          --pc-cursor: var(--mondrian-blue);
        }

        .pixel-computer::before {
          content: "";
          display: block;
          position: absolute;
          width: 10px;
          height: 10px;
          top: 95px;
          left: 175px;
          background-color: var(--pc-cursor);
          animation: pc-hello 3500ms linear infinite forwards alternate;
        }

        @keyframes pc-hello {
          0%, 40% {
            box-shadow:
              0 0 0 var(--pc-cursor), 0 0 0 var(--pc-cursor), 0 0 0 var(--pc-cursor),
              0 0 0 var(--pc-cursor), 0 0 0 var(--pc-cursor), 0 0 0 var(--pc-cursor),
              40px -30px 0 var(--pc-cursor), 40px -20px 0 var(--pc-cursor),
              10px -30px 0 var(--pc-cursor), 10px -20px 0 var(--pc-cursor),
              50px 0 0 var(--pc-cursor),
              40px 10px 0 var(--pc-cursor), 30px 10px 0 var(--pc-cursor),
              20px 10px 0 var(--pc-cursor), 10px 10px 0 var(--pc-cursor);
          }

          60%, 100% {
            box-shadow:
              50px -30px 0 var(--pc-cursor), 50px -10px 0 var(--pc-cursor),
              50px 0 0 var(--pc-cursor), 50px 10px 0 var(--pc-cursor),
              30px -30px 0 var(--pc-cursor), 30px -20px 0 var(--pc-cursor),
              30px -10px 0 var(--pc-cursor), 30px 0 0 var(--pc-cursor), 30px 10px 0 var(--pc-cursor),
              20px -10px 0 var(--pc-cursor), 10px -10px 0 var(--pc-cursor),
              0 -30px 0 var(--pc-cursor), 0 -20px 0 var(--pc-cursor),
              0 -10px 0 var(--pc-cursor), 0 10px 0 var(--pc-cursor);
          }
        }
      `}</style>
    </div>
  );
}
