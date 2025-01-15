import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fybmkwtsxurdfxjmcjfc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Ym1rd3RzeHVyZGZ4am1jamZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzQ5NzYsImV4cCI6MjA1MjUxMDk3Nn0.inhvyu0X9EaqitzkQebKQVkTI_a2RQA3yF79vqbBrnQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
