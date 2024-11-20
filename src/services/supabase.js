import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xjqnoiumedxaufyjzsuq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcW5vaXVtZWR4YXVmeWp6c3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwODAxNjYsImV4cCI6MjA0NzY1NjE2Nn0.cjLjMBdkGPxa81Xe-cduXHZTk54tdZX7mC6SjlYDmlc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
