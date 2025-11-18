'use server';

import { BFF_BASE_URL } from '@/utils/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const upstream = await fetch(`${BFF_BASE_URL}/cliente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const contentType = upstream.headers.get('content-type') || 'application/json';
    const text = await upstream.text();

    return new Response(text, {
      status: upstream.status,
      headers: { 'Content-Type': contentType },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ sucesso: false, message: 'Proxy error', error: e?.message || String(e) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
