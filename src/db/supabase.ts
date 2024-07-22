
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

console.log(supabaseUrl, supabaseKey);


export const supabase = createClient(supabaseUrl, supabaseKey);

console.log('supabase', supabase);