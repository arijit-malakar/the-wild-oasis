import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xabwqaljfhfvdhnvaecs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhYndxYWxqZmhmdmRobnZhZWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjgzMzEsImV4cCI6MjA3NDA0NDMzMX0.KebSJcbEBt5MFhO_dLVNLavAxRIDBRqUWJXBRKHtaKA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
