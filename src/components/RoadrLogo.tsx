import React from 'react';

interface RoadrLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function RoadrLogo({
  width = 120,
  height = 32,
  className,
}: RoadrLogoProps) {
  return (
    <div
      className={`flex items-center space-x-2 ${className}`}
      style={{ width, height }}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">R</span>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Roadr
      </span>
    </div>
  );
}
