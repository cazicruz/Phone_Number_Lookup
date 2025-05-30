import React from "react";

interface RenderObjectProps {
  data: Record<string, any>;
  indent?: number;
}

const RenderObject: React.FC<RenderObjectProps> = ({ data, indent = 0 }) => {
    return (
      <div className={`pl-${Math.min(indent * 4, 32)} text-sm text-gray-800 shadow-lg rounded-lg bg-white p-6 m-4`}>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-1">
            {key !== 'id' && key !== 'cost' && key !== 'original_network' && (
              <>
                <span className="font-medium text-gray-700"><strong>{key}</strong>:</span>{' '}
                {value && typeof value === 'object' && !Array.isArray(value) ? (
                  <RenderObject data={value} indent={indent + 1} />
                ) : (
                  <span className="text-gray-900">{String(value)}</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };
  
export default RenderObject;
  