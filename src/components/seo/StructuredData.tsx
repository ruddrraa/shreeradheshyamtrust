import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function StructuredData({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
