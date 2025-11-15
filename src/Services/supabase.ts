import { createClient} from "@supabase/supabase-js";
const supabaseUrl = 'https://wcrcqdmskjntifrphezu.supabase.co'
const supabaseAnonKey  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcmNxZG1za2pudGlmcnBoZXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MDQyNjgsImV4cCI6MjA3NzA4MDI2OH0.5gbeJpSSsbZhfWQM0bLEyw-OMYMQqsMOFRov3FF8jHw'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)