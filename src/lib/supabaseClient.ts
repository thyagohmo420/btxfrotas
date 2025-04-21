import { createClient } from '@supabase/supabase-js'

// Buscar URL e Chave Anônima das variáveis de ambiente VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 