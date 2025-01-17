'use client'

import { useEffect, useState } from 'react';
import Gallery from '@/components/gallery/Gallery';
import NewsEvent from '@/components/news_events/front/News-Events';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <main>
      <Gallery />
      <NewsEvent />
    </main>
  );
}
