import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
export const dynamic = 'force-dynamic';

// Fungsi bantuan untuk header CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Atau ganti 'http://localhost:3000'
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Tangani preflight request (OPTIONS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*');
      
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400, headers: corsHeaders });
    }
    return NextResponse.json({ success: true, data: data || [] }, { status: 200, headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || typeof body.price !== 'number') {
      return NextResponse.json({ success: false, message: 'Field "name" dan "price" wajib diisi!' }, { status: 400, headers: corsHeaders });
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([{ name: body.name, price: body.price, stock: body.stock ?? 0 }])
      .select();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400, headers: corsHeaders });
    }

    return NextResponse.json({ success: true, message: 'Produk berhasil dibuat!', data: data[0] }, { status: 201, headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 400, headers: corsHeaders });
  }
}