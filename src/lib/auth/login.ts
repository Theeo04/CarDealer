const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

interface SignUpNewUserProps {
    email: string;
    password: string;
}

export const signInWithEmail = async ({email,password} : SignUpNewUserProps) => {
    try{
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        return data;
    }catch(error){
        console.log("Login error:", error);
    }
}
  