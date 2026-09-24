// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Tidak menggunakan throw new Error agar proses next build di Vercel tidak gagal
if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Peringatan: Supabase URL atau Service Role Key belum terpasang!');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);