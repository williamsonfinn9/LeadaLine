import {continueRender, delayRender, staticFile} from 'remotion';
import {useEffect, useState} from 'react';
export const useFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(
      ([['Manrope', 'fonts/Manrope.woff2'], ['Space Grotesk', 'fonts/SpaceGrotesk.woff2']] as [string, string][]).map(
        async ([f, p]) => {
          const face = new FontFace(f, `url(${staticFile(p)})`, {weight: '100 900'});
          await face.load();
          (document.fonts as unknown as {add: (x: FontFace) => void}).add(face);
        }
      )
    ).then(() => continueRender(h)).catch(() => continueRender(h));
  }, [h]);
};
export const BLUE = '#2F6BFF';
export const PURPLE = '#7A3FF0';
export const GREEN = '#22C55E';
export const AMBER = '#F5B301';
export const GRAD = 'linear-gradient(135deg,#2F6BFF,#7A3FF0)';
export const DISPLAY = '"Space Grotesk", system-ui, sans-serif';
export const BODY = '"Manrope", system-ui, sans-serif';
