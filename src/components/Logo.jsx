import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ size = 40, color1 = '#3b82f6', color2 = '#94a3b8' }) => {
    return (
        <Box
            sx={{
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color1} />
                        <stop offset="100%" stopColor={color2} />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dx="0" dy="2" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Shield Border */}
                <path
                    d="M50 5 L85 20 V45 C85 70 50 95 50 95 C50 95 15 70 15 45 V20 L50 5Z"
                    fill="url(#logoGrad)"
                    filter="url(#shadow)"
                />

                {/* Inner Circle / Ballot Representaton */}
                <circle cx="50" cy="45" r="18" fill="white" fillOpacity="0.2" />
                <rect x="40" y="38" width="20" height="14" rx="2" fill="white" />
                <path d="M45 45 L50 50 L55 40" stroke={color1} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Decorative elements representing youth/energy */}
                <path d="M25 75 Q40 85 50 90 Q60 85 75 75" stroke="white" strokeWidth="2" strokeOpacity="0.5" fill="none" />
            </svg>
        </Box>
    );
};

export default Logo;
