
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://klkncqrjpvvzwyoqmhfe.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsa25jcXJqcHZ2end5b3FtaGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNzg2MjMsImV4cCI6MjA1OTY1NDYyM30.IYsPNfLW7ruV2APNYxAcWo5sXhqIxJ-LMaToU2wzgy0';

export const supabase = createClient(supabaseUrl, supabaseKey)
