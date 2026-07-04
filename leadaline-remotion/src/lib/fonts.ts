import {continueRender, delayRender, staticFile} from 'remotion';
import {useEffect, useState} from 'react';

/** Loads the brand fonts and blocks the first render until they're ready. */
export const useFonts = () => {
  const [handle] = useState(() => delayRender('load-fonts'));

  useEffect(() => {
    const load = async () => {
      const defs: [string, string][] = [
        ['Manrope', 'fonts/Manrope.woff2'],
        ['Space Grotesk', 'fonts/SpaceGrotesk.woff2'],
      ];
      await Promise.all(
        defs.map(async ([family, path]) => {
          const face = new FontFace(family, `url(${staticFile(path)})`, {
            weight: '100 900',
          });
          await face.load();
          (document.fonts as unknown as {add: (f: FontFace) => void}).add(face);
        })
      );
      continueRender(handle);
    };
    load().catch(() => continueRender(handle));
  }, [handle]);
};
