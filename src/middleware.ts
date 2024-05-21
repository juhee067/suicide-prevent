// src/middleware.js 또는 src/middleware.ts

import { NextResponse } from 'next/server';

// 미들웨어 함수 정의
export function middleware(request: any) {
  // 미들웨어 로직
  return NextResponse.next();
}
