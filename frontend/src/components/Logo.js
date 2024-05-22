import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 476 512">
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#0077cc" stroke="none">
          <path d="M2255 4555 c-61 -42 -166 -114 -235 -161 -69 -47 -186 -128 -260 -179 -187 -131 -303 -209 -315 -214 -5 -2 -12 -7 -15 -10 -5 -6 -47 -36 -166 -117 -39 -27 -172 -118 -295 -203 -123 -85 -267 -184 -319 -220 -192 -133 -266 -183 -325 -222 l-60 -39 279 0 280 0 65 42 c36 23 118 76 181 116 173 112 210 136 270 174 30 20 127 82 215 138 88 57 273 175 410 263 138 87 283 181 323 208 40 27 77 49 82 49 11 0 33 -13 224 -137 72 -47 176 -114 231 -150 55 -36 168 -109 250 -162 169 -110 346 -225 449 -291 39 -25 140 -91 225 -147 l156 -103 290 1 c279 0 289 0 259 17 -17 9 -109 71 -205 137 -96 67 -184 128 -196 135 -12 8 -203 140 -425 293 -957 660 -1245 857 -1255 857 -4 0 -58 -34 -118 -75z" />
          <path d="M1070 2958 l0 -263 71 -45 c38 -25 81 -52 94 -60 72 -46 465 -298 550 -353 162 -106 293 -190 525 -339 l56 -35 99 63 c55 35 136 87 180 114 44 28 145 93 224 146 79 52 146 92 148 90 2 -2 5 -181 6 -397 l2 -394 81 -3 81 -3 6 -40 c9 -67 51 -89 170 -89 99 0 124 6 132 31 16 50 -25 80 -175 127 -135 43 -183 66 -224 112 -41 46 -50 74 -43 136 6 53 42 105 92 128 95 45 262 44 362 -3 81 -39 139 -121 131 -187 -3 -29 -3 -29 -77 -30 -73 -1 -73 -1 -86 30 -23 55 -49 70 -128 74 -88 4 -127 -8 -127 -41 0 -28 30 -46 125 -77 39 -12 75 -25 80 -29 6 -3 12 -6 15 -7 52 -10 152 -69 188 -109 l39 -44 2 862 c1 474 -1 870 -4 880 -13 32 -84 22 -151 -22 -32 -21 -113 -74 -179 -116 -66 -43 -163 -106 -215 -140 -52 -34 -140 -90 -195 -125 -55 -34 -117 -74 -138 -89 -20 -14 -60 -39 -87 -56 -27 -16 -114 -72 -192 -123 -131 -85 -143 -91 -162 -78 -12 8 -79 51 -151 97 -71 46 -186 119 -255 164 -69 45 -156 101 -195 126 -38 24 -186 119 -328 212 -235 152 -263 167 -303 167 l-44 0 0 -262z" />
          <path d="M1070 1850 l0 -640 318 2 317 3 3 432 2 431 -37 30 c-21 16 -63 44 -93 62 -30 19 -104 66 -165 105 -60 40 -144 94 -185 120 -41 26 -91 58 -111 71 -19 13 -38 24 -42 24 -4 0 -7 -288 -7 -640z" />
          <path d="M3027 1308 l2 -93 98 -3 98 -2 -60 28 c-71 34 -102 64 -125 121 l-16 42 3 -93z" />
          <path d="M3656 1327 c-8 -34 -76 -92 -121 -105 -36 -9 -32 -10 45 -9 l84 2 2 68 c2 71 0 81 -10 44z" />
          <path d="M321 741 l1 -68 51 -39 c81 -60 261 -186 275 -191 7 -3 36 13 65 34 68 52 100 73 109 73 5 0 8 -47 8 -105 l0 -105 80 0 80 0 0 235 c0 198 -2 235 -14 235 -8 0 -17 -4 -21 -9 -8 -14 -293 -211 -304 -211 -5 0 -31 16 -57 37 -27 20 -67 48 -89 62 -22 14 -70 47 -106 74 -37 26 -69 47 -73 47 -3 0 -5 -31 -5 -69z" />
          <path d="M1650 740 c0 -38 4 -70 9 -70 4 0 30 -17 57 -38 27 -21 73 -53 102 -72 51 -31 59 -33 150 -34 l97 -1 3 -92 3 -93 80 0 80 0 0 235 c0 198 -2 235 -14 235 -8 0 -17 -4 -21 -9 -8 -14 -293 -211 -304 -211 -5 0 -31 16 -57 37 -27 20 -67 48 -89 62 -22 14 -70 47 -106 74 -37 26 -69 47 -73 47 -3 0 -5 -31 -5 -69z" />
          <path d="M2605 804 c-45 -11 -121 -35 -133 -43 -10 -6 0 -18 36 -45 49 -36 51 -36 102 -25 86 18 177 -10 211 -65 22 -36 24 -62 6 -96 -13 -24 -11 -27 32 -57 24 -18 50 -33 56 -33 19 0 54 43 69 88 35 97 -41 202 -184 255 -47 17 -160 29 -195 21z" />
          <path d="M3110 738 l0 -73 68 -45 c37 -24 69 -47 72 -50 9 -11 170 -121 184 -126 7 -3 48 20 91 50 42 31 81 53 86 50 5 -3 9 -50 9 -105 l0 -99 74 0 c90 0 83 -23 76 263 l-5 209 -82 -59 c-252 -177 -244 -174 -272 -149 -21 18 -291 206 -297 206 -2 0 -4 -33 -4 -72z" />
          <path d="M3882 734 l3 -77 100 -68 99 -69 151 0 c194 0 195 1 195 56 l0 44 -137 0 c-135 0 -137 0 -185 31 -26 17 -48 35 -48 40 0 5 83 9 185 9 l185 0 0 55 0 55 -275 0 -276 0 3 -76z" />
          <path d="M2382 697 c-12 -12 -28 -39 -37 -59 -43 -103 15 -198 162 -265 78 -36 210 -38 296 -4 31 12 57 25 57 29 0 4 -22 22 -49 40 -47 32 -51 33 -92 22 -141 -38 -289 77 -216 168 11 14 -16 41 -74 76 -24 14 -27 14 -47 -7z" />
          <path d="M1270 662 c0 -5 22 -24 49 -41 46 -30 54 -32 128 -29 l78 3 3 33 3 32 -108 0 c-59 0 -118 3 -130 6 -13 4 -23 2 -23 -4z" />
          <path d="M1122 640 c-65 -40 -67 -103 -5 -142 33 -20 54 -24 168 -28 117 -5 130 -7 133 -24 2 -10 -2 -22 -10 -27 -7 -5 -86 -9 -175 -9 l-163 0 0 -35 0 -35 173 0 c121 0 177 4 185 12 7 7 12 9 12 5 0 -13 58 22 74 45 22 31 20 71 -3 92 -36 33 -93 45 -207 46 -85 0 -114 3 -124 15 -18 22 -3 35 41 35 21 0 39 4 39 9 0 12 -73 61 -91 61 -7 0 -29 -9 -47 -20z" />
          <path d="M1650 470 l0 -130 75 0 75 0 0 83 -1 82 -69 48 c-37 26 -71 47 -74 47 -3 0 -6 -58 -6 -130z" />
          <path d="M321 465 l-2 -125 81 0 80 0 0 74 0 73 -75 52 c-41 28 -76 51 -79 51 -2 0 -5 -56 -5 -125z" />
          <path d="M3110 466 l0 -126 75 0 75 0 0 78 -1 77 -66 45 c-36 25 -70 47 -75 48 -4 2 -8 -53 -8 -122z" />
          <path d="M3880 465 l0 -125 274 0 274 0 0 55 0 55 -195 0 c-182 0 -194 1 -201 19 -4 11 -40 43 -79 71 l-73 51 0 -126z" />
        </g>
      </svg>


    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
