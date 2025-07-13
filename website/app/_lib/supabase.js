import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  'https://wbdolgoulccgvicolwir.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZG9sZ291bGNjZ3ZpY29sd2lyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMwNTczMiwiZXhwIjoyMDY3ODgxNzMyfQ.ZLeAy8xj-sT7IyR8OMS-Mj0PtjMK_y9njTtyEyubzIg'
);
