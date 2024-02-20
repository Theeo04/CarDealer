const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

interface SignUpNewUserProps {
    email: string;
    password: string;
}

// Define function to sign up new user
export const signUpNewUser = async ({ email, password, }: SignUpNewUserProps) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return error;
        }

        return data;
    } catch (error) {
        console.error('Error signing up user!');
        throw error;
    }
};
