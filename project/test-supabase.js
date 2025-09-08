import { createClient } from '@supabase/supabase-js'

// Replace with your actual environment variables
const supabaseUrl = https://zwhhqntkrjjtwxzqibka.supabase.com'
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aGhxbnRrcmpqdHd4enFpYmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjkyNzUsImV4cCI6MjA3MDUwNTI3NX0.DDlxAJkTwpzhJ4GvqmvXzvGT3IJvxKAASIMhyiBqbSY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  const { data, error } = await supabase.from('customer').select('*').limit(1)

  if (error) {
    console.error('Connection failed:', error)
  } else {
    console.log('Connection successful! Data fetched:', data)
  }
}

testConnection()