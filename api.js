import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export function getSupabase() {
    const supabaseUrl = 'https://rwamsrggtpxjvvzwmxvx.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3YW1zcmdndHB4anZ2endteHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2Nzk0NTUsImV4cCI6MjA2OTI1NTQ1NX0.gZbOf3cyWxtpHnZ-nuPwCOu_z90h-smB0uLx5znWqwc"
    const client = supabase.createClient(supabaseUrl, supabaseKey);
    return client
};